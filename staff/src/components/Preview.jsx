import { useState } from "react";
import { currency } from "../App";

const Preview = ({ selectedOrder }) => {
	const [dashLine, setDashLine] = useState("-".repeat(500));

	if (!selectedOrder) {
		return (
			<div className="w-full flex flex-col text-sm gap-4">
				<div className="flex flex-col items-center">
					<b className="text-lg">BossDShop</b>
					<p className="text-base">Point Of Sale System</p>
				</div>
				<div className="flex flex-col items-center overflow-hidden">
						<p className="overflow-hidden whitespace-nowrap text-clip">{dashLine}</p>
						<p>No Receipt Selected</p>
						<p>Select One From History</p>
						<p className="overflow-hidden whitespace-nowrap text-clip">{dashLine}</p>
				</div>
				<div className="flex flex-col items-center">
					<p>Thank You For Purchasing</p>
					<p>Please Come Again</p>
				</div>
			</div>
		)
	}

	const { _id, date, items, amount } = selectedOrder;

	return (
		<div className="w-full flex flex-col text-sm gap-4">
				<div className="flex flex-col items-center">
						<b className="text-lg">BossDShop</b>
						<p className="text-base">Point Of Sale System</p>
				</div>
				<div className="flex flex-col items-center overflow-hidden">
						<p className="overflow-hidden whitespace-nowrap text-clip">{dashLine}</p>
						<p>Receipt #{_id.substring(0, 6) + '-' + _id.substring(_id.length - 6)}</p>
						<p>{new Date(date).toLocaleDateString()}, {new Date(date).toLocaleTimeString('en-US', { hour12: true })}</p>
						<p className="overflow-hidden whitespace-nowrap text-clip">{dashLine}</p>
				</div>
				<div className="flex flex-col items-center gap-2">
						{items.map((item, index) => (
								<div key={index} className="w-full flex flex-row items-center justify-between">
										<div>
												<p>{item.name}</p>
												<p>{item.quantity} x {currency}{item.price}</p>
										</div>
										<p>{currency}{item.quantity * item.price}</p>
								</div>
						))}
				</div>
				<div className="w-full flex flex-col items-center justify-between overflow-hidden">
						<p className="whitespace-nowrap">{dashLine}</p>
						<div className="w-full flex flex-row items-center justify-between">
								<p>Tax</p>
								<p>{currency}12</p>
						</div>
						<div className="w-full flex flex-row items-center justify-between">
								<b>TOTAL</b>
								<b>{currency}{amount}</b>
						</div>
						<p className="whitespace-nowrap">{dashLine}</p>
				</div>
				<div className="flex flex-col items-center">
						<p>Thank You For Purchasing</p>
						<p>Please Come Again</p>
				</div>
		</div>
	)
}

export default Preview;