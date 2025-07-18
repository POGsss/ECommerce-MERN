import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Order from "../components/Order";

const Products = ({ token }) => {
	const [ list, setList ] = useState([]);
	const [ orderList, setOrderList ] = useState([]);

	const fetchList = async () => {
		try {
			// Sending Get Request
			const response = await axios.get(backendUrl + "/api/product/list");

			// Checking Response
			if (response.data.success) {
				setList(response.data.products);
			} else {
				toast(response.data.message);
			}
		} catch (error) {
			// Logging Error
			console.log(error);
			toast(error.message);
		}
	}

	const handleAddOrder = (item) => {
		// Check If The Item Is In The List
		const existing = orderList.find(i => i._id === item._id);
		
		if (existing) {
			// Increment Quantity
			const updated = orderList.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
			setOrderList(updated);
		} else {
			// Add New Item
			setOrderList([...orderList, { ...item, quantity: 1 }]);
		}
	};

	useEffect(() => {
		fetchList();
	}, []);

	return (
		<div className="flex flex-col-reverse sm:flex-row w-full items-start gap-4">
			{/* Right Side */}
			<div className="w-full sm:w-[calc(100%-250px)] lg:w-[calc(100%-300px)]">
				<p className="mb-2 font-title text-black">Available Products</p>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
					{/* List Data */}
					{list.map((item, index) => (
						<div className="relative grid items-center gap-2 p-2 border border-black text-sm" key={index}>
							<img className="w-full border border-black" src={item.image[0]} alt="" />
							<p>{item.name}</p>
							<p>{currency}{item.price}</p>
							<img onClick={() => handleAddOrder(item)} className="absolute right-2 bottom-2 cursor-pointer" src={assets.add_order_icon} alt="" />
						</div>
					))}
				</div>
			</div>

			{/* Left Side */}
			<div  className="w-full flex flex-col gap-4 sm:w-[250px] lg:w-[300px]">
				<div>
					<p className="mb-2 font-title text-black">Current Order</p>
					<Order orderList={orderList} setOrderList={setOrderList} token={token} backendUrl={backendUrl} />
				</div>
			</div>
		</div>
	)
}

export default Products;