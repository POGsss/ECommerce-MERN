import { assets } from "../assets/assets"


const OurPolicy = () => {
        
    return (
        <div className="flex flex-col items-center justify-center my-20">
            <div className="w-full xl:w-[1000px] flex flex-col sm:flex-row justify-between gap-12 sm:gap-2 text-center text-xs sm:text-sm md:text-base text-black">
                <div>
                    <img src={assets.exchange_icon} className="w-16 m-auto mb-8" alt="" />
                    <p className="font-subtitle">Easy Exchange Policy</p>
                    <p className="font-text text-gray-500">We offer hassle free exchange policy</p>
                </div>
                <div>
                    <img src={assets.quality_icon} className="w-16 m-auto mb-8" alt="" />
                    <p className="font-subtitle">7 Days Return Policy</p>
                    <p className="font-text text-gray-500">We provide 7 days free return policy</p>
                </div>
                <div>
                    <img src={assets.support_icon} className="w-16 m-auto mb-8" alt="" />
                    <p className="font-subtitle">Best Customer Support</p>
                    <p className="font-text text-gray-500">We provide 24/7 customer support</p>
                </div>
            </div>
        </div>
    )
}

export default OurPolicy;