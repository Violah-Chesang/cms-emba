import React from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Auth = () => {
  const handleLogin = () =>{
    return(
      <Login/>
    )
  }
  const handleSignup = () =>{
    return(
      <Signup/>
    )
  }
  return (
    <div className="bg-auth-background h-screen w-full bg-cover backdrop-brightness-50 bg-blue-800 flex flex-col justify-center items-center ">
      <div className="bg-blue-950 h-5/6 w-2/5 rounded-xl flex flex-col p-10">
        <div  className="flex flex-col items-center justify-center">
        <img
          src="../assets/mck_logo.png"
          alt=""
          className="size-40"
        />
        </div>
       
        <div className="flex flex-row justify-evenly m-7 pt-9 text-white">
          <button className="text-lg border-b-2 border-sky-700" onClick={handleLogin}>Login</button>
          <button className="text-lg border-b-2 border-sky-700" onClick={handleSignup}>Sign up</button>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default Auth;
