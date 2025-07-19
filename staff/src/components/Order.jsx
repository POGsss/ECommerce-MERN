import { currency } from "../App";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Order = ({ orderList, setOrderList, token, backendUrl }) => {
	console.log(orderList);

	// Increase Quantity
	const increaseQty = (id) => {
		setOrderList((prev) => prev.map((item) => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
	};

	// Decrease Quantity
	const decreaseQty = (id) => {
		setOrderList((prev) => prev.map((item) => item._id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0));
	};

	// Computing Breakdown
	const subtotal = orderList.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const tax = 12;
	const total = subtotal + tax;

	// Adding Orders To Database
	const handleProceed = async () => {
		// Check If Order Is Empty
		if (orderList.length === 0) {
			toast("Please Add Items");
			return null;
		}

		try {
			// Structure Order Data
			const orderData = {
				items: orderList,
				amount: total,
			};

			// Send Post Request
			const response = await axios.post(backendUrl + "/api/order/pos", orderData, { headers: { token } });

			if (response.data.success) {
				toast("Order Processed");
				setOrderList([]);
			} else {
				toast(response.data.message);
			}
		} catch (error) {
			// Logging Error
			console.error(error);
			toast(error.message);
		}
	};

  return (
    <div className="w-full flex flex-col text-sm gap-4 p-2 border border-black">
			{/* Title */}
			<div className="w-full flex flex-row items-center justify-between gap-2">
				<div className="flex flex-col justify-center">
					<b>Order Breakdown</b>
					<p>Order price breakdown</p>
				</div>
				<button onClick={() => setOrderList([])} className="border border-black p-2 flex flex-row gap-2 items-center justify-between">
					<img src={assets.bin_icon} alt="" />
				</button>
			</div>

			{/* Order List */}
			<div className="flex flex-col gap-2 p-2 border-t border-b border-black">
				{orderList.map((item) => (
					<div key={item._id} className="flex flex-row justify-between">
						<div className="flex flex-col">
							<p>{item.name}</p>
							<p>{currency}{item.price * item.quantity}</p>
						</div>
						<div className="flex flex-row gap-2 items-center">
							<img className="cursor-pointer" src={assets.subtract_order_icon} onClick={() => decreaseQty(item._id)} alt="" />
							<p className="w-4 text-center">{item.quantity}</p>
							<img className="cursor-pointer" src={assets.add_order_icon} onClick={() => increaseQty(item._id)} alt="" />
						</div>
					</div>
				))}
			</div>

			{/* Total */}
			<div className="flex flex-col justify-between">
				<div className="w-full flex flex-row justify-between">
					<p>Subtotal</p>
					<p>{currency}{subtotal}</p>
				</div>
				<div className="w-full flex flex-row justify-between">
					<p>Tax</p>
					<p>{currency}{tax}</p>
				</div>
				<div className="w-full flex flex-row justify-between mb-4">
					<b>Total</b>
					<b>{currency}{total}</b>
				</div>
				<button onClick={handleProceed} className="w-full flex flex-row items-center justify-center font-text md:text-base px-8 py-4 bg-black text-white cursor-pointer">PROCEED</button>
			</div>
    </div>
  )
}

export default Order;