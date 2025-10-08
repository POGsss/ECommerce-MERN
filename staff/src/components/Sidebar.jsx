import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
	return (
		<div className="sticky top-0 h-full sidebar w-[75px] md:w-[250px]">
			<div className="flex flex-col gap-4 py-6 text-base">
				<NavLink className="flex items-center gap-3 bg-light-light hover:bg-light-dark rounded-[10px] px-4 py-2" to="/products">
					<img className="w-6 h-6" src={assets.products_icon} alt="" />
					<p className="hidden md:block">Products</p>
				</NavLink>
				<NavLink className="flex items-center gap-3 bg-light-light hover:bg-light-dark rounded-[10px] px-4 py-2" to="/receipt">
					<img className="w-6 h-6" src={assets.receipt_icon} alt="" />
					<p className="hidden md:block">Receipt</p>
				</NavLink>
			</div>
		</div>
	)
}

export default Sidebar;