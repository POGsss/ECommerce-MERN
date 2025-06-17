import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import CartTotal from "../components/CartTotal.jsx";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [ cartData, setCartData ] = useState([]);

  useEffect(() => {
    const tempData = [];
    
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          tempData.push({
            _id: items,
            size: size,
            quantity: cartItems[items][size]
          });
        }
      }
    }
    
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="max-w-[1280px] mx-auto my-10">
        <div className="font-subtitle text-2xl pb-4 border-b border-black">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        <div className="">
          {
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              return (
                <div key={index} className="py-4 border-b border-black grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                  <div className="flex items-start gap-6">
                    <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />
                    <div>
                      <p className="text-sm sm:text-lg font-subtitle">{productData.name}</p>
                      <div className="flex items-center gap-5 mt-2">
                        <p className="text-sm sm:text-lg font-text text-gray-500 w-[50px] sm:w-[75px]">{currency}{productData.price}</p>
                        <p className="text-sm sm:text-lg font-text text-gray-500 border border-black px-2 py-1">{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e) => e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className="border border-black max-w-10 sm:max-w-20 px-2 py-1" type="number" min={1} defaultValue={item.quantity} />
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} className="w-4 m-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt="" />
                </div>
              )
            })
          }
        </div>

        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button onClick={() => navigate("/place-order")} className="font-text md:text-base px-8 py-4 mt-8 bg-black text-white cursor-pointer">PROCCED TO CHECKOUT</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart;