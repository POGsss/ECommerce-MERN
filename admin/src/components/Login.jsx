import { useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import Title from "./Title";

const Login = ({ setToken }) => {
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");

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
		}
  	}

	return (
		<div className="flex flex-col min-h-screen">
			<div className="border-b border-black flex items-center justify-between py-5 font-text">
				<img className="w-36" src={assets.logo} alt="" />
				<p className="font-text text-sm">ADMIN PANEL</p>
			</div>

			<form onSubmit={onSubmitHandler} className="flex flex-col flex-grow items-center w-full max-w-[640px] mx-auto my-10 gap-4">
				<div className="font-subtitle text-2xl pb-4">
					<Title text1={"SIGN IN AS ADMIN"} text2={""} />
				</div>

				<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="w-full px-4 py-2 border border-black" placeholder="Email" required />
				<input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full px-4 py-2 border border-black" placeholder="Password" required />

				<div className="w-full flex flex-col items-center gap-2 mt-4">
					<button type="submit" className="w-full font-text md:text-base px-8 py-4 bg-black text-white cursor-pointer">SIGN IN</button>
				</div>
			</form>

			<div className="border-t border-black">
            	<p className="py-5 text-sm text-center">Copyright 2025 - bossdapparel.com - All Right Reserved.</p>
        	</div>
		</div>
	)
}

export default Login;