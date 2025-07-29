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
				<div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white border border-black flex flex-col items-center justify-center w-full md:w-[500px]">
					{/* Header */}
					<div className="w-full p-4 flex flex-row items-center justify-between border-b border-black">
						<p className="text-xl font-subtitle">Virtual Try On</p>
						<img className="cursor-pointer" onClick={toggleTryOn} src={assets.cross_icon} alt="" />
					</div>

					{/* Body */}
					<div className="w-full flex flex-row gap-4 p-4">
						<div className="w-[250px] flex flex-col gap-4 justify-between items-center">
							<label htmlFor="image1" className="w-full h-full">
								<img className="border border-black border-dashed w-full h-full object-cover" src={garmentImage ? URL.createObjectURL(garmentImage) : assets.upload_area} alt="" />
								<input onChange={(e) => setGarmentImage(e.target.files[0])} type="file" id="image1" hidden />
							</label>
							<label htmlFor="image1" className="w-full h-full">
								<img className="border border-black border-dashed w-full h-full object-cover" src={garmentImage ? URL.createObjectURL(garmentImage) : assets.upload_area} alt="" />
								<input onChange={(e) => setGarmentImage(e.target.files[0])} type="file" id="image1" hidden />
							</label>
						</div>
						<div className="w-full flex">
							<label htmlFor="image1" className="w-full h-full">
								<img className="border border-black border-dashed w-full h-full object-cover" src={garmentImage ? URL.createObjectURL(garmentImage) : assets.upload_area} alt="" />
								<input onChange={(e) => setGarmentImage(e.target.files[0])} type="file" id="image1" hidden />
							</label>
						</div>
					</div>

					{/* Footer */}
					<button onClick={handleGenerate} className="w-[calc(100%-32px)] font-text md:text-base mb-4 px-8 py-4 bg-black text-white cursor-pointer active:bg-gray-500">Generate</button>
				</div>
			)}
		</div>
	);
};

export default VirtualTryOn;