import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Menu, X } from 'lucide-react'

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
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

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <nav className="flex flex-col items-center py-4 bg-background">
                        <a className="w-full text-center py-2 hover:bg-accent" href="#features" onClick={() => setIsMenuOpen(false)}>
                            Features
                        </a>
                        <a className="w-full text-center py-2 hover:bg-accent" href="#pricing" onClick={() => setIsMenuOpen(false)}>
                            Pricing
                        </a>
                        <a className="w-full text-center py-2 hover:bg-accent" href="#about" onClick={() => setIsMenuOpen(false)}>
                            About
                        </a>
                        <a className="w-full text-center py-2 hover:bg-accent" href="#contact" onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </a>
                    </nav>
                </div>
            )}

            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Welcome to MyApp
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Your one-stop solution for all your needs. Discover how we can help you achieve your goals.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button>Get Started</Button>
                                <Button variant="outline">Learn More</Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: 'Easy Integration', description: 'Seamlessly integrate with your existing systems' },
                                { title: 'Powerful Analytics', description: 'Gain insights with our advanced analytics tools' },
                                { title: '24/7 Support', description: 'Round-the-clock support for all your needs' }
                            ].map((feature, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{feature.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="link" className="p-0">
                                            Learn more <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 MyApp Inc. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <a className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </a>
                    <a className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </a>
                </nav>
            </footer>
        </div>
    )
}

export default App