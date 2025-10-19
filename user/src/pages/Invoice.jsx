import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import ReactDOM from "react-dom/client";
import axios from "axios";
import Title from "../components/Title";
import Preview from "../components/Preview";

const Invoice = () => {
    const [ invoiceData, setInvoiceData ] = useState([]);
    const [ selectedInvoice, setSelectedInvoice ] = useState(null);
    const { backendUrl, token, currency } = useContext(ShopContext);

    const fetchOrders = async () => {
        try {
            // Checking If User Logged In
            if (!token) {
                return null;
            }

            // Sending Request To Backend
            const response = await axios.post(backendUrl + "/api/order/user", {}, { headers: { token } });
            console.log(response.data.orders);

            // Creating Invoice Data
            if (response.data.success) {
                setInvoiceData(response.data.orders.reverse());
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
        fetchOrders();
    }, [token]);

    // Print Functionality
    const handlePrint = (invoice) => {
		// Creating Style Element
		const style = document.createElement("style");
		style.innerHTML = `@media print { body * { visibility: hidden !important; overflow: hidden; } #print-root * { visibility: visible !important; }}`;

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
		root.render(<Preview selectedInvoice={invoice} />);

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
        <div className="max-w-[1280px] mx-auto my-10">
            <div className="font-subtitle text-2xl pb-4">
                <Title text1={"YOUR"} text2={"INVOICE"} />
            </div>
            <div>
                {invoiceData.map((invoice, index) => (
                    <div key={index} id="invoiceList" className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[10px]">
                        <div className="flex items-center gap-6 text-sm">
                            <img className="w-16 sm:w-20 bg-light-dark rounded-[5px] p-2 field" src={assets.invoice_icon} alt="" />
                            <div className="overflow-hidden">
                                <p className="text-base sm:text-lg font-subtitle w-full overflow-hidden whitespace-nowrap text-ellipsis">Invoice {invoice._id.substring(0, 8) + '-' + invoice._id.substring(invoice._id.length - 8)}</p>
                                <div className="flex items-center gap-2">
                                    <p>Items: <span className="text-sm sm:text-base text-gray-500">{invoice.items.length}</span></p>
                                    <p>Total: <span className="text-sm sm:text-base text-gray-500">{currency}{invoice.amount}</span></p>
                                </div>
                                <p>Date: <span className="text-sm sm:text-base text-gray-500">{new Date(invoice.date).toDateString()}</span></p>
                            </div>
                        </div>
                        <button onClick={() => {setSelectedInvoice(invoice); handlePrint(invoice)}} className="field rounded-[5px] px-4 py-2 text-sm">Print</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Invoice;