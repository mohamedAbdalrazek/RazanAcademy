import React from "react";
import styles from "@/styles/components/Headig.module.css";
export default function Heading({ text }: { text: string }) {
    return (
        <div className={styles.header}>
            <h1>{text}</h1>
        </div>
    );
}
