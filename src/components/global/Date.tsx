import React from "react";
import styles from "@/styles/components/Date.module.css"
import DateIcon from "../icons/DateIcon";
export default function Date({date, className}:{date:string, className?:string}) {
    return (
        <div className={`${styles.dateWrapper} ${className}`}>
            <div className={styles.iconWrapper}>
                <DateIcon className={styles.icon} />
            </div>
            <span className={styles.date}>{date}</span>
        </div>
    );
}
