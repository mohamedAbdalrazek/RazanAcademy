import React, { MutableRefObject } from "react";
import DOMPurify from "dompurify";
import VerseNumber from "../icons/VerseNumber";
import styles from "@/styles/quran/Verse.module.css";
import PauseButton from "../icons/PauseButton";
import PlayButton from "../icons/PlayButton";
type Verse = {
    id: number;
    arabic_verse: string;
    english_verse: string;
    audio: string;

    handlePlayAudio: (arg0: string, ref:MutableRefObject<HTMLAudioElement | null>|null) => void;
    isplaying: boolean;
};
export default function Verse({
    id,
    arabic_verse,
    english_verse,
    audio,
    handlePlayAudio,
    isplaying,
}: Verse) {
    const safeHtml = DOMPurify.sanitize(english_verse);

    return (
        <div className={styles.verse} id={id.toString()}>
            <div
                className={styles.audioWrapper}
                onClick={() => handlePlayAudio(audio, null)}
            >
                <div className={styles.buttonWrapper}>

                    {isplaying ? (
                        <PauseButton className={styles.button} />
                    ) : (
                        <PlayButton className={styles.button} />
                    )}
                </div>
                <div className={styles.arabic} dir="rtl">
                    <span className={styles.arabicText}>{arabic_verse}</span>
                    <VerseNumber number={id} />
                </div>
            </div>
            <p
                dangerouslySetInnerHTML={{ __html: safeHtml }}
                className={styles.englishText}
            />
        </div>
    );
}
