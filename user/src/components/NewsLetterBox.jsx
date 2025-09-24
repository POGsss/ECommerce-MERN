

const NewsLetterBox = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className="text-center p-10 bg-primary rounded-[20px]">
            <p className="text-2xl font-subtitle">Subscribe now & get 20% off</p>
            <p className="text-gray-500 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, voluptates.</p>
            <form onSubmit={onSubmitHandler} className="w-full md:w-[700px] flex items-center gap-2 mx-auto my-6 rounded-[10px] overflow-hidden bg-light pl-4">
                <input className="w-full sm:flex-1 bg-transparent outline-none placeholder-gray-500" type="email" placeholder="Email..."/>
                <button className="font-text md:text-base px-8 py-4 bg text-white cursor-pointer" type="submit">SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewsLetterBox;