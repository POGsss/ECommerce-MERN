import { useState } from "react";
import Title from "../components/Title.jsx";

const Login = () => {
  const [ currentState, setCurrentState ] = useState("SIGN UP");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center min-h-[calc(100vh-475px)] max-w-[640px] mx-auto my-10 gap-4">
      <div className="font-subtitle text-2xl pb-4">
        <Title text1={currentState} text2={""} />
      </div>

      {currentState === "SIGN IN" ? "" : <input type="text" className="w-full px-4 py-2 border border-black" placeholder="Username" required/> }
      <input type="text" className="w-full px-4 py-2 border border-black" placeholder="Email" required/>
      <input type="text" className="w-full px-4 py-2 border border-black" placeholder="Password" required/>

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