import { assets } from "../assets/assets";

const Navbar = () => {
    return (
        <div className="border-b border-black flex items-center justify-between py-5 font-text">
			{/* Logo */}
			<img className="w-36" src={assets.logo} alt="" />

			{/* Menu */}
			<p className="font-text">ADMIN PANEL</p>

			{/* Icons */}
			<button className="flex items-center gap-4 font-text md:text-base px-4 sm:px-8 py-4 bg-black text-white cursor-pointer">
				<img className="w-6 h-6" src={assets.signout_icon} alt="" />
				<p className="hidden sm:block">SIGN OUT</p>
			</button>
		</div>
    )
}

export default Navbar;