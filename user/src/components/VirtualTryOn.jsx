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
	const [prompt, setPrompt] = useState("");
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
				const result = await generateFashn(personImage, garmentImage, prompt);
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
				const result = await generateTryOn(personImage, garmentImage, prompt);
				setResultImage(result);
			} catch (error) {
				console.error(error);
				toast("Failed to generate");
			} finally {
				setLoading(false);
			}
		}
	};

	// Handle Demo Based on Available Services
	const handleDemo = async () => {
		if (!personImage || !garmentImage) {
			toast("This feature is disabled in demo.");
			return;
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
			<button onClick={toggleTryOn} className="fixed bottom-5 right-5 z-9 bg-primary rounded-[10px] p-4 shadow-lg">
				<img src={assets.tryon_icon} alt="Chat Icon" />
			</button>

			{/* Popup Container */}
			{isOpen && (
				<div className="fixed bottom-[20px] right-[20px] z-50 bg-light-dark rounded-[10px] overflow-hidden flex flex-col items-center justify-center w-[calc(100%-40px)] sm:w-[500px] shadow-lg">
					{/* Overlay */}
					{loading && (
						<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}

					{/* Header */}
					<div className="w-full p-4 flex flex-row items-center justify-between bg-light-light">
						<p className="text-xl font-subtitle">Virtual Try On</p>
						<img className="cursor-pointer" onClick={toggleTryOn} src={assets.cross_icon} alt="" />
					</div>

					{/* Body */}
					<div className="w-full flex flex-col xs:flex-row gap-4 p-4">
						<div className="w-full flex flex-row xs:w-[250px] xs:flex-col gap-4 justify-between items-center">
							<label htmlFor="image1" className="group relative w-full h-full aspect-[1/1] border border-black border-dashed rounded-[5px] overflow-hidden" onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, }); }}>
								<img className="w-full h-full object-cover group-hover:object-contain cursor-pointer bg-light-light" src={personImage ? URL.createObjectURL(personImage) : assets.person_area} alt="" />
								<input onChange={(e) => setPersonImage(e.target.files[0])} type="file" id="image1" hidden />
								{personImage && (
									<div className="absolute hidden sm:block pointer-events-none w-[200px] opacity-0 group-hover:opacity-100 bg-white" style={{ top: cursorPos.y, left: cursorPos.x, transform: `translate(-${cursorPos.x / 1.55}%, -${cursorPos.y / 1.55}%)`, zIndex: 99 }} >
										<img src={URL.createObjectURL(personImage)} alt="Preview" className="w-full h-full"/>
									</div>
								)}
							</label>
							<label htmlFor="image2" className="group relative w-full h-full aspect-[1/1] border border-black border-dashed rounded-[5px] overflow-hidden" onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, }); }}>
								<img className="w-full h-full object-cover group-hover:object-contain cursor-pointer bg-light-light" src={garmentImage ? URL.createObjectURL(garmentImage) : assets.garment_area} alt="" />
								<input onChange={(e) => setGarmentImage(e.target.files[0])} type="file" id="image2" hidden />
								{garmentImage && (
									<div className="absolute hidden sm:block pointer-events-none w-[200px] opacity-0 group-hover:opacity-100 bg-white" style={{ top: cursorPos.y, left: cursorPos.x, transform: `translate(-${cursorPos.x / 1.55}%, -${cursorPos.y / 1.55}%)`, zIndex: 99 }} >
										<img src={URL.createObjectURL(garmentImage)} alt="Preview" className="w-full h-full"/>
									</div>
								)}
							</label>
						</div>
						<div className="w-full flex">
							<label htmlFor="image3" className="group relative w-full h-full">
								<img className="border border-black border-dashed h-full w-full aspect-[4/3] object-cover bg-light-light rounded-[5px]" src={resultImage ? resultImage : assets.result_area} alt="" />
								{resultImage && (
									<div className="absolute bottom-2 right-2 bg-primary rounded-[5px] p-2 cursor-pointer" onClick={() => setIsPreview(true)}>
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
								<button className="bg-light-light rounded-[5px] text-black p-2 cursor-pointer" onClick={(e) => { e.preventDefault(); handleDownload(resultImage, "resultImage.png"); }}>
									<img src={assets.download_icon} alt="" />
								</button>
								<button className="bg-primary rounded-[5px] text-black p-2 cursor-pointer" onClick={() => setIsPreview(false)}>
									<img src={assets.cross_icon} alt="" />
								</button>
							</div>
						</div>
					)}

					{/* Footer */}
					<div className="w-full flex bg-light-light gap-2 p-4">
            			<input value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text" placeholder="Optional prompt..." className="w-full px-4 py-2 bg-light-dark rounded-[5px]" />
						<button onClick={handleDemo} className="font-text md:text-base px-4 py-2 bg-primary rounded-[5px] cursor-pointer hover:bg-primary">Generate</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default VirtualTryOn;