import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Analytics = ({ token }) => {
  const [ orders, setOrders ] =  useState([]);

  const [ totalSales, setTotalSales ] =  useState("000");
  const [ onlineSales, setOnlineSales ] =  useState("000");
  const [ storeSales, setStoreSales ] =  useState("000");
  const [ pendingSales, setPendingSales ] =  useState("000");

  const [ totalRevenue, setTotalRevenue ] =  useState("000");
  const [ monthlyRevenue, setMonthlyRevenue ] =  useState("000");

  const navigate = useNavigate();

  const fetchRecentOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/order/recent?source=online", {}, { headers: { token } });

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

  const fetchSalesCount = async () => {
    if (!token) {
      return null;
    }

    try {
      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/order/sales", {}, { headers: { token } });

      // Updating States
      if (response.data.success) {
        setTotalSales(response.data.totalSales);
        setOnlineSales(response.data.onlineSales);
        setStoreSales(response.data.storeSales);
        setPendingSales(response.data.pendingSales);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      // Logging Error
      console.log(error);
      toast(error.message);
    }
  }

  const fetchRevenueTotal = async () => {
    if (!token) {
      return null;
    }

    try {
      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/order/revenue", {}, { headers: { token } });

      // Updating States
      if (response.data.success) {
        setTotalRevenue(response.data.totalRevenue);
        setMonthlyRevenue(response.data.monthlyRevenue);
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
    fetchSalesCount();
    fetchRevenueTotal();
  }, [token]);

  return (
    <div className="flex flex-col w-full items-start gap-4">
      <div className="w-full">
      <p className="mb-2 font-title text-black">Analytics</p>
        <div className="w-full flex flex-wrap items-stretch gap-4">
          <div className="relative grow basis-[200px] p-4 border border-black text-sm">
            <b className="">Total Sales</b>
            <p className="text-xl">{totalSales}</p>
            <img className="absolute w-[40px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative grow basis-[200px] p-4 border border-black text-sm">
            <b className="">Online Sales</b>
            <p className="text-xl">{onlineSales}</p>
            <img className="absolute w-[40px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative grow basis-[200px] p-4 border border-black text-sm">
            <b className="">Store Sales</b>
            <p className="text-xl">{storeSales}</p>
            <img className="absolute border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative grow basis-[200px] p-4 border border-black text-sm">
            <b className="">Pending Sales</b>
            <p className="text-xl">{pendingSales}</p>
            <img className="absolute border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-start justify-start gap-4">
          <div className="relative col-span-1 lg:col-span-2 p-4 border border-black text-sm">
            <b>Recent Activity</b>
            <p className="">Latest Customer Orders</p>
            <div className="flex flex-col mt-4 gap-4">
              {orders.map((order, index) => (
                <div onClick={() => navigate("/orders")} className="flex flex-row justify-between items-center gap-4 cursor-pointer" key={index}>
                  <div className="flex flex-row items-center justify-center gap-4">
                    <img className="w-[60px] h-[60px] border border-black p-2" src={assets.parcel_icon} alt="" />
                    <div>
                      <p className="font-subtitle text-start">{order.address.firstName + " " + order.address.lastName}</p>
                      <p className="text-start">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="hidden xs:block text-center px-4 py-2 w-[75px] border border-black">{currency}{order.amount}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative col-span-1 p-4 border border-black text-sm">
              <b>Total Revenue</b>
              <p className="">Total Sales All Time</p>
              <p className="text-xl">{currency}{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="relative col-span-1 p-4 border border-black text-sm">
              <b>Monthly Revenue</b>
              <p className="">Total Sales This Month</p>
              <p className="text-xl">{currency}{monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics;