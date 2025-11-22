import React from "react";
import styles from "@/styles/quran/Chapter.module.css";
import localFont from "next/font/local";
import ChapterLayout from "@/components/quran/ChapterLayout"; 

const hafsFont = localFont({ src: "../../../../fonts/Hafs.ttf" });


export default function Chapter({
    params: { id },
}: {
    params: { id: string };
}) {
    return (
        <div className={`${hafsFont.className} ${styles.chapter}`}>
            <ChapterLayout id={id} />
        </div>
    );
}
