import * as React from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    return (
        <header className="px-16 lg:px-16 h-14 flex items-center bg-red-800 sticky top-0 z-50">
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                <a className="flex items-center justify-center" href="#">
                    <span className="font-bold text-xl text-white">MyApp</span>
                </a>
                <nav className="hidden md:flex gap-8">
                    <a className="text-sm font-medium text-white hover:text-red-200 hover:underline underline-offset-4" href="#features">
                        Features
                    </a>
                    <a className="text-sm font-medium text-white hover:text-red-200 hover:underline underline-offset-4" href="#pricing">
                        Pricing
                    </a>
                    <a className="text-sm font-medium text-white hover:text-red-200 hover:underline underline-offset-4" href="#about">
                        About
                    </a>
                    <a className="text-sm font-medium text-white hover:text-red-200 hover:underline underline-offset-4" href="#contact">
                        Contact
                    </a>
                </nav>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-white hover:text-red-200"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>
        </header>
    )
}

