import { Music } from 'lucide-react'

export default function MusicNotes() {
    const numNotes = 12; // Number of notes in the zigzag
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(numNotes)].map((_, i) => {
                const verticalOffset = Math.sin(i * 0.5 * Math.PI) * 35;
                
                return (
                    <Music
                        key={i}
                        className="absolute text-yellow-400 animate-float"
                        style={{
                            left: `${(i * 12)}%`,
                            top: `${50 + verticalOffset}%`,
                            fontSize: '24px',
                            animationDelay: `${i * 0.3}s`,
                        }}
                    />
                )
            })}
        </div>
    )
}

