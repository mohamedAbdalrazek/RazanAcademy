import React from "react";
import styles from "../../styles/quran/VerseNumber.module.css"
export default function VerseNumber({number}:{number:string}) {
    console.log(number.length)
    return (
        <span className={`${styles.ayah} ${number.length == 1 ?styles.sm: number.length == 2 ?styles.md:styles.lg}`}>{number}</span>
    );
}
