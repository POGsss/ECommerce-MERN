import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
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
                        <button onClick={() => setSelectedInvoice(invoice)} className="field rounded-[5px] px-4 py-2 text-sm">Print</button>
                    </div>
                ))}
            </div>
            <Preview selectedInvoice={selectedInvoice} />
        </div>
    )
}

export default Invoice;