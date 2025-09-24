import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";


const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext)

    return (
        <Link className="text-gray-800 cursor-pointer rounded-[10px] overflow-hidden bg-light shadow-md" to={`/product/${id}`}>
            <div className="overflow-hidden">
                <img className="hover:scale-110 transition ease-in-out w-full" src={image[0]} alt="" />
            </div>
            <div className="p-2">
                <p className="text-sm">{name}</p>
                <p className="text-sm font-subtitle">{currency}{price}</p>
            </div>
        </Link>
    )
}

export default ProductItem;