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
        <div className="w-full flex items-center justify-start gap-6">
          <div className="relative p-4 border border-black text-sm min-w-[225px] w-[100%]">
            <b className="">Total Orders</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative p-4 border border-black text-sm min-w-[225px] w-[100%]">
            <b className="">Online Orders</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative p-4 border border-black text-sm min-w-[225px] w-[100%]">
            <b className="">Store Orders</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative p-4 border border-black text-sm min-w-[225px] w-[100%]">
            <b className="">Pending Orders</b>
            <p className="text-xl">000</p>
            <img className="absolute w-[45px] border border-black p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full flex grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative w-2/3 p-4 border border-black text-sm">
            <b>Recent Activity</b>
            <p className="">Latest Customer Orders</p>
            <p className="text-xl">000</p>
          </div>
          <div className="relative w-1/3 p-4 border border-black text-sm">
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