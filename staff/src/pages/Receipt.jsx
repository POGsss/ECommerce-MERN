import { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactDOM from "react-dom/client";
import Calculator from "../components/Calculator";
import Preview from "../components/Preview";

const Receipt = ({ token }) => {
	const [ orders, setOrders ] = useState([]);
	const [ selectedOrder, setSelectedOrder ] = useState(null);
	const [ amount, setAmount ] = useState(0);

	const fetchAllOrders = async () => {
		if (!token) {
			return null;
		}

		try {
			// Sending Get Request
			const response = await axios.post(backendUrl + "/api/order/staff?source=store", {}, { headers: { token } });

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

	// Generate PDF Function
	const handleGeneratePDF = (order) => {
		// Creating Style Element
		const style = document.createElement("style");
		style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'); #pdf-root { visibility: visible !important; font-family: Montserrat !important; }`;

		// Creating Pdf Area Element
		const pdfArea = document.createElement("div");
		pdfArea.id = "pdf-root";
		pdfArea.style.position = "fixed";
		pdfArea.style.visibility = "hidden";
		pdfArea.style.top = "50%";
		pdfArea.style.left = "50%";
		pdfArea.style.transform = "translate(-50%, -50%)";
		pdfArea.style.width = "300px";
		pdfArea.style.padding = "20px";
		pdfArea.style.background = "white";
		pdfArea.style.zIndex = "9999";

		// Creating Component To Render
		const root = ReactDOM.createRoot(pdfArea);
		root.render(<Preview selectedOrder={order} />);

		// Apending All Element To Html
		document.head.appendChild(style);
		document.body.appendChild(pdfArea);

		// Timer For Download
		setTimeout(async () => {
			// Creating Canvas To Render
			const canvas = await html2canvas(pdfArea, { scale: 3, useCORS: true, backgroundColor: null, x: 0, y: 0 });

			// Setting Properties
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("portrait", "px", [canvas.width, canvas.height]);

			// Generating And Saving
			pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
			pdf.save(`receipt.pdf`);

			// Unmounting Style And Pdf Area
			root.unmount();
			document.head.removeChild(style);
			document.body.removeChild(pdfArea);
		}, 500);
	};

	// Print Receipt Function
	const handlePrint = (order) => {
		// Creating Style Element
		const style = document.createElement("style");
		style.innerHTML = `@media print { body * { visibility: hidden !important; overflow: hidden; } #print-root * { visibility: visible !important; }}`;

		// Creating Print Area Element
		const printArea = document.createElement("div");
		printArea.id = "print-root";
		printArea.style.position = "fixed";
		printArea.style.visibility = "hidden";
		printArea.style.top = "50%";
		printArea.style.left = "50%";
		printArea.style.transform = "translate(-50%, -50%)";
		printArea.style.width = "300px";
		printArea.style.padding = "20px";
		printArea.style.background = "white";
		printArea.style.zIndex = "9999";

		// Creating Component To Render
		const root = ReactDOM.createRoot(printArea);
		root.render(<Preview selectedOrder={order} />);

		// Appending All Element To Html
		document.head.appendChild(style);
		document.body.appendChild(printArea);

		// Timer For Printing
		setTimeout(() => {
			// Running Print Method
			window.print();
			root.unmount();

			// Unmounting The Style And Print Area
			document.head.removeChild(style);
			document.body.removeChild(printArea);
		}, 500);
	};

	return (
		<div className="flex flex-col-reverse sm:flex-row w-full items-start gap-4">
			{/* Right Side */}
			<div className="w-full sm:w-[calc(100%-250px)] lg:w-[calc(100%-300px)]">
				<p className="mb-2 font-title text-black">Receipt History</p>
				<div className="flex flex-col gap-4">
					{orders.map((order, index) => (
						<div onClick={() => { setAmount(order.amount); setSelectedOrder(order); }} className="flex flex-wrap items-center justify-end gap-2 border border-black p-2 text-sm cursor-pointer" key={index} >
							<div className="flex flex-col grow basis-[200px]">
								<p className="break-all font-subtitle">Receipt #{order._id.substring(0, 6) + "-" + order._id.substring(order._id.length - 6)}</p>
								<p>{new Date(order.date).toLocaleDateString()}, {new Date(order.date).toLocaleTimeString("en-US", { hour12: true })}</p>
								<p>{order.items.length} items, {currency}{order.amount}</p>
							</div>
							<div className="flex flex-row gap-2">
								<button onClick={() => handleGeneratePDF(order)} className="border border-black p-2 flex flex-row gap-2 items-center justify-between">
									<img src={assets.download_icon} alt="" />
									<span className="hidden xl:inline">PDF</span>
								</button>
								<button onClick={() => handlePrint(order)} className="border border-black p-2 flex flex-row gap-2 items-center justify-between">
									<img src={assets.print_icon} alt="" />
									<span className="hidden xl:inline">PRINT</span>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Left Side */}
			<div className="w-full flex flex-col gap-4 sm:w-[250px] lg:w-[300px]">
				<div>
					<p className="mb-2 font-title text-black">Calculator</p>
					<Calculator amount={amount} />
				</div>
				<div>
					<p className="mb-2 font-title text-black">Receipt Preview</p>
					<Preview selectedOrder={selectedOrder} />
				</div>
			</div>
		</div>
	)
}

export default Receipt;