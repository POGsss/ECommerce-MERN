import { useRef, useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import axios from "axios";
import html2pdf from "html2pdf.js";
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

	const previewRef = useRef();
	
	const handleGeneratePDF = () => {
    const element = previewRef.current;
    html2pdf().from(element).set({
      margin: 0.2,
      filename: "receipt.pdf",
      html2canvas: { scale: 1 },
      jsPDF: { format: "a6", orientation: "portrait" },
    }).save();
  };

	const handlePrint = (order) => {
		const printArea = document.createElement('div');
		printArea.style.position = 'fixed';
		printArea.style.top = '-9999px';
		document.body.appendChild(printArea);

		const root = ReactDOM.createRoot(printArea);
		root.render(<Preview selectedOrder={order} />);

		setTimeout(() => {
			window.print();
			root.unmount();
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
					<div onClick={() => {setAmount(order.amount); setSelectedOrder(order);}} className="flex flex-wrap items-center justify-end gap-2 border border-black p-2 text-sm cursor-pointer" key={index} >
							<div className="flex flex-col grow basis-[200px]">
								<p className="break-all font-subtitle">Receipt #{order._id.substring(0, 6) + '-' + order._id.substring(order._id.length - 6)}</p>
								<p>{new Date(order.date).toLocaleDateString()}, {new Date(order.date).toLocaleTimeString('en-US', { hour12: true })}</p>
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
			<div  className="w-full flex flex-col gap-4 sm:w-[250px] lg:w-[300px]">
				<div>
					<p className="mb-2 font-title text-black">Calculator</p>
					<Calculator amount={amount} />
				</div>
				<div>
					<p className="mb-2 font-title text-black">Receipt Preview</p>
					<Preview ref={previewRef} selectedOrder={selectedOrder} />
				</div>
			</div>
		</div>
	)
}

export default Receipt;