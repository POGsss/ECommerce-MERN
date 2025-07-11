import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({category, subCategory}) => {
    const { products } = useContext(ShopContext);
    const [ related, setRelated ] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => category === item.category && subCategory === item.subCategory);

            setRelated(productsCopy.slice(0, 5));
        }
    }, [products]);

    return (
        <div className="my-20">
            <div className="text-center text-2xl">
                <Title text1="RELATED" text2="PRODUCTS" />
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-6">
                {related.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts;