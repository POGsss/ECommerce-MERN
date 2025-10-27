import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { assets } from "../assets/assets";
import Title from "../components/Title.jsx";
import axios from "axios";

const Login = () => {
  const [ currentState, setCurrentState ] = useState("SIGN IN");
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  // Form Login
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Checking The Sign Up Or Sign In State
      if (currentState === "SIGN UP") {
        if (password !== confirmPassword) {
          toast("Passwords do not match");
          return;
        }

        const response = await axios.post(backendUrl + "/api/user/signup", {name, email, password});
        if (response.data.success) {
          // Saving Token To Local Storage
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
        } else {
          toast(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/signin", {email, password});
        if (response.data.success) {
          // Saving Token To Local Storage
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
        } else {
          toast(response.data.message);
        }
      }
    } catch (error) {
        // Logging Error
        console.log(error);
        toast(error.message);
    }
  }

  // Facebook Login
  const loginWithFacebook = async () => {
    toast("Please Try Another Method");
  }

  // Google Login
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Getting User Info Using Access Token
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {headers: { Authorization: `Bearer ${response.access_token}` }});

        // Sending User Info To Backend
        const backendResponse = await axios.post(backendUrl + "/api/user/google", { name: userInfo.data.name, email: userInfo.data.email });

        if (backendResponse.data.success) {
          // Store Token In LocalStorage
          localStorage.setItem("token", backendResponse.data.token);
          setToken(backendResponse.data.token);
          toast("Logged in successfully!");
        } else {
          toast(backendResponse.data.message);
        }
      } catch (error) {
        // Logging Error
        console.log(error);
        toast(error.message);
      }
    },
    onError: (error) => {
      console.log(error);
      toast(error.message);
    }
  });

  useEffect(() => {
    // Checking If User Is Already Logged In
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center max-w-[640px] mx-auto my-10 gap-4 bg-light-light p-4 sm:p-8 rounded-[20px]">
      <div className="font-subtitle text-2xl pb-4">
        <Title text1={currentState.split(" ")[0]} text2={currentState.split(" ")[1]} />
      </div>

      {currentState === "SIGN IN" ? "" : 
        <div className="relative w-full">
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full px-4 py-2 bg-light-dark rounded-[10px]" placeholder="Username" required/>
          <img src={assets.profile_icon} alt="" className="absolute right-3 opacity-50 top-1/2 -translate-y-1/2 w-6 h-6"/>
        </div>
      }
      <div className="relative w-full">
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="w-full px-4 py-2 bg-light-dark rounded-[10px]" placeholder="Email" required/>
        <img src={assets.email_icon} alt="" className="absolute right-3 opacity-50 top-1/2 -translate-y-1/2 w-6 h-6"/>
      </div>
      <div className="flex flex-row w-full gap-4">
        <div className="relative w-full">
          <input onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? "text" : "password"} className="w-full px-4 py-2 bg-light-dark rounded-[10px] pr-10" placeholder="Password" required/>
          <img src={showPassword ? assets.eye_icon : assets.eye_closed_icon} alt="Toggle Password" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 opacity-50 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer"/>
        </div>
        {currentState === "SIGN IN" ? "" : 
          <div className="relative w-full">
            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type={showConfirmPassword ? "text" : "password"} className="w-full px-4 py-2 bg-light-dark rounded-[10px]" placeholder="Confirm Password" required/>
            <img src={showConfirmPassword ? assets.eye_icon : assets.eye_closed_icon} alt="Toggle Password" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 opacity-50 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer"/>
          </div>
        }
      </div>

      <div className="w-full flex items-center justify-between text-sm">
        <p className="cursor-pointer">{currentState === "SIGN UP" ? "Already have an account?" : "Don't have an account?"}</p>
        { currentState === "SIGN IN" 
          ? <p onClick={() => setCurrentState("SIGN UP")} className="cursor-pointer">Sign Up here</p>
          : <p onClick={() => setCurrentState("SIGN IN")} className="cursor-pointer">Sign In here</p>
        }
      </div>
      
      <div className="w-full flex flex-col items-center gap-2 mt-4">
        <button type="submit" className="w-full font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer">{currentState === "SIGN IN" ? "SIGN IN" : "SIGN UP"}</button>
        <p>or</p>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <button onClick={() => loginWithFacebook()} type="button" className="w-full font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer">FACEBOOK {currentState}</button>
          <button onClick={() => loginWithGoogle()} type="button" className="w-full font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer">GOOGLE {currentState}</button>
        </div>
      </div>
    </form>
  )
}

export default Login;