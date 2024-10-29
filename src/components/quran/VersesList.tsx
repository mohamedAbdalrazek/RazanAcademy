import React, { useRef, useState } from "react";
import Verse from "./Verse";
import styles from "../../styles/quran/VersesList.module.css";
import Image from "next/image";
import bismallahImage from "../../../public/png/bismallah.png";

type Verse = {
    id: string;
    arabic_verse: string;
    english_verse: string;
    audio: string;
};

export default function VersesList({
    verses,
    bismallah
}: {
    verses: Verse[];
    bismallah: boolean;
}) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playingSrc, setPlayingSrc] = useState<string | null>(null);

    const handlePlayAudio = (src: string) => {
        // Pause the current audio if playing something else
        if (audioRef.current && playingSrc !== src) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        // If clicking the same audio, toggle it
        if (playingSrc === src && audioRef.current) {
            audioRef.current.pause();
            setPlayingSrc(null);
            return;
        }

        // Create and play a new Audio instance
        const audio = new Audio(src);
        audioRef.current = audio;
        setPlayingSrc(src);
        audio.play();

        // Reset playingSrc when audio ends
        audio.onended = () => setPlayingSrc(null);
    };
    const versesListElement = verses.map((verse) => {
        const id = Number(verse.id) + 1;
        return (
            <Verse
                key={id}
                id={id}
                arabic_verse={verse.arabic_verse}
                english_verse={verse.english_verse}
                audio={verse.audio}
                handleClick={handlePlayAudio}
                isplaying={playingSrc === verse.audio}
            />
        );
    });
    return (
        <div className={`${styles.versesList}`}>
            {bismallah && (
                <Image
                    className={styles.bismallah}
                    width={400}
                    height={100}
                    src={bismallahImage}
                    alt="Razan Academy"
                    placeholder="blur"
                />
            )}
            {versesListElement}
        </div>
    );
}
