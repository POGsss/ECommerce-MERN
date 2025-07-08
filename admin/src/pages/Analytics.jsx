import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Analytics = ({ token }) => {
  const [orders, setOrders] =  useState([]);
  const navigate = useNavigate();

  const fetchRecentOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/order/recent", {}, { headers: { token } });

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
  }

  useEffect(() => {
    fetchRecentOrders();
  }, [token]);


  return (
    <div className="flex flex-col w-full items-start gap-6">
      <div className="w-full">
      <p className="mb-2 font-title text-black">Analytics</p>
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(215px,1fr))] gap-6">
          <div className="relative p-4 border border-black text-sm">
            <b className="">Total Orders</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative p-4 border border-black text-sm">
            <b className="">Online Orders</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative p-4 border border-black text-sm">
            <b className="">Store Orders</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative p-4 border border-black text-sm">
            <b className="">Pending Orders</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-start justify-start gap-6">
          <div className="relative col-span-1 lg:col-span-2 p-4 border border-black text-sm">
            <b>Recent Activity</b>
            <p className="">Latest Customer Orders</p>
            <div className="flex flex-col mt-4 gap-4">
              {orders.map((order, index) => (
                <div onClick={() => navigate("/orders")} className="flex flex-row justify-between items-center gap-4 cursor-pointer">
                  <div className="flex flex-row items-center justify-center gap-4">
                    <img className="w-[80px] h-[80px] border border-black p-2" src={assets.parcel_icon} alt="" />
                    <div>
                      <p className="font-subtitle text-start">{order.address.firstName + " " + order.address.lastName}</p>
                      <p className="text-start">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-center px-4 py-2 w-[100px] border border-black">{currency}{order.amount}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative col-span-1 p-4 border border-black text-sm">
            <b>Monthly Revenue</b>
            <p className="">Total Sales For This Month</p>
            <p className="text-xl">000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics;