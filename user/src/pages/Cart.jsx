import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import CartTotal from "../components/CartTotal.jsx";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [ cartData, setCartData ] = useState([]);

  useEffect(() => {
    // Check Products If Available
    if (products.length > 0) {
      // Filter Cart Items
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
      // Set Cart Data
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="max-w-[1280px] mx-auto my-10">
        <div className="font-subtitle text-2xl pb-4">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        <div>
          {
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              return (
                <div key={index} id="cartList" className="relative p-4 grid xs:grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 rounded-[10px]">
                  <div className="flex items-center gap-6">
                    <img className="w-16 sm:w-20 rounded-[5px]" src={productData.image[0]} alt="" />
                    <div>
                      <p className="text-sm sm:text-lg font-subtitle">{productData.name}</p>
                      <div className="flex items-center gap-5 mt-2">
                        <p className="text-sm sm:text-lg font-text text-gray-500 w-[50px] sm:w-[75px]">{currency}{productData.price}</p>
                        <p className="text-sm sm:text-lg font-text text-gray-500 rounded-[5px] field px-2 py-1">{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e) => e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className="rounded-[5px] field w-[calc(100%-50px)] xs:justify-self-end xs:w-14 sm:w-24 px-2 py-1" type="number" min={1} defaultValue={item.quantity} />
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} className="absolute bottom-1 right-1 xs:relative xs:bottom-0 xs:right-0 w-6 m-4 sm:w-6 cursor-pointer justify-self-end" src={assets.bin_icon} alt="" />
                </div>
              )
            })
          }
        </div>

        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              {cartData.length > 0 
                ? <button onClick={() => navigate("/place-order")} className="font-text md:text-base px-8 py-4 mt-8 bg-secondary rounded-[10px] text-white cursor-pointer">PROCEED TO CHECKOUT</button> 
                : <button onClick={() => toast("No Items In Cart")} className="font-text md:text-base px-8 py-4 mt-8 bg-secondary rounded-[10px] text-white active:bg-gray-500">PROCEED TO CHECKOUT</button>
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart;