import { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import axios from "axios";
import Calculator from "../components/Calculator";

const Receipt = ({ token }) => {
	const [ orders, setOrders ] = useState([]);

	const fetchAllOrders = async () => {
		if (!token) {
			return null;
		}

		try {
			// Sending Get Request
			const response = await axios.post(backendUrl + "/api/order/staff?source=online", {}, { headers: { token } });

			// Checking Response
			if (response.data.success) {
				setOrders(response.data.orders);
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
		fetchAllOrders();
	}, []);

	return (
		<div className="flex flex-col-reverse sm:flex-row w-full items-start gap-4">
			{/* Right Side */}
			<div className="w-full sm:w-[calc(100%-250px)] lg:w-[calc(100%-300px)]">
				<p className="mb-2 font-title text-black">Order History</p>
				<div className="flex flex-col gap-4">
					{orders.map((order, index) => (
						<div className="flex flex-wrap items-center justify-end gap-2 border border-black p-4 text-sm" key={index} >
							<div className="flex flex-col grow basis-[200px]">
								<p className="break-all font-subtitle">Receipt #{order._id.substring(0, 6) + '-' + order._id.substring(order._id.length - 6)}</p>
								<p>{new Date(order.date).toLocaleDateString()}, {new Date(order.date).toLocaleTimeString('en-US', { hour12: true })}</p>
								<p>{order.items.length} items, {currency}{order.amount}</p>
							</div>
							<div className="flex flex-row gap-2">
								<button className="border border-black p-2 flex flex-row gap-2 items-center justify-between">
									<img src={assets.download_icon} alt="" />
									<span className="hidden xl:inline">PDF</span>
								</button>
								<button className="border border-black p-2 flex flex-row gap-2 items-center justify-between">
									<img src={assets.print_icon} alt="" />
									<span className="hidden xl:inline">PRINT</span>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Left Side */}
			<div  className="w-full sm:w-[250px] lg:w-[300px]">
				<p className="mb-2 font-title text-black">Calculator</p>
				<div>
					<Calculator />
				</div>
			</div>
		</div>
	)
}

export default Receipt;