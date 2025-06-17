import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import { useEffect } from "react";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [ token, setToken ] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-[2vw] md:px-[4vw] lg:px-[8vw]">

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      { token === "" ? <Login setToken={setToken} /> : <>
        <Navbar setToken={setToken} />
        <div className="flex-grow flex w-full">
          <Sidebar />
          <div className="w-[calc(100%-75px)] md:w-[calc(100%-250px)] ml-4 md:ml-8 my-8 text-gray-500 text-base">
            <Routes>
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </>}
    </div>
  )
}

export default App;