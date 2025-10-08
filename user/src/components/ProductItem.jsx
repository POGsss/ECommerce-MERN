import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext)

    return (
        <Link className="relative text-black cursor-pointer rounded-[10px] overflow-hidden bg-light-light" to={`/product/${id}`}>
            <div className="overflow-hidden aspect-4/3">
                <img className="hover:scale-110 transition ease-in-out w-full h-full object-cover" src={image[0]} alt="" />
            </div>
            <div className="p-4 flex flex-col gap-1">
                <p className="text-sm font-subtitle">{name}</p>
                <p className="text-sm">0+ sold</p>
                <p className="text-lg font-subtitle">{currency}{price}</p>
            </div>
            <div className="absolute top-2 right-2 p-2 bg-light-light rounded-full flex items-center justify-center">
                <img className="w-5 cursor-pointer" src={assets.cart_icon} alt="" />
            </div>
        </Link>
    )
}

export default ProductItem;