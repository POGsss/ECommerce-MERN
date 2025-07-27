import { useState } from "react";
import { assets } from "../assets/assets";

const VirtualTryOn = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [garmentImage, setGarmentImage] = useState(false);
	const [personImage, setPersonImage] = useState(false);
	const [resultImage, setResultImage] = useState(false);

	const handleGarmentChange = (e) => {
		const file = e.target.files[0];
		if (file) setGarmentImage(URL.createObjectURL(file));
	};

	const handlePersonChange = (e) => {
		const file = e.target.files[0];
		if (file) setPersonImage(URL.createObjectURL(file));
	};

	const handleGenerate = async () => {
		setResultImage("https://via.placeholder.com/300x400?text=Generated+Result");
	};

	const toggleTryOn = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div>
			{/* Floating Button */}
			<button onClick={toggleTryOn} className="fixed bottom-5 right-5 z-50 bg-[#bfbfbf] p-4 border border-black shadow-lg">
				<img src={assets.chat_icon} alt="Chat Icon" />
			</button>

			{/* Popup Container */}
			{isOpen && (
				<div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white border border-black flex flex-row items-center justify-center p-4 xs:w-[500px] xs:h-[400px]">
					<div className="w-full flex flex-row gap-4">
						<div className="flex flex-col gap-2 justify-between items-center">
							<label htmlFor="image1">
								<img className="border border-black border-dashed w-full h-40 sm:w-40 object-cover" src={garmentImage ? URL.createObjectURL(garmentImage) : assets.upload_area} alt="" />
								<input onChange={(e) => setGarmentImage(e.target.files[0])} type="file" id="image1" hidden />
							</label>
							<label htmlFor="image1">
								<img className="border border-black border-dashed w-full h-40 sm:w-40 object-cover" src={garmentImage ? URL.createObjectURL(garmentImage) : assets.upload_area} alt="" />
								<input onChange={(e) => setGarmentImage(e.target.files[0])} type="file" id="image1" hidden />
							</label>
						</div>
						<div className="flex justify-between items-center">
							<label htmlFor="image1">
								<img className="border border-black border-dashed w-full h-40 sm:w-40 object-cover" src={garmentImage ? URL.createObjectURL(garmentImage) : assets.upload_area} alt="" />
								<input onChange={(e) => setGarmentImage(e.target.files[0])} type="file" id="image1" hidden />
							</label>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default VirtualTryOn;