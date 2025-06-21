import { products } from "../assets/assets"; // Sample Products Data
import { createContext, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    // Variables
    const currency = "₱";
    const deliveryFee = 30;

    // Environment Variables
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);

    // State Variables
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [ cartItems, setCartItems ] = useState({});
    const [ token, setToken ] = useState("");
    const navigate = useNavigate();
    
    // Add to Cart Functionality
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast("Please select a product size");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        console.log(cartData);
        setCartItems(cartData);
    }

    // Get Cart Count Functionality
    const getCartCount = () => {
        let totalCount = 0;

        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                try {
                    if (cartItems[item][size] > 0) {
                        totalCount += cartItems[item][size];
                    }
                } catch (error) {
                    
                }
            }
        }

        return totalCount;
    }

    // Get Cart Amount Functionality
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            let itemInfo = products.find((product) => product._id === item);

            for (const size in cartItems[item]) {
                try {
                    if (cartItems[item][size] > 0) {
                        totalAmount += itemInfo.price * cartItems[item][size];
                    }
                } catch (error) {
                    console.error("Error calculating cart amount:", error);
                }
            }
        }

        return totalAmount;
    }

    // Update Cart Quantity Functionality
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    // Fetch Products Data from Backend
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast("Failed to fetch products");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    // Call Functions On Component Mount
    useEffect(() => {
        getProductsData();
    }, []);

    // Check for Token in Local Storage
    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        } else {
            setToken("");
        }
    }, []);
    
    // Context Value Variables
    const value = {
        products, currency, deliveryFee, 
        search, setSearch, showSearch, setShowSearch, 
        cartItems, setCartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl, token, setToken
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;