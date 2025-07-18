import { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Calculator = () => {
	const [ total, setTotal ] = useState(0);
	const [ receive, setReceive ] = useState(0);
	const [ change, setChange ] = useState(0);

	const calculateChange = async () => {
		// calculating Values
		const amountReceive = receive;
		const amountChange = (amountReceive - total) >= 0 ? (amountReceive - total) : 0;

		// Setting Values
		setReceive(amountReceive);
		setChange(amountChange);
	}

	useEffect(() => {
		calculateChange();
	}, [total, receive]);

	return (
		<div className="w-full flex flex-col text-sm gap-4 p-2 border border-black">
			{/* Title */}
			<div className="w-full flex flex-row justify-between gap-2">
				<div className="flex flex-col justify-center">
					<b>Change Calculator</b>
					<p>Total change amount</p>
				</div>
				<button className="border border-black p-2 flex flex-row gap-2 items-center justify-between">
					<img onClick={() => {setTotal(0); setReceive(0); setChange(0)}} src={assets.bin_icon} alt="" />
				</button>
			</div>

			{/* Input */}
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-1">
					<p>Total Amount:</p>
					<input onChange={(e) => setTotal(e.target.value)} value={total} type="number" className="w-full px-4 py-2 border border-black" placeholder="Total" required />
				</div>
				<div className="flex flex-col gap-1">
					<p>Amount Receive:</p>
					<input onChange={(e) => setReceive(e.target.value)} value={receive} type="number" className="w-full px-4 py-2 border border-black" placeholder="Receive" required />
				</div>
			</div>

			{/* Total */}
			<div className="w-full flex flex-row items-center justify-between font-text md:text-base px-8 py-4 bg-black text-white">
				<p>CHANGE:</p>
				<p>{change}</p>
			</div>
		</div>
	)
}

export default Calculator;