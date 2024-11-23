import logo from '../assets/images/logo4.png';

export function Navbar() {
    return (
        <header className="px-4 lg:px-8 h-14 flex bg-[#bd1414] sticky top-0 z-50">
            <a className="flex items-center" href="/">
                <img 
                    src={logo} 
                    alt="Museify Logo" 
                    className="h-24 sm:h-32"
                />
            </a>
            <div className="flex items-center justify-end w-full">
                <nav className="hidden md:flex gap-8">
                    <a className="text-sm font-medium text-white hover:text-red-200 hover:underline underline-offset-4" href="/reader">
                        Get Started
                    </a>
                </nav>
            </div>
        </header>
    )
}
