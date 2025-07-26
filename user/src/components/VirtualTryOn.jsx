import { useState } from "react";
import { assets } from "../assets/assets";

const VirtualTryOn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [garmentFile, setGarmentFile] = useState(null);
  const [personFile, setPersonFile] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const handleGarmentChange = (e) => {
    const file = e.target.files[0];
    if (file) setGarmentFile(URL.createObjectURL(file));
  };

  const handlePersonChange = (e) => {
    const file = e.target.files[0];
    if (file) setPersonFile(URL.createObjectURL(file));
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
        <div className="fixed z-50 inset-0 bg-white border border-black flex items-center justify-center p-4 xs:inset-auto xs:bottom-5 xs:right-5 xs:w-[300px] xs:h-[500px] xs:rounded-lg">
          <div className="w-full max-w-[400px] flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-black pb-2">
              <p className="text-xl font-subtitle">Virtual Try-On</p>
              <img
                className="cursor-pointer"
                onClick={toggleTryOn}
                src={assets.cross_icon}
                alt="Close"
              />
            </div>

            {/* Garment Upload */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">Garment Image</label>
              <input type="file" accept="image/*" onChange={handleGarmentChange} className="border border-black p-1" />
              {garmentFile && <img src={garmentFile} alt="Garment Preview" className="w-full h-auto border border-black" />}
            </div>

            {/* Person Upload */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">Person Image</label>
              <input type="file" accept="image/*" onChange={handlePersonChange} className="border border-black p-1" />
              {personFile && <img src={personFile} alt="Person Preview" className="w-full h-auto border border-black" />}
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full py-2 border border-black bg-[#bfbfbf] mt-2 font-bold"
            >
              Generate Result
            </button>

            {/* Result Image */}
            {resultImage && (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Result</label>
                <img src={resultImage} alt="Result" className="w-full h-auto border border-black" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTryOn;