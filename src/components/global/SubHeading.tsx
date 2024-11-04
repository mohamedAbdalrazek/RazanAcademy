import React from "react";
import styles from "@/styles/components/SubHeading.module.css";
export default function SubHeading({text}:{text:string}) {
    return (
        <div className={styles.subHeader}>
            <h2>
                {text}
            </h2>
        </div>
    );
}
