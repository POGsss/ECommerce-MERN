import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
	return (
		<div className="sidebar w-[75px] min-h-[calc(100vh-165px)] md:w-[250px] border-r border-black">
			<div className="flex flex-col gap-4 pt-6 text-base">
				<NavLink className="flex items-center gap-3 border border-black border-r-0 px-4 py-2" to="/add">
					<img className="w-6 h-6" src={assets.add_icon} alt="" />
					<p className="hidden md:block">Add Items</p>
				</NavLink>
				<NavLink className="flex items-center gap-3 border border-black border-r-0 px-4 py-2" to="/list">
					<img className="w-6 h-6" src={assets.list_icon} alt="" />
					<p className="hidden md:block">List Items</p>
				</NavLink>
				<NavLink className="flex items-center gap-3 border border-black border-r-0 px-4 py-2" to="/orders">
					<img className="w-6 h-6" src={assets.order_icon} alt="" />
					<p className="hidden md:block">Order Items</p>
				</NavLink>
			</div>
		</div>
	)
}

export default Sidebar;