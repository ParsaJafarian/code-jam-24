import React, { useRef, useEffect, useState } from "react";
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";

interface PianoRollProps {
  midiData: ArrayBuffer; // MIDI file as an ArrayBuffer
}

const PianoRoll: React.FC<PianoRollProps> = ({ midiData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);
  const [midi, setMidi] = useState<Midi | null>(null);

  useEffect(() => {
    const parseMidi = async () => {
      const midiInstance = new Midi(midiData);
      setMidi(midiInstance);
    };

    parseMidi();
  }, [midiData]);

  useEffect(() => {
    if (!midi || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const keys = 88; // Number of piano keys (A0 to C8)
    const whiteKeyWidth = canvas.width / keys;
    const noteHeight = 10; // Height of each note rectangle
    const scrollSpeed = 1; // Speed of falling notes (pixels per frame)

    let animationFrame: number | null = null;
    let startTime = Tone.now();

    // Map MIDI note numbers to key indices
    const noteToKeyIndex = (note: number) => note - 21;

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = time / 1000 - startTime;
      midi.tracks.forEach((track: any) => {
        track.notes.forEach((note: any) => {
          const noteStart = note.time;
          const noteEnd = noteStart + note.duration;
          const noteKeyIndex = noteToKeyIndex(note.midi);

          if (elapsed > noteStart && elapsed < noteEnd) {
            const x = noteKeyIndex * whiteKeyWidth;
            const y = canvas.height - (elapsed - noteStart) * scrollSpeed;

            ctx.fillStyle = "blue";
            ctx.fillRect(
              x,
              y,
              whiteKeyWidth, // Note width (corresponds to key width)
              noteHeight
            );
          }
        });
      });

      animationFrame = requestAnimationFrame(drawFrame);
    };

    const startAnimation = () => {
      startTime = Tone.now();
      drawFrame(0);
    };

    const stopAnimation = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };

    return () => stopAnimation();
  }, [midi]);

  const handlePlay = async () => {
    if (!midi) return;

    await Tone.start();
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    midi.tracks.forEach((track: any) => {
      track.notes.forEach((note: any) => {
        synth.triggerAttackRelease(
          note.name,
          note.duration,
          Tone.now() + note.time
        );
      });
    });

    setPlaying(true);
  };

  const handleStop = () => {
    Tone.Transport.stop();
    setPlaying(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800} // Adjust canvas size as needed
        height={400}
        style={{ border: "1px solid black", marginBottom: "10px" }}
      />
      <div>
        <button onClick={playing ? handleStop : handlePlay}>
          {playing ? "Stop" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default PianoRoll;
