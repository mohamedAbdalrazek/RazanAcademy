import React from "react";
import ChapterCard from "./ChapterCard";
import styles from "../../styles/quran/ChapterList.module.css"
type Chapter = {
    id: number;
    revelation_place: string;
    name_english: string;
    name_arabic: string;
};

export default function ChapterList({ chapters }: { chapters: Chapter[] }) {
    return (
        <div className={styles.chaptersList}>
            {chapters.map((chapter) => (
                <ChapterCard chapter={chapter} key={chapter.id} />
            ))}
        </div>
    );
}
