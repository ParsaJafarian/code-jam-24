import { Music } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/music-notes-bg.svg')] opacity-5"></div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-indigo-900 mb-6">
                            Unlock Your Musical Potential
                        </h1>
                        <p className="text-xl text-indigo-700 mb-8">
                            Learn, practice, and master your favorite instruments with expert guidance and innovative tools.
                        </p>
                        <a
                            href="/get-started"
                            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Start Your Journey
                        </a>
                    </div>
                    <div className="lg:w-1/2 mt-12 lg:mt-0">
                        <div className="relative w-full h-96">
                            <div className="absolute inset-0 bg-indigo-200 rounded-full animate-pulse"></div>
                            <Music className="absolute inset-0 m-auto text-indigo-600" size={200} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

