import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

const Preview = ({ order, orderId }) => {
    const { currency, deliveryFee } = useContext(ShopContext);

    useEffect(() => {
        console.log("Order details:", order);
    }, [order]);

    return (
        <div className="w-full flex flex-col bg-light-light rounded-[10px] overflow-hidden">
            <div className="p-2 flex flex-row justify-between items-center bg-primary">
                <h1 className="font-title text-sm">INVOICE</h1>
                <p className="text-sm">{orderId.substring(0, 6) + "-" + orderId.substring(orderId.length - 6)}</p>
            </div>
            <table id="invoiceList" className="w-full text-sm">
                <tr className="font-title">
                    <td className="text-left p-2">ITEM</td>
                    <td className="text-end p-2">SIZE</td>
                    <td className="text-end p-2">QTY</td>
                    <td className="text-end p-2">PRICE</td>
                </tr>
                {order.items.map((item, index) => (
                    <tr key={index}>
                        <td className="text-left p-2">{item.name}</td>
                        <td className="text-end p-2">{item.size}</td>
                        <td className="text-end p-2">{item.quantity}</td>
                        <td className="text-end p-2">{currency}{item.price}</td>
                    </tr>
                ))}
            </table>
            <div className="p-2 flex flex-row justify-between items-center bg-primary">
                <h1 className="font-title text-sm">Total</h1>
                <p className="text-sm">{currency}{order.amount}</p>
            </div>
        </div>
    )
}

export default Preview;