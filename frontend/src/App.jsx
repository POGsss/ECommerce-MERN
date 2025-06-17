import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";

const App = () => {
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

      <Navbar />
      <SearchBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;