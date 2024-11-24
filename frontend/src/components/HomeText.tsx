import { Link } from 'react-router-dom';

const HomeText = () => {
  return (
    <div className="absolute inset-y-0 left-0 flex flex-col justify-center text-white z-20 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl pt-20 lg:pt-24 xl:pt-28">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-left leading-tight lg:leading-snug">
        Hear it, See it, Play it <br />
        with <span className="text-[#ffff00]">Museify</span>
      </h1>
      <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-red-100 text-left mb-8 space-y-4">
        <p>
          <span className="text-[#000000]">
            Experience the magic of turning sound into sheet music with Museify.
          </span>{' '}
          Whether you're a budding composer capturing spontaneous melodies or a
          pianist eager to learn new songs, Museify bridges the gap between
          inspiration and performance. Transform your favorite tunes into
          tangible music sheets and bring your music to life—
          <span className="text-[#ffff00]">simply, quickly, and beautifully.</span>
        </p>
      </div>
      <div className="flex gap-2 sm:gap-4 lg:gap-6">
        <Link to="/reader">
          <button className="bg-[#ffff00] text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold text-sm sm:text-base lg:text-lg xl:text-xl transition-all duration-300 border-2 border-transparent hover:border-[#ffff00] hover:bg-transparent hover:text-[#ffff00]">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeText;
