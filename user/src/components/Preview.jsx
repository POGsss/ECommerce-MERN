import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

const Preview = ({ order, orderId }) => {
    const { currency } = useContext(ShopContext);

    useEffect(() => {
        console.log("Order details:", order);
    }, [order]);

    return (
        <div className="w-full flex flex-col bg-light-dark rounded-[10px] overflow-hidden">
            <div className="bg-primary p-4">
                <h1 className="font-title text-3xl">INVOICE</h1>
                <p>{orderId}</p>
            </div>
            {order.items.map((item, index) => (
                <div key={index} className="relative p-2 rounded-[10px]">
                    <h3 className="font-subtitle text-base">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Size: {item.size}</p>
                    <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                    <b className="absolute top-2 right-2 font-subtitle text-base">{currency}{item.price}</b>
                </div>
            ))}
            <div className="bg-primary p-4 flex flex-row justify-between items-center">
                <h1 className="font-title text-xl">TOTAL</h1>
                <p>{currency}{order.amount}</p>
            </div>
        </div>
    )
}

export default Preview;