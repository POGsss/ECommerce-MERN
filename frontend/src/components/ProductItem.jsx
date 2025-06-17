import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";


const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext)

    return (
        <Link className="text-gray-800 cursor-pointer" to={`/product/${id}`}>
            <div className="overflow-hidden border-black border">
                <img className="hover:scale-110 transition ease-in-out w-full" src={image[0]} alt="" />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className="text-sm font-subtitle">{currency}{price}</p>
        </Link>
    )
}

export default ProductItem;