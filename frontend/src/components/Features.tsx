import { Mic2, Music2, Users, BookOpen } from 'lucide-react'

const features = [
    {
        icon: <Music2 size={40} />,
        title: 'Instrument Lessons',
        description: 'Learn to play various instruments with our comprehensive video lessons.',
    },
    {
        icon: <Mic2 size={40} />,
        title: 'Vocal Training',
        description: 'Improve your singing skills with personalized vocal exercises and tips.',
    },
    {
        icon: <Users size={40} />,
        title: 'Community',
        description: 'Connect with fellow musicians, share your progress, and collaborate on projects.',
    },
    {
        icon: <BookOpen size={40} />,
        title: 'Music Theory',
        description: 'Master the fundamentals of music theory to enhance your overall musicianship.',
    },
]

export default function Features() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-12">
                    Everything You Need to Become a Music Master
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-indigo-50 rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
                            <div className="text-indigo-600 mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-indigo-900 mb-2">{feature.title}</h3>
                            <p className="text-indigo-700">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

