import { assets } from "../assets/assets"

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
                <div>
                    <img className="mb-5 h-[50px]" src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                    </p>
                </div>
                <div>
                    <p className="text-xl font-subtitle mb-5 sm:leading-[50px]">COMPANY</p>
                    <ul className="felx flex-col gap-1 text-gray-500">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-subtitle mb-5 sm:leading-[50px]">GET IN TOUCH</p>
                    <ul className="felx flex-col gap-1 text-gray-500">
                        <li>+63 123-456-789</li>
                        <li>bossdapparel@gmail.com</li>
                        <li>Facebook</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-black">
                <p className="py-5 text-sm text-center">Copyright 2025 - bossdapparel.com - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;