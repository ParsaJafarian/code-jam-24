import * as React from 'react'
import { Menu, X, Music } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
]

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)


    return (
        <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-purple-700 sticky">
            <div className="flex items-center justify-between w-full">
                <a className="flex items-center justify-center" href="#">
                    <span className="font-bold text-xl">MyApp</span>
                </a>
                <nav className="hidden md:flex gap-4 sm:gap-6">
                    <a className="text-sm font-medium hover:underline underline-offset-4" href="#features">
                        Features
                    </a>
                    <a className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
                        Pricing
                    </a>
                    <a className="text-sm font-medium hover:underline underline-offset-4" href="#about">
                        About
                    </a>
                    <a className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
                        Contact
                    </a>
                </nav>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>
        </header>
    )
}

