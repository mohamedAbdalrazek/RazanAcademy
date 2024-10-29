import React from "react";
import styles from "@/styles/utils/Skeleton.module.css";
export default function Skeleton() {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonInfo}>
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLineShort} />
            </div>
            <div className={styles.skeletonIcon} />
            
        </div>
    );
}
