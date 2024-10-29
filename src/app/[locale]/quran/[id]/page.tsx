"use client";
import VersesList from "@/components/quran/VersesList";
import VersesNumbersList from "@/components/quran/VersesNumbersList";
import Skeleton from "@/components/global/Skeleton";
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/quran/Chapter.module.css";
import localFont from "next/font/local";
import AudioPlayer from "@/components/global/AudioPlayer";
const hafsFont = localFont({ src: "../../../../fonts/Hafs.ttf" });

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
export default function Chapter({
    params: { id },
}: {
    params: { id: string; locale: string };
}) {
    const [chapter, setChapter] = useState<Chapter>();
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMessage] = useState("");
    useEffect(() => {
        try {
            fetch(`http://localhost:3000/api/chapters/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.verses && data.verses.length && data.fullAudio) {
                        setChapter(data);
                    } else {
                        setErrorMessage(
                            "Something went wrong please refresh the page"
                        );
                    }
                })
                .catch((error) => {
                    console.log(error, "from inside");
                    setErrorMessage(
                        "Something went wrong please refresh the page"
                    );
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
            setErrorMessage("Something went wrong please refresh the page");
            console.log(error);
        }
    }, [id]);

    console.log(chapter?.chapterInfo);
    return (
        <div className={`${hafsFont.className} ${styles.chapter}`}>
            {loading ? (
                <Skeleton />
            ) : chapter && chapter.verses.length && chapter.fullAudio ? (
                <div>
                    <div className={styles.chapterInfo}>
                        <div className={styles.chapterNames}>

                            <h1>{chapter.chapterInfo.name_english}</h1>
                            <h1>سورة {chapter.chapterInfo.name_arabic} </h1>
                        </div>
                        <AudioPlayer src={chapter.fullAudio} />
                    </div>
                    <div className={styles.chapterVerses}>
                        <VersesNumbersList
                            numberOfVerses={chapter.verses.length}
                        />
                        <VersesList verses={chapter.verses} bismallah={chapter.chapterInfo.bismillah_pre} />
                    </div>
                </div>
            ) : (
                errorMsg
            )}
        </div>
    );
}
