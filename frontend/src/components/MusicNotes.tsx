import { Music } from 'lucide-react'

export default function MusicNotes() {
    const numNotes = 12;
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(numNotes)].map((_, i) => {
                const horizontalOffset = Math.random() * 100; // Random horizontal position
                
                return (
                    <Music
                        key={i}
                        className="absolute text-black opacity-30 animate-rain"
                        style={{
                            left: `${horizontalOffset}%`,
                            top: '-20px', // Start above the screen
                            fontSize: '24px',
                            animationDelay: `${i * 1.5}s`, // Increased delay between notes from 0.5s to 1.5s
                        }}
                    />
                )
            })}
        </div>
    )
}

