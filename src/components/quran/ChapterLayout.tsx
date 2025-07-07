"use client";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Skeleton from "../global/Skeleton";
import AudioPlayer from "../global/AudioPlayer";
import VersesNumbersList from "./VersesNumbersList";
import VersesList from "./VersesList";
import styles from "@/styles/quran/ChapterLayout.module.css";
import Heading from "../global/Heading";
type Verse = {
    id: string;
    arabic_verse: string;
    english_verse: string;
    audio: string;
};
type ChapterInfo = {
    name_arabic: string;
    name_english: string;
    bismillah_pre: boolean;
    revelation_place: string;
};
type Chapter = {
    fullAudio: string;
    verses: Verse[];
    chapterInfo: ChapterInfo;
};
export default function ChapterLayout({ id }: { id: string }) {
    const [chapter, setChapter] = useState<Chapter>();
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMessage] = useState("");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playingSrc, setPlayingSrc] = useState<string | null>(null);

    const handlePlayAudio = (
        src: string,
        ref: MutableRefObject<HTMLAudioElement | null> | null
    ) => {
        // Pause the current audio if playing something else
        if (audioRef.current && playingSrc !== src) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        // If clicking the same audio, toggle it
        if (playingSrc === src && audioRef.current) {
            if (!ref?.current) {
                audioRef.current.pause();
                setPlayingSrc(null);
            }
            return;
        }

        // Create and play a new Audio instance
        const audio = new Audio(src);
        audioRef.current = ref ? ref.current : audio;
        setPlayingSrc(src);
        if (!ref?.current) audio.play();

        // Reset playingSrc when audio ends
        audio.onended = () => setPlayingSrc(null);
    };
    useEffect(() => {
        fetch(`/api/chapters/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.verses && data.verses.length && data.fullAudio) {
                    setChapter(data);
                } else {
                    setErrorMessage(
                        "Something went wrong please refresh the page"
                    );
                }
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage("Something went wrong please refresh the page");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);
    const header = `${chapter?.chapterInfo.name_english} / سورة ${chapter?.chapterInfo.name_arabic}`;
    return loading ? (
        <Skeleton />
    ) : chapter && chapter.verses.length && chapter.fullAudio ? (
        <div>
            <div className={styles.chapterInfo}>
                <Heading text={header} />
                {/* <div className={styles.chapterNames}>
                    <h1>{chapter.chapterInfo.name_english}</h1>
                    <h1>سورة {chapter.chapterInfo.name_arabic} </h1>
                </div> */}
                <AudioPlayer
                    className={styles.audioPlayer}
                    handlePlayAudio={handlePlayAudio}
                    src={chapter.fullAudio}
                />
            </div>
            <div className="separationLine" />
            <div className={styles.chapterVerses}>
                <VersesNumbersList numberOfVerses={chapter.verses.length} />
                <VersesList
                    verses={chapter.verses}
                    bismallah={chapter.chapterInfo.bismillah_pre}
                    playingSrc={playingSrc}
                    handlePlayAudio={handlePlayAudio}
                />
            </div>
            <div className="separationLine" />
        </div>
    ) : (
        errorMsg
    );
}
