import React from "react";
import styles from "@/styles/admin/post-list/PostListHeader.module.css";
export default function PostListHeader({headerTitles}: {headerTitles:string[]}) {
    return (
        <div className={styles.postListHeader}>
            <span className={styles.postListTitle}>Title</span>
            <div className={styles.iconsHeaderWrapper}>
                {headerTitles.map((title) => (
                    <span key={title}>{title}</span>
                ))}
            </div>
        </div>
    );
}
