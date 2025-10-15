import { assets } from "../assets/assets";


const NewsLetterBox = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className="text-center p-10 bg-primary rounded-[20px]">
            <p className="text-2xl font-subtitle">Subscribe now & get 20% off</p>
            <p className="text-gray-500 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, voluptates.</p>
            <form onSubmit={onSubmitHandler} className="w-full lg:w-[700px] flex items-center gap-2 mx-auto my-6 rounded-[10px] overflow-hidden bg-light-light pl-4">
                <input className="w-full sm:flex-1 bg-transparent outline-none placeholder-gray-500" type="email" placeholder="Email..."/>
                <button className="font-text md:text-base px-4 py-4 sm:px-8 sm:py-4 bg-secondary text-white cursor-pointer" type="submit">
                    <img src={assets.send_icon} alt="" className="invert block sm:hidden" />
                    <span className="hidden sm:block">SUBSCRIBE</span>
                </button>
            </form>
        </div>
    )
}

export default NewsLetterBox;