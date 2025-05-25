import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₱";
    const deliveryFee = 30;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [ cartItems, setCartItems ] = useState({});

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast("Select a product size.");
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

        setCartItems(cartData);
    }

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

    const value = {
        products, currency, deliveryFee, 
        search, setSearch, showSearch, setShowSearch, 
        cartItems, addToCart, getCartCount
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;