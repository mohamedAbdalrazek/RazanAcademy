import React from "react";
import DOMPurify from "dompurify";
import VerseNumber from "../icons/VerseNumber";
import styles from "../../styles/quran/Verse.module.css"
export default function Verse() {
    const verse = {
        id: "6",
        arabic_verse:
            "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
        english_verse:
            "the Path of those You have blessed—not those You are displeased with, or those who are astray.<sup foot_note=76374>1</sup> ",
        audio: "https://verses.quran.com/AbdulBaset/Murattal/mp3/001007.mp3",
    };
    const safeHtml = DOMPurify.sanitize(verse.english_verse);

    return (
        <div className={styles.verse}>
            <div className={styles.arabic}>
                <VerseNumber number="76" />

                <p className={styles.arabicText}>{verse.arabic_verse}</p>
                <VerseNumber number="6" />
            </div>
            <p dangerouslySetInnerHTML={{ __html: safeHtml }} className={styles.englishText} />
        </div>
    );
}
