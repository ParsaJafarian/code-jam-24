
export function Navbar() {
    return (
        <header className="px-4 lg:px-8 h-14 flex bg-red-800 sticky top-0 z-50">
            <a className="flex items-center" href="/">
                <span className="font-bold text-xl text-white">Museify</span>
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
