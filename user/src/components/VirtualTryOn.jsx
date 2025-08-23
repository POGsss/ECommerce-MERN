import { useState } from "react";
import { assets } from "../assets/assets";
import { generateFitroom } from "../lib/Fitroom.jsx";
import { generateFashn } from "../lib/Fashn.jsx";
import { toast } from "react-toastify";

const VirtualTryOn = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [garmentImage, setGarmentImage] = useState(false);
	const [personImage, setPersonImage] = useState(false);
	const [resultImage, setResultImage] = useState(false);
	const [loading, setLoading] = useState(false);

	// Virtual Try On Fitroom
	const handleGenerateFitroom = async () => {
		if (personImage && garmentImage) {
			try {
				setLoading(true);
				const result = await generateFitroom(personImage, garmentImage);
				setResultImage(result);
			} catch (error) {
				console.error(error);
				toast("Failed to generate");
			} finally {
				setLoading(false);
			}
		}
	};

	// Virtual Try On Fashn
	const handleGenerateFashn = async () => {
		if (personImage && garmentImage) {
			try {
				setLoading(true);
				const result = await generateFashn(personImage, garmentImage);
				setResultImage(result);
			} catch (error) {
				console.error(error);
				toast("Failed to generate");
			} finally {
				setLoading(false);
			}
		}
	};

	const toggleTryOn = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div>
			{/* Floating Button */}
			<button onClick={toggleTryOn} className="fixed bottom-5 right-5 z-50 bg-[#bfbfbf] p-4 border border-black shadow-lg">
				<img src={assets.tryon_icon} alt="Chat Icon" />
			</button>

			{/* Popup Container */}
			{isOpen && (
				<div className="fixed bottom-[20px] right-[20px] z-50 bg-white border border-black flex flex-col items-center justify-center w-[calc(100%-40px)] sm:w-[500px]">
					{/* Overlay */}
					{loading && (
						<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}

					{/* Header */}
					<div className="w-full p-4 flex flex-row items-center justify-between border-b border-black">
						<p className="text-xl font-subtitle">Virtual Try On</p>
						<img className="cursor-pointer" onClick={toggleTryOn} src={assets.cross_icon} alt="" />
					</div>

					{/* Body */}
					<div className="w-full flex flex-col xs:flex-row gap-4 p-4">
						<div className="w-full flex flex-row xs:w-[250px] xs:flex-col gap-4 justify-between items-center">
							<label htmlFor="image1" className="w-full h-full">
								<img className="border border-black border-dashed w-full aspect-[1/1] object-cover" src={personImage ? URL.createObjectURL(personImage) : assets.upload_area} alt="" />
								<input onChange={(e) => setPersonImage(e.target.files[0])} type="file" id="image1" hidden />
							</label>
							<label htmlFor="image2" className="w-full h-full">
								<img className="border border-black border-dashed w-full aspect-[1/1] object-cover" src={garmentImage ? URL.createObjectURL(garmentImage) : assets.upload_area} alt="" />
								<input onChange={(e) => setGarmentImage(e.target.files[0])} type="file" id="image2" hidden />
							</label>
						</div>
						<div className="w-full flex">
							<label htmlFor="image3" className="w-full h-full">
								<img className="border border-black border-dashed w-full h-full object-cover" src={resultImage ? resultImage : assets.upload_area} alt="" />
								<input onChange={(e) => setResultImage(e.target.files[0])} type="file" id="image3" hidden />
							</label>
						</div>
					</div>

					{/* Footer */}
					<button onClick={handleGenerateFashn} className="w-[calc(100%-32px)] font-text md:text-base mb-4 px-8 py-4 bg-black text-white cursor-pointer active:bg-gray-500">Generate</button>
				</div>
			)}
		</div>
	);
};

export default VirtualTryOn;