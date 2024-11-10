import ArchiveIcon from "@/components/icons/ArchiveIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import React from "react";
import styles from "@/styles/admin/post-list/PostCard.module.css";
import Link from "next/link";
export default function PostCard({ title, id }: { title: string; id: string }) {
    return (
        <div className={styles.postCard}>
            <h2 className={styles.postTitle}>{title}</h2>
            <div className={styles.iconsList}>
                <Link href={`/admin/edit/${id}`} className={styles.iconWrapper}>
                    <EditIcon className={styles.editIcon} />
                </Link>
                <div className={styles.iconWrapper}>
                    <ArchiveIcon className={styles.archiveIcon} />
                </div>
                <div className={styles.iconWrapper}>
                    <DeleteIcon className={styles.deleteIcon} />
                </div>
            </div>
        </div>
    );
}
