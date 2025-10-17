import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    // Sign Out Functionality
    const signOut = () => {
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
        navigate("/signin");
    }

    return (
        <div className="w-full bg-secondary px-4 sm:px-[2vw] md:px-[4vw] lg:px-[8vw] z-10">
            <div className="flex max-w-[1440px] m-auto items-center justify-between py-5 font-text">
                {/* Logo */}
                <Link to="/">
                    <img className="w-16" src={assets.logo} alt="" />
                </Link>

                {/* Menu */}
                <ul className="hidden sm:flex gap-4 text-sm text-white">
                    <NavLink to="/" className="flex flex-col items-center gap-1">
                        <p className="font-text">HOME</p>
                        <hr className="w-2/4 border-none h-[1.5px] bg-white" hidden />
                    </NavLink>
                    <NavLink to="/collection" className="flex flex-col items-center gap-1">
                        <p className="font-text">COLLECTION</p>
                        <hr className="w-2/4 border-none h-[1.5px] bg-white" hidden />
                    </NavLink>
                    <NavLink to="/about" className="flex flex-col items-center gap-1">
                        <p className="font-text">ABOUT</p>
                        <hr className="w-2/4 border-none h-[1.5px] bg-white" hidden />
                    </NavLink>
                    <NavLink to="/contact" className="flex flex-col items-center gap-1">
                        <p className="font-text">CONTACT</p>
                        <hr className="w-2/4 border-none h-[1.5px] bg-white" hidden />
                    </NavLink>
                </ul>

                {/* Icons */}
                <div className="flex items-center gap-2 xs:gap-4">
                    <img onClick={() => setShowSearch(!showSearch)} src={assets.search_icon} className="invert w-5 min-w-5 cursor-pointer" alt="" />
                    <div className="group relative">
                        <img onClick={() => token ? null : navigate("/signin")} src={assets.profile_icon} className="invert w-5 min-w-5 cursor-pointer" alt="" />
                        {token && <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-light-light text-gray-500 rounded-[10px] shadow-lg">
                                <p className="cursor-pointer hover:text-black">Profile</p>
                                <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                                <p onClick={signOut} className="cursor-pointer hover:text-black">Sign Out</p>
                            </div>
                        </div>}
                    </div>
                    <Link to="/cart" className="relative">
                        <img src={assets.cart_icon} className="invert w-5 min-w-5 cursor-pointer" alt="" />
                        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-primary text-black aspect-square rounded-full text-[8px]">{getCartCount()}</p>
                    </Link>
                    <img onClick={() => setVisible(true)} src={assets.menu_icon} className="invert w-5 cursor-pointer sm:hidden" alt="" />
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-light-light transition-all ${visible ? "w-full" : "w-0"}`}>
                    <div id="navList" className="flex flex-col text-black ">
                        <div onClick={() => setVisible(false)} className="flex items-center gap-2 p-8 cursor-pointer">
                            <img className="w-5 rotate-90" src={assets.dropdown_icon} alt="" />
                            <p>Back</p>
                        </div>
                        <NavLink onClick={() => setVisible(false)} to="/" className="py-6 pl-6 border-t border-black">HOME</NavLink>
                        <NavLink onClick={() => setVisible(false)} to="/collection" className="py-6 pl-6 border-t border-black">COLLECTION</NavLink>
                        <NavLink onClick={() => setVisible(false)} to="/about" className="py-6 pl-6 border-t border-black">ABOUT</NavLink>
                        <NavLink onClick={() => setVisible(false)} to="/contact" className="py-6 pl-6 border-t border-b border-black">CONTACT</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;