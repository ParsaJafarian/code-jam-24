import Hero from '../components/Hero'
import Features from '../components/Features'
import CTA from '../components/CTA'

export default function About() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-100 to-indigo-100">
            <Hero />
            <Features />
            <CTA />
        </main>
    )
}

