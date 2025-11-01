import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import axios from "axios";
import countries from "../assets/countries.json";

const PlaceOrder = () => {
	const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, deliveryFee, products } = useContext(ShopContext);
	const [method, setMethod] = useState("cod");
	const [states, setStates] = useState([]);
  	const [cities, setCities] = useState([]);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		street: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
		phoneNumber: ""
	});

	// Payment Cancelled Reference
	const paymentCancelled = useRef(true);

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setFormData(data => ({ ...data, [name]: value }));
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			let orderItems = [];

			for (const items in cartItems) {
				for (const size in cartItems[items]) {
					if (cartItems[items][size] > 0) {
						const itemInfo = structuredClone(products.find(product => product._id === items));
						if (itemInfo) {
							itemInfo.size = size;
							itemInfo.quantity = cartItems[items][size];
							orderItems.push(itemInfo);
						}
					}
				}
			}

			let orderData = {
				address: formData,
				items: orderItems,
				amount: getCartAmount() + deliveryFee
			};

			switch (method) {
				// COD Payment
				case "cod":
					const response = await axios.post(backendUrl + "/api/order/cod", orderData, { headers: { token } });
					if (response.data.success) {
						setCartItems({});
						localStorage.setItem("latestOrder", JSON.stringify(orderData));
						navigate("/orders");
					} else {
						toast(response.data.message);
					}
					break;

				// Stripe Payment
				case "stripe":
					const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
					if (responseStripe.data.success) {
						// Deconstructuring Session Url & OrderId
						const { session_url, orderId } = responseStripe.data;
						localStorage.setItem("latestOrder", JSON.stringify(orderData));

						// Setting Mini Window Size
						const width = 600;
						const height = 800;
						const left = window.screenX + (window.outerWidth - width) / 2;
						const top = window.screenY + (window.outerHeight - height) / 2;

						// Opening Mini Window
						const popup = window.open(session_url, "_focus", `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=yes`);

						// Polling for Popup Closure
						const pollTimer = setInterval(async () => {
							if (popup.closed) {
								clearInterval(pollTimer);
								if (paymentCancelled.current) {
									await axios.post(backendUrl + "/api/order/cancelStripe", { orderId }, { headers: { token } });
								}
								window.location.reload();
							}
						}, 500);
					} else {
						toast(response.data.message);
					}
					break;

				// Default Payment
				default:
					break;
			}
		} catch (error) {
			// Logging Error
			console.log(error);
			toast({ success: false, message: error.message });
		}
	};

	// Handling Country Change
	const handleCountryChange = (e) => {
		const selectedCountry = e.target.value;
		const country = countries.countries.find((c) => c.name === selectedCountry);

		setFormData((data) => ({
			...data,
			country: selectedCountry,
			state: "",
			city: "",
		}));

		setStates(country ? country.state : []);
		setCities([]);
	};

	// Handling State Change
	const handleStateChange = (e) => {
		const selectedState = e.target.value;
		const state = states.find((p) => p.name === selectedState);

		setFormData((data) => ({
			...data,
			state: selectedState,
			city: "",
		}));

		setCities(state ? state.cities : []);
	};

	// Handling City Change
	const handleCityChange = (e) => {
		const selectedCity = e.target.value;
		setFormData((data) => ({
			...data,
			city: selectedCity,
		}));
	};

	// Handling Message From Opening Mini Window
	useEffect(() => {
		const handleMessage = (event) => {
			if (event.data?.type === "PAYMENT_RESULT") {
				if (event.data.status === "success") {
					paymentCancelled.current = false;
					navigate("/orders");
				} else {
					paymentCancelled.current = true;
					navigate("/cart");
				}
			}
		};

		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, []);

	return (
		<form onSubmit={onSubmitHandler} className="max-w-[1280px] mx-auto my-10">
			<div className="font-subtitle text-2xl pb-4">
				<Title text1={"DELIVERY"} text2={"DETAILS"} />
			</div>

			<div className="flex flex-col sm:flex-row justify-between gap-8">
				{/* Left Side */}
				<div className="flex flex-col gap-4 w-full sm:w-3/5 bg-light-light p-4 sm:p-8 rounded-[20px]">
					<div className="flex gap-3">
						<div className="relative w-full flex flex-col gap-2">
							<label className="text-sm">First Name</label>
							<input onChange={onChangeHandler} name="firstName" value={formData.firstName} className="bg-light-dark rounded-[10px] px-4 py-2 w-full" type="text" placeholder="John" required />
						</div>
						<div className="relative w-full flex flex-col gap-2">
							<label className="text-sm">Last Name</label>
							<input onChange={onChangeHandler} name="lastName" value={formData.lastName} className="bg-light-dark rounded-[10px] px-4 py-2 w-full" type="text" placeholder="Doe" required />
						</div>
					</div>
					<div className="relative w-full flex flex-col gap-2">
						<label className="text-sm">Email Address</label>
						<input onChange={onChangeHandler} name="email" value={formData.email} className="bg-light-dark rounded-[10px] px-4 py-2 w-full" type="email" placeholder="johndoe@example.com" required />
					</div>
					<div className="relative w-full flex flex-col gap-2">
						<label className="text-sm">Street</label>
						<input onChange={onChangeHandler} name="street" value={formData.street} className="bg-light-dark rounded-[10px] px-4 py-2 w-full" type="text" placeholder="Lorem Ipsum Dolor Street" required />
					</div>
					<div className="flex gap-3">
						<div className="relative w-full flex flex-col gap-2">
							<label className="text-sm">Country</label>
							<select name="country" onChange={handleCountryChange} value={formData.country} className="bg-light-dark rounded-[10px] px-4 py-2 w-full" required >
								{countries.countries.map((country, i) => (
									<option key={i} value={country.name}>{country.name}</option>
								))}
							</select>
						</div>
						<div className="relative w-full flex flex-col gap-2">
							<label className="text-sm">Province</label>
							<select name="state" onChange={handleStateChange} value={formData.state} className="bg-light-dark rounded-[10px] px-4 py-2 w-full" required >
								{states.map((state, i) => (
									<option key={i} value={state.name}>{state.name}</option>
								))}
							</select>
						</div>
					</div>
					<div className="flex gap-3">
						<div className="relative w-full flex flex-col gap-2">
							<label className="text-sm">City</label>
							<select name="city" onChange={handleCityChange} value={formData.city} className="bg-light-dark rounded-[10px] px-4 py-2 w-full" required >
								{cities.map((city, i) => (
									<option key={i} value={city}>{city}</option>
								))}
							</select>
						</div>
						<div className="relative w-full flex flex-col gap-2">
							<label className="text-sm">Zip Code</label>
							<input onChange={onChangeHandler} name="zipCode" value={formData.zipCode} className="bg-light-dark rounded-[10px] px-4 py-2 w-full" type="number" placeholder="1234" required />
						</div>
					</div>
					<div className="relative w-full flex flex-col gap-2">
						<label className="text-sm">Phone Number</label>
						<input onChange={onChangeHandler} name="phoneNumber" value={formData.phoneNumber} className="bg-light-dark rounded-[10px] px-4 py-2 w-full" type="number" placeholder="0987654321" required />
					</div>
				</div>

				{/* Right Side */}
				<div className="flex flex-col gap-4 w-full sm:w-2/5">
					<CartTotal />
					<div className="mt-4">
						<p className="font-subtitle text-xl">Payment Method:</p>
						<div className="flex flex-col lg:flex-row gap-3 mt-4">
							<div onClick={() => setMethod("stripe")} className="flex items-center gap-3 rounded-[10px] bg-light-light px-4 py-2 cursor-pointer">
								<p className={`min-w-4 min-h-4 border border-black rounded-full ${method === "stripe" ? "bg-black" : ""}`}></p>
								<p className="text-sm font-subtitle">Bank Transfer</p>
							</div>
							<div onClick={() => setMethod("cod")} className="flex items-center gap-3 rounded-[10px] bg-light-light px-4 py-2 cursor-pointer">
								<p className={`min-w-4 min-h-4 border border-black rounded-full ${method === "cod" ? "bg-black" : ""}`}></p>
								<p className="text-sm font-subtitle">Cash On Delivery</p>
							</div>
						</div>
						<div className="w-full text-end">
							<button type="submit" className="font-text md:text-base px-8 py-4 mt-8 bg-secondary rounded-[10px] text-white cursor-pointer">PLACE ORDER</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}

export default PlaceOrder;