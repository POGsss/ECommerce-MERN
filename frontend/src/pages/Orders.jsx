import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title.jsx';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [ orderData, setOrderData ] = useState([]);

  const fetchOrders = async () => {
    try {
      // Checking If User Logged In
      if (!token) {
        return null;
      }

      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/order/user", {}, { headers: { token } });

      // Creating Order Data
      if (response.data.success) {
        let allOrders = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;

            allOrders.push(item);
          });
        });
        setOrderData(allOrders.reverse());
      }

      // Setting Order Data
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
  }

  useEffect(() => {
      fetchOrders();
  }, [token]);

  return (
    <div className="max-w-[1440px] mx-auto my-10">
      <div className="font-subtitle text-2xl pb-4 border-b border-black">
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div key={index} className="py-4 border-b border-black flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="text-base sm:text-lg font-subtitle">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm sm:text-base">{currency}{item.price}</p>
                    <p className="text-sm sm:text-base">Quantity: {item.quantity}</p>
                    <p className="text-sm sm:text-base">Size: {item.size}</p>
                  </div>
                  <p>Date: <span className="text-sm sm:text-base text-gray-500">{new Date(item.date).toDateString()}</span></p>
                  <p>Payment: <span className="text-sm sm:text-base text-gray-500">{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="min-w-3 h-3 rounded-full bg-gray-500 border border-black"></p>
                <p className="text-sm sm:text-base">{item.status}</p>
              </div>
              <button onClick={fetchOrders} className="border border-black px-4 py-2 text-sm">Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;