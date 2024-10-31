import React from "react";
import styles from "@/styles/components/SubHeading.module.css";
export default function SubHeading({text}:{text:string}) {
    return (
        <div className={styles.subHeader}>
            <h3>
                {text}
            </h3>
        </div>
    );
}
