import { useState, useEffect, useRef, useLayoutEffect } from "react";
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
	const [orders, setOrders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [amount, setAmount] = useState(0);
    const componentRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
		style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'); #pdf-root, #pdf-root * { visibility: visible !important; font-family: Montserrat !important; }`;

		// Creating Pdf Area Element
		const pdfArea = document.createElement("div");
		pdfArea.id = "pdf-root";
		pdfArea.style.position = "fixed";
		pdfArea.style.visibility = "hidden";
		pdfArea.style.top = "-100%";
		pdfArea.style.left = "-100%";
		pdfArea.style.width = "300px";
		pdfArea.style.padding = "10px 20px 30px 20px";
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
		style.innerHTML = `@media print { body * { visibility: hidden !important; overflow: hidden; width: } #print-root * { visibility: visible !important; }}`;

		// Creating Print Area Element
		const printArea = document.createElement("div");
		printArea.id = "print-root";
		printArea.style.position = "fixed";
		printArea.style.visibility = "hidden";
		printArea.style.top = "0";
		printArea.style.left = "50%";
		printArea.style.transform = "translateX(-50%)";
		printArea.style.width = "100%";
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

	// Using Resize Observer To Get Dimension Of Preview
	useLayoutEffect(() => {
		if (!componentRef.current) return;

		const observer = new ResizeObserver((entries) => {
		const { width, height } = entries[0].contentRect;
		setDimensions({ width, height });
		});

		observer.observe(componentRef.current);

		return () => observer.disconnect();
	}, []);

	return (
		<div className="flex flex-col items-start w-full">
			<p className="mb-2 font-title text-black">Receipt History</p>
			<div className="w-full flex flex-col-reverse sm:flex-row items-start gap-4">
				<div className="w-full grid grid-cols-1 gap-4">
					{orders.map((order, index) => (
						<div onClick={() => { setAmount(order.amount); setSelectedOrder(order); }} className="flex flex-wrap items-center justify-end gap-2 bg-light-light rounded-[10px] p-2 text-sm cursor-pointer" key={index} >
							<div className="flex flex-col grow basis-[200px]">
								<p className="break-all font-subtitle">Receipt #{order._id.substring(0, 6) + "-" + order._id.substring(order._id.length - 6)}</p>
								<p>{new Date(order.date).toLocaleDateString()}, {new Date(order.date).toLocaleTimeString("en-US", { hour12: true })}</p>
								<p>{order.items.length} items, {currency}{order.amount}</p>
							</div>
							<div className="flex flex-row gap-2">
								<button onClick={() => handleGeneratePDF(order)} className="bg-light-dark rounded-[5px] p-2 flex flex-row gap-2 items-center justify-between">
									<img src={assets.download_icon} alt="" />
									<span className="hidden xl:inline">PDF</span>
								</button>
								<button onClick={() => handlePrint(order)} className="bg-light-dark rounded-[5px] p-2 flex flex-row gap-2 items-center justify-between">
									<img src={assets.print_icon} alt="" />
									<span className="hidden xl:inline">PRINT</span>
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="w-full flex flex-col sm:min-w-[250px] sm:max-w-[300px]">
					<div className="relative p-2 mb-4 bg-light-light rounded-[10px]">
						<Calculator amount={amount} />
					</div>
					<div className="relative p-2 bg-light-light rounded-[10px]">
						<Preview selectedOrder={selectedOrder} componentRef={componentRef} />
						<div style={{ width: `${dimensions.width}px`, height: `${dimensions.height + 20}px` }}></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Receipt;