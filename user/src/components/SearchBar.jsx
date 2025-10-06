import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("collection")) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    return showSearch && visible ? (
        <div className="bg-secondary relative top-[-15px] text-center border-b border-black">
            <div className="inline-flex items-center justify-center bg-light-light rounded-[10px] px-4 py-2 my-4 mx-2 w-3/4 sm:w-1/2">
                <input value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 outline-none bg-inherit text-sm" type="text" placeholder="Search..." />
                <img onClick={() => setShowSearch(false)} className="inline cursor-pointer" src={assets.cross_icon} alt="" />
            </div>
        </div>
    ) : null
}

export default SearchBar;