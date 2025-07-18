import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Products = ({ token }) => {
	const [list, setList ] = useState([]);

	const fetchList = async () => {
		try {
			// Sending Get Request
			const response = await axios.get(backendUrl + "/api/product/list");

			// Checkinig If Response Is Successful
			if (response.data.success) {
				setList(response.data.products);
				console.log(list);
			} else {
				toast(response.data.message);
			}
		} catch (error) {
			// Logging Error
			console.log(error);
			toast(error.message);
		}
	}

	useEffect(() => {
		fetchList();
	}, []);

	return (
		<div className="flex flex-col-reverse sm:flex-row w-full items-start gap-4">
			{/* Right Side */}
			<div className="w-full sm:w-[calc(100%-250px)]">
				<p className="mb-2 font-title text-black">Available Products</p>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
					{/* List Data */}
					{list.map((item, index) => (
						<div className="relative grid items-center gap-2 p-2 border border-black text-sm" key={index}>
							<img className="w-full border border-black" src={item.image[0]} alt="" />
							<p>{item.name}</p>
							<p>{currency}{item.price}</p>
							<img onClick={() => handleDeleteClick(item._id)} className="absolute right-2 bottom-2 cursor-pointer" src={assets.add_order_icon} alt="" />
						</div>
					))}
				</div>
			</div>

			{/* Left Side */}
			<div  className="w-full sm:w-[250px]">
				<p className="mb-2 font-title text-black">Current Order</p>
				<div>
					
				</div>
			</div>
		</div>
	)
}

export default Products;