import React from "react";
import styles from "@/styles/admin/post-list/PostListHeader.module.css";
export default function PostListHeader() {
    return (
        <div className={styles.postListHeader}>
            <span className={styles.postListTitle}>Title</span>
            <div className={styles.iconsHeaderWrapper}>
                <span>Edit</span>
                <span>Archive</span>
                <span>Delete</span>
            </div>
        </div>
    );
}
