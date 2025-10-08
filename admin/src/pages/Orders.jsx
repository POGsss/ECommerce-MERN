import { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [ showItemDialog, setShowItemDialog ] = useState(false);
  const [ selectedItems, setSelectedItems ] = useState([]);
  const [ orders, setOrders ] = useState([]);

  const handleImageClick = (items) => {
    setSelectedItems(items);
    setShowItemDialog(true);
  };

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      // Sending Post Request
      const response = await axios.post(backendUrl + "/api/order/admin?source=online", {}, { headers: { token } });

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

  const statusHandler = async (event, orderId) => {
    if (!token) {
      return null;
    }

    try {
      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { token } });

      // Checking Response
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      // Logging Error
      console.log(error);
      toast(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <p className="mb-2 font-title text-black">Order Page</p>
      <div>
        {orders.map((order, index) => (
          <div className="relative grid grid-cols-1 sm:grid-cols-[75px_2fr_1fr] lg:grid-cols-[75px_2fr_1fr_0.5fr_200px] gap-4 items-start bg-light-light rounded-[10px] p-4 mb-4 text-sm" key={index} >
            <img onClick={() => handleImageClick(order.items)} className="w-full xs:absolute xs:w-[100px] xs:bottom-[70px] xs:right-4 sm:relative sm:right-0 sm:bottom-0 bg-light-dark rounded-[5px] p-2 cursor-pointer" src={assets.parcel_icon} alt="" />
            <div>
              <p className="font-subtitle">{order.address.firstName + " " + order.address.lastName}</p>
              <p className="break-all">{order._id.substring(0, 8) + '-' + order._id.substring(order._id.length - 8)}</p>
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
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className="col-span-1 sm:col-span-2 lg:col-span-1 w-full px-4 py-2 bg-light-dark rounded-[5px]">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Completed" className="hidden">Completed</option>
            </select>
          </div>
        ))}
      </div>
      {showItemDialog && (
        <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full flex items-center justify-center p-8 z-50">
          <div className="flex flex-col w-full max-w-[400px] bg-light-light rounded-[20px] gap-4 p-4">
            <h1 className="font-title text-xl">Order Items</h1>
            <div className="pb-2">
              {selectedItems.map((item, index) => (
                <div key={index} className="flex justify-between border-b py-1 border-black">
                  <p>{item.name} ({item.size})</p>
                  <p>x {item.quantity}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowItemDialog(false)} className="flex-1 w-full font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer active:bg-primary active:text-black">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders