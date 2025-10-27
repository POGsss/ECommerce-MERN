import { useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import Title from "./Title";

const Login = ({ setToken }) => {
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ showPassword, setShowPassword ] = useState(false);

	const onSubmitHandler = async (e) => {
    	e.preventDefault();

		try {
			// Sending Post Request
			const response = await axios.post(backendUrl + "/api/user/admin", {email, password});
			
			// Validating Response
			if (response.data.success) {
				setToken(response.data.token);
			} else {
				toast(response.data.message);
			}
		} catch (error) {
			// Logging Error
			console.log(error);
			toast(error.message);
			toast(backendUrl);
		}
  	}

	return (
		<div className="flex flex-col min-h-screen">
			<div className="bg-secondary w-full max-w-[1440px] mx-auto full-bleed flex items-center justify-between py-5 font-text text-white">
				<img className="w-16" src={assets.logo} alt="" />
				<p className="hidden xs:block font-text text-sm">ADMIN PANEL</p>
				<p className="block xs:hidden font-text text-sm">ADMIN</p>
			</div>

			<form onSubmit={onSubmitHandler} className="flex flex-col items-center w-full max-w-[640px] mx-auto my-10 gap-4 bg-light-light p-4 sm:p-8 rounded-[20px]">
				<div className="font-subtitle text-2xl pb-4">
					<Title text1={"SIGN IN AS ADMIN"} text2={""} />
				</div>

				<div className="relative w-full">
					<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="w-full px-4 py-2 bg-light-dark rounded-[10px]" placeholder="Email" required />
					<img src={assets.email_icon} alt="" className="absolute right-3 opacity-50 top-1/2 -translate-y-1/2 w-6 h-6"/>
				</div>
				<div className="relative w-full">
					<input onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? "text" : "password"} className="w-full px-4 py-2 bg-light-dark rounded-[10px]" placeholder="Password" required />
					<img src={showPassword ? assets.eye_icon : assets.eye_closed_icon} alt="Toggle Password" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 opacity-50 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer"/>
				</div>

				<div className="w-full flex flex-col items-center gap-2 mt-4">
					<button type="submit" className="w-full font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer">SIGN IN</button>
				</div>
			</form>

			<div className="flex-grow"></div>

			<div className="bg-secondary w-full full-bleed max-w-[1440px] mx-auto">
            	<p className="py-5 text-sm text-center text-white">Copyright 2025 - bossdapparel.com - All Right Reserved.</p>
        	</div>
		</div>
	)
}

export default Login;