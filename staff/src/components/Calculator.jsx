import { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Calculator = ({ amount }) => {
	const [ total, setTotal ] = useState(amount);
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
		setTotal(amount);
		calculateChange();
	}, [total, receive, amount]);

	return (
		<div className="w-full flex flex-col text-sm gap-4">
			{/* Title */}
			<div className="w-full flex flex-row items-center justify-between gap-2">
				<div className="flex flex-col justify-center w-[calc(100%-50px)]">
					<b className="w-full whitespace-nowrap text-ellipsis overflow-hidden">Change Calculator</b>
					<p className="w-full whitespace-nowrap text-ellipsis overflow-hidden">Total change amount</p>
				</div>
				<button className="bg-light-dark rounded-[5px] p-2 flex flex-row gap-2 items-center justify-between">
					<img onClick={() => {setTotal(0); setReceive(0); setChange(0)}} src={assets.bin_icon} alt="" />
				</button>
			</div>

			{/* Input */}
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-1">
					<p>Total Amount:</p>
					<input onChange={(e) => setTotal(e.target.value)} value={total} type="number" className="w-full px-4 py-2 bg-light-dark rounded-[5px]" placeholder="Total" required />
				</div>
				<div className="flex flex-col gap-1">
					<p>Amount Receive:</p>
					<input onChange={(e) => setReceive(e.target.value)} value={receive} type="number" className="w-full px-4 py-2 bg-light-dark rounded-[5px]" placeholder="Receive" required />
				</div>
			</div>

			{/* Total */}
			<div className="w-full flex flex-row items-center justify-between font-text md:text-base px-8 py-4 bg-secondary rounded-[5px] text-white">
				<p>CHANGE:</p>
				<p>{change}</p>
			</div>
		</div>
	)
}

export default Calculator;