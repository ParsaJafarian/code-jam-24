import { Music } from 'lucide-react'

export default function MusicNotes() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <Music
                    key={i}
                    className="absolute text-indigo-300 opacity-20 animate-float"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 30 + 20}px`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}
        </div>
    )
}

