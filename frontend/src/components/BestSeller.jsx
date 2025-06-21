import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItem from "./ProductItem.jsx";
import Title from "./Title.jsx";

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProducts = products.filter(item => item.bestseller);
        setBestSeller(bestProducts.slice(0, 4));
    }, [products]);
        
    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1="BEST" text2="SELLERS" />
                <p className="w-2/3 m-auto text-xs sm:text-sm md:text-base text-gray-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti quis minus.
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
                {bestSeller.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    )
}

export default BestSeller;