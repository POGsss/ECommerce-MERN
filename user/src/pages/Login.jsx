import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";
import Title from "../components/Title.jsx";
import axios from "axios";

const Login = () => {
  const [ currentState, setCurrentState ] = useState("SIGN IN");
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Checking The Sign Up Or Sign In State
      if (currentState === "SIGN UP") {
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

  useEffect(() => {
    // Checking If User Is Already Logged In
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center max-w-[640px] mx-auto my-10 gap-4">
      <div className="font-subtitle text-2xl pb-4">
        <Title text1={currentState} text2={""} />
      </div>

      {currentState === "SIGN IN" ? "" : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full px-4 py-2 border border-black" placeholder="Username" required/> }
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="w-full px-4 py-2 border border-black" placeholder="Email" required/>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full px-4 py-2 border border-black" placeholder="Password" required/>

      <div className="w-full flex items-center justify-between text-sm">
        <p className="cursor-pointer">Forgot your password?</p>
        { currentState === "SIGN IN" 
          ? <p onClick={() => setCurrentState("SIGN UP")} className="cursor-pointer">Create account</p>
          : <p onClick={() => setCurrentState("SIGN IN")} className="cursor-pointer">Sign In here</p>
        }
      </div>
      
      <div className="w-full flex flex-col items-center gap-2 mt-4">
        <button type="submit" className="w-full font-text md:text-base px-8 py-4 bg-black text-white cursor-pointer">{currentState === "SIGN IN" ? "SIGN IN" : "SIGN UP"}</button>
        <p>or</p>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <button type="button" className="w-full font-text md:text-base px-8 py-4 bg-black text-white cursor-pointer">{currentState} WITH FACEBOOK</button>
          <button type="button" className="w-full font-text md:text-base px-8 py-4 bg-black text-white cursor-pointer">{currentState} WITH GOOGLE</button>
        </div>
      </div>
    </form>
  )
}

export default Login;