import React from "react";
import styles from "@/styles/utils/Skeleton.module.css";

export default function PostListSkeleton({
    numberOfPosts,
}: {
    numberOfPosts: number;
}) {
    return (
        <div>
            {Array.from({ length: numberOfPosts }, (_, index: number) => (
                <div className={styles.skeletonCard} key={index}>
                    <div className={styles.skeletonInfo}>
                        <div className={styles.skeletonLine} />
                    </div>
                    <div className={styles.skeletonSmallIcon} />
                    <div className={styles.skeletonSmallIcon} />
                    <div className={styles.skeletonSmallIcon} />
                </div>
            ))}
        </div>
    );
}
