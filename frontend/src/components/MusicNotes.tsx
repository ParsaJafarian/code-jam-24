import { Music } from 'lucide-react'

export default function MusicNotes() {
    const numNotes = 24;
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(numNotes)].map((_, i) => {
                const horizontalOffset = Math.random() * 100;
                
                return (
                    <Music
                        key={i}
                        className="absolute text-black opacity-30 animate-rain"
                        style={{
                            left: `${horizontalOffset}%`,
                            top: '-20px',
                            fontSize: '24px',
                            animationDelay: `${i * 0.75}s`,
                        }}
                    />
                )
            })}
        </div>
    )
}

