import { assets } from "../assets/assets"


const OurPolicy = () => {
        
    return (
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center p-20 text-xs sm:text-sm md:text-base text-black">
            <div className="">
                <img src={assets.exchange_icon} className="w-16 m-auto mb-8" alt="" />
                <p className="font-subtitle">Easy Exchange Policy</p>
                <p className="font-text text-gray-500">We offer hassle free exchange policy</p>
            </div>
        </div>
    )
}

export default OurPolicy