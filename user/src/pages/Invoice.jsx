import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import Preview from "../components/Preview";
import Title from "../components/Title";

const Invoice = () => {
    const [order, setOrder] = useState(null);
    const { cartItems, setCartItems } = useContext(ShopContext);
    const { orderId } = useParams();

    // Cleaning Up Cart Items on Unmount
    useEffect(() => {
        const savedOrder = localStorage.getItem("latestOrder");

        console.log("Saved Order:", savedOrder);

        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }

        return () => {
            setCartItems({});
        }
    }, []);

    return (
        <div className="flex flex-col items-center max-w-[640px] mx-auto my-10 gap-4 bg-light-light p-4 sm:p-8 rounded-[20px]">
            <div className="font-subtitle text-2xl pb-4">
                <Title text1={"ORDER"} text2={"COMPLETE"} />
            </div>
            {order ? (
                <Preview order={order} orderId={orderId} />
            ) : (
                <p>Loading order details...</p>
            )}
            <div className="w-full flex flex-col sm:flex-row items-center gap-2 mt-4">
                <button type="button" className="w-full font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer">MY ORDERS</button>
                <button type="button" className="w-full font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer">DOWNLOAD</button>
            </div>
        </div>
    )
}

export default Invoice;