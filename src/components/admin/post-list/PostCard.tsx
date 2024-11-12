"use client";
import ArchiveIcon from "@/components/icons/ArchiveIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import React, { Dispatch, useState } from "react";
import styles from "@/styles/admin/post-list/PostCard.module.css";
import Link from "next/link";
import AdminLoading from "../global/AdminLoading";

import { GetPostResponse, RetrievedPost } from "@/types/admin.types";
import { archivePost, deletePost } from "@/lib/admin/adminPostListUtils";

export default function PostCard({
    post,

    setData,
}: {
    post: RetrievedPost;

    setData: Dispatch<React.SetStateAction<GetPostResponse | null>>;
}) {
    const { title, id } = post;
    const [loading, setLoading] = useState(false);
    const handleDeletePost = async () => {
        if (!confirm(`are you sure you want to delete this post ?`)) return;
        setLoading(true);
        const result = await deletePost(setData, id);
        if (!result.ok) {
            console.error(result.message);
            setLoading(false);
            return;
        }
        setLoading(false);
    };
    const handleArchive = async () => {
        if (!confirm(`are you sure you want to archive this post ?`)) return;
        setLoading(true);
        const archiveResult = await archivePost(post);
        if (!archiveResult.ok) {
            console.error(archiveResult.message);
            setLoading(false);
            return;
        }
        setLoading(true);
        const deleteResult = await deletePost(setData, id);
        if (!deleteResult.ok) {
            console.error(deleteResult.message);
            setLoading(false);
            return;
        }
        setLoading(false);
    };

    return (
        <div className={styles.postCard}>
            <h2 className={styles.postTitle}>{title}</h2>
            <div className={styles.iconsList}>
                <Link href={`/admin/edit/${id}`} className={styles.iconWrapper}>
                    <EditIcon className={styles.editIcon} />
                </Link>
                <div className={styles.iconWrapper} onClick={handleArchive}>
                    <ArchiveIcon className={styles.archiveIcon} />
                </div>
                <div className={styles.iconWrapper} onClick={handleDeletePost}>
                    <DeleteIcon className={styles.deleteIcon} />
                </div>
            </div>
            {loading && <AdminLoading />}
        </div>
    );
}
