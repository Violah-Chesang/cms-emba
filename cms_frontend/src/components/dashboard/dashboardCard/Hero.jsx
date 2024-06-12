import React from "react";
import '../nav/Sidenav'

function Hero() {
  return (
    <div className="bg-blue-950 h-60 w-12/12 flex flex-row justify-evenly items-center rounded-lg p-10">
      <div>
        <p className="text-white font-extrabold text-3xl pb-3">
          Welcome to MCK Embakasi
        </p>
        <p className="text-lg text-white">Where everyone is somebody and Jesus is Lord</p>
        <button className="bg-efbf04 p-2 text-blue mt-5 rounded-md px-5">
          Learn More
        </button>
      </div>
      <div>
        <img src="src/assets/hero_image-removebg.png" alt="" />
      </div>
    </div>
  );
}

export default Hero;
