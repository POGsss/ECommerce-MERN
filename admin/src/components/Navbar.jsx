import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <div className="border-b border-black flex items-center justify-between py-5 font-text">
      {/* Logo */}
      <img className="w-36" src={assets.logo} alt="" />

      {/* Menu */}
      <p className="font-text">ADMIN PANEL</p>

      {/* Icons */}
      <button className="flex items-center gap-4 font-text md:text-base px-8 py-4 bg-black text-white cursor-pointer">
        <img src={assets.signout_icon} alt=""/>
        SIGN OUT
      </button>
    </div>
  )
}

export default Navbar;