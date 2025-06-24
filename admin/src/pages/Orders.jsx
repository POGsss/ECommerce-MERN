import { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/order/admin", {}, { headers: { token } });

      // Checking Response
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      // Logging Error
      console.log(error);
      toast(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <p className="mb-2 font-title text-black">Order Page</p>
      <div>
        {orders.map((order, index) => (
          <div className="relative grid grid-cols-1 sm:grid-cols-[75px_2fr_1fr] lg:grid-cols-[75px_2fr_1fr_0.5fr_200px] gap-4 items-start border border-black p-4 my-4 text-sm" key={index} >
            <img className="w-full xs:absolute xs:w-[100px] xs:bottom-[70px] xs:right-4 sm:relative sm:right-0 sm:bottom-0 border border-black p-2" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                  } else {
                    return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                  }
                })}
              </div>
              <p className="py-2 font-subtitle">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ", " + order.address.city + ", " + order.address.state + ", " + order.address.zipCode}</p>
              </div>
              <p>{order.address.phoneNumber}</p>
            </div>
            <div>
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Paid" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="font-subtitle">{currency}{order.amount}</p>
            <select className="col-span-1 sm:col-span-2 lg:col-span-1 w-full px-4 py-2 border border-black">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders