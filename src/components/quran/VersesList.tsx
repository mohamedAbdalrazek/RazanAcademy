import React, { MutableRefObject } from "react";
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
    bismallah,
    playingSrc,
    handlePlayAudio,
}: {
    verses: Verse[];
    bismallah: boolean;
    playingSrc: string | null;
    handlePlayAudio: (
        arg0: string,
        ref: MutableRefObject<HTMLAudioElement | null>|null
    ) => void;
}) {
    const versesListElement = verses.map((verse) => {
        const id = Number(verse.id) + 1;
        return (
            <Verse
                key={id}
                id={id}
                arabic_verse={verse.arabic_verse}
                english_verse={verse.english_verse}
                audio={verse.audio}
                handlePlayAudio={handlePlayAudio}
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
