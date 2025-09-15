import { useState } from "react";
import { assets } from "../assets/assets";
import { generateFashn } from "../lib/Fashn.jsx";
import { generateFitroom } from "../lib/Fitroom.jsx";
import { generateTryOn } from "../lib/Gemini.jsx";
import { toast } from "react-toastify";
import { useEffect } from "react";

const VirtualTryOn = ({ image }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isPreview, setIsPreview] = useState(false);
	const [garmentImage, setGarmentImage] = useState(false);
	const [personImage, setPersonImage] = useState(false);
	const [resultImage, setResultImage] = useState(null);
	const [loading, setLoading] = useState(false);
  	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

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

	// Virtual Try On Gemini
	const handleGenerateGemini = async () => {
		if (personImage && garmentImage) {
			try {
				setLoading(true);
				const result = await generateTryOn(personImage, garmentImage);
				setResultImage(result);
			} catch (error) {
				console.error(error);
				toast("Failed to generate");
			} finally {
				setLoading(false);
			}
		}
	};

	// Download Result Image
	const handleDownload = async (url, filename = "resultImage.png") => {
		const res = await fetch(url);
		const blob = await res.blob();
		const objectUrl = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = objectUrl;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(objectUrl);
	};

	// Toggle Popup
	const toggleTryOn = () => {
		setIsOpen((prev) => !prev);
	};

	// Set Garment Image from Prop
	useEffect(() => {
		if (image) {
			setGarmentImage(image);
		}
	}, [image]);

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
							<label htmlFor="image1" className="group relative w-full h-full" onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, }); }}>
								<img className="border border-black border-dashed w-full aspect-[1/1] object-cover cursor-pointer" src={personImage ? URL.createObjectURL(personImage) : assets.person_area} alt="" />
								<input onChange={(e) => setPersonImage(e.target.files[0])} type="file" id="image1" hidden />
								{personImage && (
									<div className="absolute pointer-events-none w-[200px] opacity-0 group-hover:opacity-75 bg-white" style={{ top: cursorPos.y, left: cursorPos.x, transform: "translate(-50%, -50%)", zIndex: 99 }} >
										<img src={URL.createObjectURL(personImage)} alt="Preview" className="w-full h-full"/>
									</div>
								)}
							</label>
							<label htmlFor="image2" className="group relative w-full h-full" onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, }); }}>
								<img className="border border-black border-dashed w-full aspect-[1/1] object-cover cursor-pointer" src={garmentImage ? URL.createObjectURL(garmentImage) : assets.garment_area} alt="" />
								<input onChange={(e) => setGarmentImage(e.target.files[0])} type="file" id="image2" hidden />
								{garmentImage && (
									<div className="absolute pointer-events-none w-[200px] opacity-0 group-hover:opacity-75 bg-white" style={{ top: cursorPos.y, left: cursorPos.x, transform: "translate(-50%, -50%)", zIndex: 99 }} >
										<img src={URL.createObjectURL(garmentImage)} alt="Preview" className="w-full h-full"/>
									</div>
								)}
							</label>
						</div>
						<div className="w-full flex">
							<label htmlFor="image3" className="group relative w-full h-full">
								<img className="border border-black border-dashed h-full w-full aspect-[4/3] object-cover" src={resultImage ? resultImage : assets.result_area} alt="" />
								{resultImage && (
									<div className="absolute bottom-2 right-2 bg-white p-2 border border-black cursor-pointer" onClick={() => setIsPreview(true)}>
										<img src={assets.zoom_icon} alt="Zoom Icon" className="w-6 h-6"/>
									</div>
								)}
							</label>
						</div>
					</div>

					{/* Preview Modal */}
					{isPreview && (
						<div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] p-4 w-full h-full">
							<img src={resultImage} alt="Preview" className="w-full h-full object-contain" />
							<div className="absolute top-4 right-4 flex gap-2">
								<button className="bg-white text-black p-2 border border-black cursor-pointer" onClick={(e) => { e.preventDefault(); handleDownload(resultImage, "resultImage.png"); }}>
									<img src={assets.download_icon} alt="" />
								</button>
								<button className="bg-white text-black p-2 border border-black cursor-pointer" onClick={() => setIsPreview(false)}>
									<img src={assets.cross_icon} alt="" />
								</button>
							</div>
						</div>
					)}

					{/* Footer */}
					<button onClick={handleGenerateFashn} className="w-[calc(100%-32px)] font-text md:text-base mb-4 px-8 py-4 bg-black text-white cursor-pointer active:bg-gray-500">Generate</button>
				</div>
			)}
		</div>
	);
};

export default VirtualTryOn;