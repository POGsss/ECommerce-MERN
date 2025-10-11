import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
	return (
		<div className="sticky top-0 h-full sidebar min-w-[75px] md:w-[250px]">
			<div className="flex flex-col gap-4 py-6 text-base">
				<NavLink className="flex items-center gap-3 bg-light-light hover:bg-light-dark rounded-[10px] px-4 py-2" to="/analytics">
					<img className="w-6 h-6" src={assets.analytics_icon} alt="" />
					<p className="hidden md:block">Analytics</p>
				</NavLink>
				<NavLink className="flex items-center gap-3 bg-light-light hover:bg-light-dark rounded-[10px] px-4 py-2" to="/add">
					<img className="w-6 h-6" src={assets.add_icon} alt="" />
					<p className="hidden md:block">Add Items</p>
				</NavLink>
				<NavLink className="flex items-center gap-3 bg-light-light hover:bg-light-dark rounded-[10px] px-4 py-2" to="/list">
					<img className="w-6 h-6" src={assets.list_icon} alt="" />
					<p className="hidden md:block">List Items</p>
				</NavLink>
				<NavLink className="flex items-center gap-3 bg-light-light hover:bg-light-dark rounded-[10px] px-4 py-2" to="/orders">
					<img className="w-6 h-6" src={assets.order_icon} alt="" />
					<p className="hidden md:block">Order Items</p>
				</NavLink>
			</div>
		</div>
	)
}

export default Sidebar;