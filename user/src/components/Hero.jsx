import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
	return (
		<div className="my-10 flex flex-col sm:flex-row bg-primary rounded-[20px] overflow-hidden px-4 sm:px-10">
			{/* Left Side */}
			<div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
				<div className="flex flex-col items-center">
					<p className="font-text md:text-base">Come shop with us at</p>
					<h1 className="font-title text-3xl sm:py-3 lg:text-5xl mb-4">Boss D Apparel</h1>
					<Link to="/collection">
						<p className="font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer">SHOP NOW</p>
					</Link>
				</div>
			</div>
			{/* Right Side */}
			<img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
		</div>
	)
}

export default Hero;