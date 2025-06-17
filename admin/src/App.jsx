import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "../../frontend/src/components/Login.jsx";

const App = () => {
  const [ token, setToken ] = useState("");

  return (
    <div className="px-4 sm:px-[2vw] md:px-[4vw] lg:px-[8vw]">
      { token === "" ? <Login /> : <>
        <Navbar />
        <div className="flex w-full h-[100%]">
          <Sidebar />
          <div className="w-[calc(100%-75px)] md:w-[calc(100%-250px)] ml-4 md:ml-8 my-8 text-gray-500 text-base">
            <Routes>
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </>}
    </div>
  )
}

export default App;