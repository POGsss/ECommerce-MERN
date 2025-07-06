import { useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const Analytics = ({ token }) => {


  return (
    <div className="flex flex-col w-full items-start gap-6">
      <div className="w-full">
      <p className="mb-2 font-title text-black">Analytics</p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative p-4 border border-black text-sm">
            <b>Total Sales</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative p-4 border border-black text-sm">
            <b>Online Sales</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative p-4 border border-black text-sm">
            <b>Store Sales</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative p-4 border border-black text-sm">
            <b>Pending Orders</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="relative p-4 border border-black text-sm">
            <b>Recent Activity</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative p-4 border border-black text-sm">
            <b>Monthly Revenue</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics;