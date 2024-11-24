import { Link } from 'react-router-dom';
import logo from '../assets/images/logo4.png';

export function Navbar() {
    return (
        <header className="px-4 lg:px-8 h-14 flex bg-[#990909] sticky top-0 z-50">
            <Link className="flex items-center" to="/">
                <img 
                    src={logo} 
                    alt="Museify Logo" 
                    className="h-24 sm:h-32"
                />
            </Link>
            <div className="flex items-center justify-end w-full">
                <nav className="hidden md:flex gap-8">
                    <Link 
                        className="text-sm font-medium text-white relative group"
                        to="/reader"
                    >
                        Get Started
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#ffff00] transition-all group-hover:w-full"></span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
