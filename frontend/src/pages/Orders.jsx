import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title.jsx';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="max-w-[1280px] mx-auto my-10">
      <div className="font-subtitle text-2xl pb-4 border-b border-black">
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      <div>
        {
          products.slice(1, 4).map((item, index) => {
            return (
              <div key={index} className="py-4 border-b border-black flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-6 text-sm">
                  <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                  <div>
                    <p className="text-base sm:text-lg font-subtitle">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm sm:text-base">{currency}{item.price}</p>
                        <p className="text-sm sm:text-base">Quantity: 1</p>
                        <p className="text-sm sm:text-base">Size: XL</p>
                      </div>
                      <p>Date: <span className="text-sm sm:text-base text-gray-500">Mon, July 04, 2004</span></p>
                      <p>Payment: <span className="text-sm sm:text-base text-gray-500">COD</span></p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="min-w-3 h-3 rounded-full bg-gray-500 border border-black"></p>
                    <p className="text-sm sm:text-base">Delivered</p>
                  </div>
                  <button className="border border-black px-4 py-2 text-sm">Track Order</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders;