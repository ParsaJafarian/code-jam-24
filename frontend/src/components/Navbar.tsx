import { Link } from 'react-router-dom';
import logo from '../assets/images/logo6.png';

export function Navbar() {
    return (
        <header className="px-4 lg:px-8 h-14 lg:h-20 flex items-center bg-[#990909] sticky top-0 z-50">
            <Link className="flex items-center" to="/">
                <img
                    src={logo}
                    alt="Museify Logo"
                    className="h-16"
                />
            </Link>
            <div className="flex items-center justify-end w-full">
                <nav className="hidden md:flex gap-8">
                    <Link
                        className="text-sm lg:text-lg font-medium text-white relative group transition-transform duration-200 hover:scale-110"
                        to="/reader"
                    >
                        Get Started
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#ffff00] transition-all group-hover:w-full"></span>
                    </Link>
                </nav>
                <div className="flex md:hidden">
                    {/* Mobile Hamburger Menu */}
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => {
                            // Add your mobile menu toggle logic here
                        }}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
