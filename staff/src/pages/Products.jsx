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
		<div className="flex flex-col items-start w-full">
			<p className="mb-2 font-title text-black">Available Products</p>
			<div  className="w-full flex flex-col-reverse sm:flex-row items-start gap-4">
				<div className="w-full grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
					{list.map((item, index) => (
						<div onClick={() => handleAddOrder(item)} className="relative grid items-start gap-2 p-2 bg-light-light rounded-[10px] text-sm cursor-pointer" key={index}>
							<img className="w-full bg-light-light rounded-[10px]" src={item.image[0]} alt="" />
							<p>{item.name}</p>
							<p>{currency}{item.price}</p>
						</div>
					))}
				</div>
				<div className="w-full flex flex-col sm:min-w-[250px] sm:max-w-[300px]">
					<div className="relative p-4 bg-light-light rounded-[10px]">
						<Order orderList={orderList} setOrderList={setOrderList} token={token} backendUrl={backendUrl} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Products;