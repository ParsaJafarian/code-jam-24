import pretty_midi
from collections import defaultdict


def simplify_simultaneous_notes(notes, max_simultaneous_notes=3):
    """
    Simplifies groups of simultaneous notes by keeping only the most important ones.
    Prioritizes notes that are farther apart in pitch to maintain musical range.
    """
    if not notes:
        return []

    # Group notes by their start times
    time_groups = defaultdict(list)
    for note in notes:
        # Quantize start time to group simultaneous notes
        quantized_time = round(note.start * 4) / 4
        time_groups[quantized_time].append(note)

    simplified_notes = []

    for start_time in sorted(time_groups.keys()):
        current_notes = time_groups[start_time]

        if len(current_notes) <= max_simultaneous_notes:
            simplified_notes.extend(current_notes)
        else:
            # Sort notes by pitch
            current_notes.sort(key=lambda x: x.pitch)

            # Keep outer notes (highest and lowest) and one middle note if available
            notes_to_keep = [
                current_notes[0],  # lowest note
                current_notes[-1],  # highest note
            ]

            # Add a middle note if we want 3 notes
            if max_simultaneous_notes > 2 and len(current_notes) > 2:
                middle_idx = len(current_notes) // 2
                notes_to_keep.insert(1, current_notes[middle_idx])

            simplified_notes.extend(notes_to_keep[:max_simultaneous_notes])

    return simplified_notes


def clean_midi(
    input_midi_path,
    output_midi_path,
    quantization_factor=4,
    velocity_threshold=20,
    max_simultaneous_notes=3,
):
    """
    Simplifies a MIDI file by:
    - Removing low velocity notes
    - Limiting simultaneous notes
    - Quantizing note timings
    """
    # Load the MIDI file
    midi_data = pretty_midi.PrettyMIDI(input_midi_path)

    # Calculate minimum note duration based on tempo
    min_note_duration = 50 / midi_data.estimate_tempo()

    # Create new MIDI data with the same tempo
    new_midi = pretty_midi.PrettyMIDI(initial_tempo=midi_data.estimate_tempo())

    # Create a single instrument
    instrument = pretty_midi.Instrument(program=0, name="Piano")

    # Collect all notes from all instruments
    all_notes = []
    for orig_instrument in midi_data.instruments:
        # Filter out low velocity notes
        valid_notes = [
            note
            for note in orig_instrument.notes
            if note.velocity >= velocity_threshold
        ]
        all_notes.extend(valid_notes)

    # Quantize note timings
    for note in all_notes:
        note.start = round(note.start * quantization_factor) / quantization_factor
        note.end = round(note.end * quantization_factor) / quantization_factor
        if note.end - note.start < min_note_duration:
            note.end = note.start + min_note_duration

    # Simplify simultaneous notes
    simplified_notes = simplify_simultaneous_notes(
        all_notes, max_simultaneous_notes=max_simultaneous_notes
    )

    # Set the notes for the instrument
    instrument.notes = simplified_notes

    # Add the instrument to the new MIDI file
    new_midi.instruments.append(instrument)

    # Write the MIDI file
    new_midi.write(output_midi_path)
    print(f"Simplified MIDI saved to: {output_midi_path}")
    return output_midi_path


if __name__ == "__main__":
    input_midi = "zelda_llulaby_mus.wav.midi"
    output_midi = "simplified_output.midi"

    clean_midi(
        input_midi,
        output_midi,
        quantization_factor=4,
        velocity_threshold=20,
        max_simultaneous_notes=3,  # Adjust this value to control complexity
    )
