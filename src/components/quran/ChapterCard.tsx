import React from "react";
import styles from "../../styles/quran/ChapterCard.module.css";
import { Link } from "@/i18n/routing";
type Chapter = {
    id: number;
    revelation_place: string;
    name_english: string;
    name_arabic: string;
};
export default function ChapterCard({chapter}: {chapter:Chapter}) {
    const { id, name_arabic, name_english, revelation_place } = chapter;
    const url = id.toString();

    return (
        <Link href={`/quran/${url}`} className={styles.chapterCard}>
            <div className={styles.chapterInfo}>
                <span className={styles.arabicName}>{name_arabic}</span>
                <span className={styles.englishName}>{name_english}</span>
                <span className={styles.chapterPlace}>{revelation_place}</span>
            </div>
            <div className={styles.chapterNumberWrapper}>
                <span className={styles.chapterNumber}>{id}</span>
            </div>
        </Link>
    );
}
