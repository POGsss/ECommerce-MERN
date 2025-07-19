import { currency } from "../App";

const Preview = ({ selectedOrder }) => {
	if (!selectedOrder) {
		return (
			<div className="w-full flex flex-col text-sm gap-4 p-4 border border-black">
				<div className="flex flex-col items-center">
					<b className="text-lg">BossDShop</b>
					<p className="text-base">Point Of Sale System</p>
				</div>
				<div className="flex flex-col items-center border-t border-b py-2 border-black">
					<p>No Items</p>
					<p>Please Select One</p>
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
		<div className="w-full flex flex-col text-sm gap-4 p-4 border border-black">
			<div className="flex flex-col items-center">
				<b className="text-lg">BossDShop</b>
				<p className="text-base">Point Of Sale System</p>
			</div>
			<div className="flex flex-col items-center border-t border-b py-2 border-black">
				<p>Receipt #{_id.substring(0, 6) + '-' + _id.substring(_id.length - 6)}</p>
				<p>{new Date(date).toLocaleDateString()}, {new Date(date).toLocaleTimeString('en-US', { hour12: true })}</p>
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
				<div className="w-full flex flex-row items-center justify-between">
					<p>Tax</p>
					<p>{currency}12</p>
				</div>
			</div>
			<div className="flex flex-row items-center justify-between border-t border-b py-2 border-black">
				<b>TOTAL</b>
				<b>{currency}{amount}</b>
			</div>
			<div className="flex flex-col items-center">
				<p>Thank You For Purchasing</p>
				<p>Please Come Again</p>
			</div>
		</div>
	)
}

export default Preview;