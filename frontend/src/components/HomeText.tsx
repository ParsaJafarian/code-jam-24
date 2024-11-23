const HomeText = () => {
  return (
    <div className="absolute inset-y-0 left-0 flex flex-col justify-center text-white z-20 px-16 max-w-2xl">
      <h1 className="text-5xl font-bold mb-4 text-left">
        Hear It, See It, Play It <br />
        With <span className="text-[#ffff00]">Museify</span>
      </h1>
      <p className="text-xl text-red-100 text-left mb-8">
        Turn any melody into piano-ready sheet music.
        </p>
      <div className="flex gap-4">
        <button className="bg-[#ffff00] hover:bg-[#cccc00] text-black px-6 py-3 rounded-full font-semibold transition-colors">
          Get Started
        </button>
        <button className="border-2 border-[#ffff00] hover:bg-[#ffff00]/10 text-[#ffff00] px-6 py-3 rounded-full font-semibold transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HomeText; 