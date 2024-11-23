import * as React from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    return (
        <header className="px-4 lg:px-8 h-14 flex items-center bg-red-800 sticky top-0 z-50">
            <div className="flex items-center w-full max-w-7xl mx-auto">
                <div className="flex-shrink-0">
                    <a className="flex items-center" href="/">
                        <span className="font-bold text-xl text-white">MyApp</span>
                    </a>
                </div>
                <nav className="hidden md:flex gap-8 flex-grow justify-end">
                    <a className="text-sm font-medium text-white hover:text-red-200 hover:underline underline-offset-4" href="/reader">
                        Get Started
                    </a>
                </nav>
                <div className="flex-shrink-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-white hover:text-red-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>
        </header>
    )
}

