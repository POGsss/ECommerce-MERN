import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";

const PlaceOrder = () => {
  const { navigate } = useContext(ShopContext);
  const [ method, setMethod ] = useState("cod");

  return (
    <div className="max-w-[1440px] mx-auto my-10">
      <div className="font-subtitle text-2xl pb-4">
        <Title text1={"DELIVERY"} text2={"DETAILS"} />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-8">
        {/* Left Side */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[640px]">
            <div className="mb-0">
                <p className="font-subtitle text-xl">Personal Information:</p>
            </div>
          <div className="flex gap-3">
            <input className="border border-black px-4 py-2 w-full" type="text" placeholder="First Name" />
            <input className="border border-black px-4 py-2 w-full" type="text" placeholder="Last Name" />            
          </div>
          <input className="border border-black px-4 py-2 w-full" type="email" placeholder="Email Address" />
          <input className="border border-black px-4 py-2 w-full" type="text" placeholder="Street" />
          <div className="flex gap-3">
            <input className="border border-black px-4 py-2 w-full" type="text" placeholder="City" />
            <input className="border border-black px-4 py-2 w-full" type="text" placeholder="State" />
          </div>
          <div className="flex gap-3">
            <input className="border border-black px-4 py-2 w-full" type="number" placeholder="Zip Code" />
            <input className="border border-black px-4 py-2 w-full" type="text" placeholder="Country" />
          </div>
          <input className="border border-black px-4 py-2 w-full" type="number" placeholder="Phone Number" />
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[640px]">
          <CartTotal />
          <div className="mt-4">
            <p className="font-subtitle text-xl">Payment Method:</p>
            <div className="flex flex-col lg:flex-row gap-3 mt-4">
              <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border border-black px-4 py-2 cursor-pointer">
                <p className={`min-w-4 min-h-4 border border-black rounded-full ${method === "stripe" ? "bg-black" : ""}`}></p>
                <p className="text-sm font-subtitle">Stripe</p>
              </div>
              <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border border-black px-4 py-2 cursor-pointer">
                <p className={`min-w-4 min-h-4 border border-black rounded-full ${method === "razorpay" ? "bg-black" : ""}`}></p>
                <p className="text-sm font-subtitle">Razorpay</p>
              </div>
              <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border border-black px-4 py-2 cursor-pointer">
                <p className={`min-w-4 min-h-4 border border-black rounded-full ${method === "cod" ? "bg-black" : ""}`}></p>
                <p className="text-sm font-subtitle">Cash On Delivery</p>
              </div>
            </div>
            <div className="w-full text-end">
              <button onClick={() => navigate("/orders")} className="font-text md:text-base px-8 py-4 mt-8 bg-black text-white cursor-pointer">PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder;