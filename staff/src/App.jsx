import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Products from "./pages/Products.jsx";
import Receipt from "./pages/Receipt.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₱";

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
        <div className="flex-grow flex w-full max-w-[1440px] mx-auto">
          <Sidebar />
          <div className="w-[calc(100%-75px)] md:w-[calc(100%-250px)] ml-4 md:ml-8 my-8 text-base">
            <Routes>
              <Route path="/products" element={<Products token={token} />} />
              <Route path="/receipt" element={<Receipt token={token} />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </>}
    </div>
  )
}

export default App;