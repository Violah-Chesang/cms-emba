import heroImage from '../../assets/hero_image-removebg.png';

function Hero() {
  return (
    <div className="bg-blue-950 min-h-[15rem] md:h-60 flex flex-col md:flex-row justify-evenly items-center rounded-lg p-6 md:p-10 overflow-hidden">

      {/* Text Container */}
      <div className="text-center md:text-left flex flex-col justify-center">
        <h1 className="text-white font-extrabold text-2xl md:text-4xl pb-1 md:pb-3 leading-tight">
          Welcome to MCK Embakasi
        </h1>
        <p className="text-sm md:text-xl text-blue-100 opacity-90">
          Where everyone is somebody and Jesus is Lord
        </p>
        <div>
          <button className="bg-[#efbf04] hover:bg-[#d4a904] transition-colors font-bold text-blue-950 py-2 px-5 mt-4 md:mt-5 rounded-md text-sm md:text-base">
            Learn More
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div className="mt-4 md:mt-0 h-full flex items-center justify-center">
        <img
          className="w-auto h-32 md:h-48 lg:h-56 object-contain drop-shadow-lg"
          src={heroImage}
          alt="Hero"
        />
      </div>

    </div>
  );
}

export default Hero;