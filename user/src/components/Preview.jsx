import { assets } from "../assets/assets";

const Preview = ({ selectedInvoice }) => {
    const currency = "₱";
    const deliveryFee = 30;

    if (!selectedInvoice) {
        return (
            <div></div>
        )
    }

    const { _id, date, items, amount, address } = selectedInvoice;

    return (
        <div className="w-full flex flex-col bg-light-light rounded-[10px] p-4 gap-10 overflow-hidden">
            <div className="flex flex-row justify-between items-start">
                <img className="w-14 h-14" src={assets.icon} alt="" srcset="" />
                <div className="flex flex-col justify-center items-end">
                    <h1 className="font-title text-4xl text-primary">INVOICE</h1>
                    <p className="text-sm">{_id.substring(0, 8) + "-" + _id.substring(_id.length - 8)}</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-start gap-4 items-center">
                <div className="w-full flex flex-col justify-center items-start">
                    <h1 className="font-title text-sm">BILL FROM</h1>
                    <p className="text-sm">Boss D Apparel</p>
                    <p className="text-sm">bossdapparel@gmail.com</p>
                    <p className="text-sm">09123456789</p>
                    <p className="text-sm">San Jose del Monte Bulacan</p>
                    <p className="text-sm">1470 Philippines</p>
                </div>
                <div className="w-full flex flex-col justify-center items-start">
                    <h1 className="font-title text-sm">BILL TO</h1>
                    <p className="text-sm">{address.firstName + " " + address.lastName}</p>
                    <p className="text-sm">{address.email}</p>
                    <p className="text-sm">{address.phoneNumber}</p>
                    <p className="text-sm">{address.street + " " + address.city + " " + address.state}</p>
                    <p className="text-sm">{address.zipCode + " " + address.country}</p>
                </div>
            </div>
            <table id="invoiceList" className="w-full text-sm">
                <tr className="bg-primary font-title">
                    <td className="text-left p-2">ITEM</td>
                    <td className="text-end p-2 w-[20%]">SIZE</td>
                    <td className="text-end p-2 w-[20%]">QTY</td>
                    <td className="text-end p-2 w-[20%]">PRICE</td>
                </tr>
                {(() => {
                    const rows = [];
                    const totalRows = Math.max(items.length, 5);
                    for (let i = 0; i < totalRows; i++) {
                        const item = items[i];
                        if (item) { rows.push(
                                <tr key={i}>
                                    <td className="text-left p-2">{item.name}</td>
                                    <td className="text-end p-2 w-[20%]">{item.size}</td>
                                    <td className="text-end p-2 w-[20%]">{item.quantity}</td>
                                    <td className="text-end p-2 w-[20%]">{currency}{item.price}</td>
                                </tr>
                            );
                        } else { rows.push(
                                <tr key={i}>
                                    <td className="text-left p-2">&nbsp;</td>
                                    <td className="text-end p-2 w-[20%]">&nbsp;</td>
                                    <td className="text-end p-2 w-[20%]">&nbsp;</td>
                                    <td className="text-end p-2 w-[20%]">&nbsp;</td>
                                </tr>
                            );
                        }
                    }
                    return rows;
                })()}
            </table>
            <div className="flex flex-row justify-between items-end">
                <div className="flex flex-col justify-center items-start w-full">
                    <h1 className="font-title text-sm">Invoice Date</h1>
                    <p className="text-sm">{new Date(date).toDateString()}</p>
                </div>
                <table className="w-full text-sm">
                    <tr>
                        <td className="text-left p-2">Subtotal</td>
                        <td className="text-end p-2">{currency}{amount - deliveryFee}</td>
                    </tr>
                    <tr>
                        <td className="text-left p-2">Delivery Fee</td>
                        <td className="text-end p-2">{currency}{deliveryFee}</td>
                    </tr>
                    <tr className="font-title bg-primary">
                        <td className="text-left p-2">TOTAL</td>
                        <td className="text-end p-2">{currency}{amount}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Preview;