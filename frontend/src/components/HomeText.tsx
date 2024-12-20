import { Link } from 'react-router-dom';

const HomeText = () => {
  return (
    <div className="absolute inset-y-0 left-0 flex flex-col justify-center text-white z-20 px-4 sm:px-8 md:px-16 max-w-full md:max-w-2xl pt-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-left">
        Hear it, See it, Play it <br />
        with <span className="text-[#ffff00]">Museify</span>
      </h1>
      <div className="text-base sm:text-lg text-red-100 text-left mb-8 space-y-4">
        <p>
          <span className="text-[#000000]">Experience the magic of turning sound into sheet music with Museify.</span> Whether you're a budding composer capturing spontaneous melodies or a pianist eager to learn new songs, Museify bridges the gap between inspiration and performance. Transform your favorite tunes into tangible music sheets and bring your music to life—<span className="text-[#ffff00]">simply, quickly, and beautifully.</span>
        </p>
      </div>
      <div className="flex gap-2 sm:gap-4">
        <Link to="/reader">
          <button className="bg-[#ffff00] text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 border-transparent hover:border-[#ffff00] hover:bg-transparent hover:text-[#ffff00]">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeText; 