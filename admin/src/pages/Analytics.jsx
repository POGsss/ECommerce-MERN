import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx-js-style";
import axios from "axios";

const Analytics = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState("000");
  const [onlineOrders, setOnlineOrders] = useState("000");
  const [storeOrders, setStoreOrders] = useState("000");
  const [pendingOrders, setPendingOrders] = useState("000");
  const [totalRevenue, setTotalRevenue] = useState("000");
  const [monthlyRevenue, setMonthlyRevenue] = useState("000");

  const navigate = useNavigate();

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      // Sending Post Request
      const response = await axios.post(backendUrl + "/api/order/admin?source=online", {}, { headers: { token } });

      // Checking Response
      if (response.data.success) {
        setAllOrders(response.data.orders);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      // Logging Error
      console.log(error);
      toast(error.message);
    }
  };

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

  const fetchOrdersCount = async () => {
    if (!token) {
      return null;
    }

    try {
      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/order/orders", {}, { headers: { token } });

      // Updating States
      if (response.data.success) {
        setTotalOrders(response.data.totalOrders);
        setOnlineOrders(response.data.onlineOrders);
        setStoreOrders(response.data.storeOrders);
        setPendingOrders(response.data.pendingOrders);
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

  const handleExportData = () => {
    // Prepare Summary Sheet Data
    const summaryHeader = ["Metric", "Value"];
    const summaryRows = [
      ["Total Orders", totalOrders],
      ["Online Orders", onlineOrders],
      ["Store Orders", storeOrders],
      ["Pending Orders", pendingOrders],
      ["Total Revenue", totalRevenue],
      ["Monthly Revenue", monthlyRevenue],
    ];

    // Prepare Orders Sheet data
    const orderHeader = ["Order ID", "Customer Name", "Email", "Status", "Amount"];
    const orderRows = allOrders.map((order, index) => [
      `${index + 1}. ${order._id}`,
      order.address.firstName + " " + order.address.lastName,
      order.address.email,
      order.status,
      order.amount,
    ]);

    const worksheetData = [
      // First Row
      ["Summary Report", "", "", "Order Breakdown"],
      // Second Row
      [...summaryHeader, "", ...orderHeader],
    ];

    summaryRows.forEach((r, i) => {
      if (!worksheetData[i + 2]) worksheetData[i + 2] = [];
      worksheetData[i + 2][0] = r[0];
      worksheetData[i + 2][1] = r[1];
    });

    orderRows.forEach((r, i) => {
      if (!worksheetData[i + 2]) worksheetData[i + 2] = [];
      worksheetData[i + 2][3] = r[0];
      worksheetData[i + 2][4] = r[1];
      worksheetData[i + 2][5] = r[2];
      worksheetData[i + 2][6] = r[3];
      worksheetData[i + 2][7] = r[4];
    });


    // Create Worksheet
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    // Merge cells
    ws["!merges"] = [
      // Summary Report Header
      { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
      // Recent Orders Header
      { s: { r: 0, c: 3 }, e: { r: 0, c: 7 } },
    ];

    // Set Column Widths
    ws["!cols"] = [
      { wch: 20 },
      { wch: 10 },
      { wch: 5 },
      { wch: 30 },
      { wch: 20 },
      { wch: 30 },
      { wch: 15 },
      { wch: 10 },
    ];

    // Set Row Heights
    ws["!rows"] = [
      { hpt: 30 }
    ];

    // Set Styling
    const headerRange = XLSX.utils.decode_range("A1:H1");
    const subHeaderRange = XLSX.utils.decode_range("A2:H2");
    const summaryRange = XLSX.utils.decode_range(`A3:B${2 + summaryRows.length}`);
    const ordersRange = XLSX.utils.decode_range(`D3:H${2 + orderRows.length}`);
    const summaryTable = XLSX.utils.decode_range(`A1:B${2 + summaryRows.length}`);
    const ordersTable = XLSX.utils.decode_range(`D1:H${2 + orderRows.length}`);

    // Header Styling
    for (let R = headerRange.s.r; R <= headerRange.e.r; ++R) {
      for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        if (C === 2) continue;
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) continue;

        ws[cellRef].s = {
          font: { bold: true },
          alignment: { horizontal: "center", vertical: "center" },
          fill: { fgColor: { rgb: "FFCD58" } },
        };
      }
    }

    // Sub-Header Styling
    for (let R = subHeaderRange.s.r; R <= subHeaderRange.e.r; ++R) {
      for (let C = subHeaderRange.s.c; C <= subHeaderRange.e.c; ++C) {
        if (C === 2) continue;
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) continue;

        ws[cellRef].s = {
          alignment: { horizontal: "left", vertical: "center" },
          fill: { fgColor: { rgb: "FFFFFF" } },
        };
      }
    }

    // Summary Table Styling
    for (let R = summaryRange.s.r; R <= summaryRange.e.r; ++R) {
      for (let C = summaryRange.s.c; C <= summaryRange.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) continue;

        ws[cellRef].s = {
          alignment: { horizontal: "left", vertical: "center" },
          fill: { fgColor: { rgb: "EEEEEE" } },
        };
      }
    }

    // Orders Table Styling
    for (let R = ordersRange.s.r; R <= ordersRange.e.r; ++R) {
      for (let C = ordersRange.s.c; C <= ordersRange.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) continue;

        ws[cellRef].s = {
          alignment: { horizontal: "left", vertical: "center" },
          fill: { fgColor: { rgb: "EEEEEE" } },
        };
      }
    }

    // Summary Table Borders
    for (let R = summaryTable.s.r; R <= summaryTable.e.r; ++R) {
      for (let C = summaryTable.s.c; C <= summaryTable.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) continue;

        const border = {};
        if (R === summaryTable.s.r) border.top = { style: "thin", color: { rgb: "000000" } };
        if (R === summaryTable.e.r) border.bottom = { style: "thin", color: { rgb: "000000" } };
        if (C === summaryTable.s.c) border.left = { style: "thin", color: { rgb: "000000" } };
        if (C === summaryTable.e.c) border.right = { style: "thin", color: { rgb: "000000" } };

        ws[cellRef].s = {
          ...(ws[cellRef].s || {}),
          border: { ...(ws[cellRef].s?.border || {}), ...border },
        };
      }
    }

    // Orders Table Borders
    for (let R = ordersTable.s.r; R <= ordersTable.e.r; ++R) {
      for (let C = ordersTable.s.c; C <= ordersTable.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) continue;

        const border = {};
        if (R === ordersTable.s.r) border.top = { style: "thin", color: { rgb: "000000" } };
        if (R === ordersTable.e.r) border.bottom = { style: "thin", color: { rgb: "000000" } };
        if (C === ordersTable.s.c) border.left = { style: "thin", color: { rgb: "000000" } };
        if (C === ordersTable.e.c) border.right = { style: "thin", color: { rgb: "000000" } };

        ws[cellRef].s = {
          ...(ws[cellRef].s || {}),
          border: { ...(ws[cellRef].s?.border || {}), ...border },
        };
      }
    }

    // Create Workbook and Export
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Summary & Orders");
    XLSX.writeFile(wb, "BossDApparel.xlsx");
  };



  useEffect(() => {
    fetchAllOrders();
    fetchRecentOrders();
    fetchOrdersCount();
    fetchRevenueTotal();
  }, [token]);

  return (
    <div className="flex flex-col w-full items-start gap-4">
      <div className="w-full">
        <p className="mb-2 font-title text-black">Analytics</p>
        <div className="w-full flex flex-wrap items-stretch gap-4">
          <div className="relative grow basis-[200px] p-4 bg-light-light rounded-[10px] text-sm">
            <b className="">Total Orders</b>
            <p className="text-xl">{totalOrders}</p>
            <img className="absolute w-[40px] bg-light-dark rounded-[5px] p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative grow basis-[200px] p-4 bg-light-light rounded-[10px] text-sm">
            <b className="">Online Orders</b>
            <p className="text-xl">{onlineOrders}</p>
            <img className="absolute w-[40px] bg-light-dark rounded-[5px] p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative grow basis-[200px] p-4 bg-light-light rounded-[10px] text-sm">
            <b className="">Store Orders</b>
            <p className="text-xl">{storeOrders}</p>
            <img className="absolute bg-light-dark rounded-[5px] p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
          <div className="relative grow basis-[200px] p-4 bg-light-light rounded-[10px] text-sm">
            <b className="">Pending Orders</b>
            <p className="text-xl">{pendingOrders}</p>
            <img className="absolute bg-light-dark rounded-[5px] p-2 top-4 right-4" src={assets.analytics_icon} alt="" />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-start justify-start gap-4">
          <div className="flex flex-col col-span-1 lg:col-span-2 gap-4">
            <div className="relative p-4 bg-light-light rounded-[10px] text-sm w-full">
              <b>Export Data</b>
              <p className="">Export business data in a excel format</p>
              <div onClick={() => handleExportData()} className="relative top-0 right-0 mt-2 sm:absolute sm:top-4 sm:right-4 sm:mt-0 bg-light-dark rounded-[5px] p-2 flex flex-row justify-center items-center gap-2 cursor-pointer">
                <img className="" src={assets.analytics_icon} alt="" />
                <p>Save</p>
              </div>
            </div>
            <div className="relative p-4 bg-light-light rounded-[10px] text-sm w-full">
              <b>Recent Activity</b>
              <p className="">Latest Customer Orders</p>
              <div className="flex flex-col mt-4 gap-4">
                {orders.map((order, index) => (
                  <div onClick={() => navigate("/orders")} className="flex flex-row justify-between items-center gap-4 cursor-pointer" key={index}>
                    <div className="flex flex-row items-center justify-center gap-4">
                      <img className="w-[60px] h-[60px] bg-light-dark rounded-[5px] p-2" src={assets.parcel_icon} alt="" />
                      <div>
                        <p className="font-subtitle text-start">{order.address.firstName + " " + order.address.lastName}</p>
                        <p className="text-start">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="hidden xs:block text-center px-4 py-2 w-[75px] bg-light-dark rounded-[5px]">{currency}{order.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative col-span-1 p-4 bg-light-light rounded-[10px] text-sm">
              <b>Total Revenue</b>
              <p className="">Total Orders All Time</p>
              <p className="text-xl">{currency}{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="relative col-span-1 p-4 bg-light-light rounded-[10px] text-sm">
              <b>Monthly Revenue</b>
              <p className="">Total Orders This Month</p>
              <p className="text-xl">{currency}{monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics;