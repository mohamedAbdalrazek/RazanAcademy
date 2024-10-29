import React from "react";
import styles from "../../styles/quran/VerseNumber.module.css"
export default function VerseNumber({number}:{number:number}) {
    const numberString = number.toString()

    return (
        <span className={`${styles.ayah} ${numberString.length == 1 ?styles.sm: numberString.length == 2 ?styles.md:styles.lg}`}>{number}</span>
    );
}
