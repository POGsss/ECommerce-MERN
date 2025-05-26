import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";

const CartTotal = () => {
    const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);

    return (
        <div className="w-full">
            <div className="mb-4">
                <p className="font-subtitle text-xl">Cart Total:</p>
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{getCartAmount()}.00</p>
                </div>
                <div className="flex justify-between border-t border-b pt-2 pb-2 border-black">
                    <p>Shipping Fee</p>
                    <p>{currency}{deliveryFee}.00</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-subtitle">Total</p>
                    <p className="font-subtitle">{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal