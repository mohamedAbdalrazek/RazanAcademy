"use client"
import ArchiveIcon from "@/components/icons/ArchiveIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import React, { Dispatch, useState } from "react";
import styles from "@/styles/admin/post-list/PostCard.module.css";
import Link from "next/link";
import AdminLoading from "../global/AdminLoading";

import { GetPostResponse } from "@/types/admin.types";

export default function PostCard({
    title,
    id,
    setData,
}: {
    title: string;
    id: string;
    setData: Dispatch<React.SetStateAction<GetPostResponse | null>>;
}) {
    const [loading, setLoading] = useState(false);
    const handleDeletePost = async () => {
        if (!confirm(`are you sure you want to delete this post ?`)) return;
        setLoading(true);
        const result = await fetch(`/api/admin/deletePost?postId=${id}`);
        const data = (await result.json()) as { ok: boolean; message: string };
        if (!data.ok) {
            console.log(data.message);
            setLoading(false);
            return;
        }
        setData((prevData) => {
            if (!prevData) return null;
            const filteredPosts = prevData.posts.filter(
                (post) => post.id !== id
            );
            return {
                ...prevData,
                count: prevData.count && prevData.count - 1,
                posts: filteredPosts,
            };
        });
        setLoading(false);
    };
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
                <div className={styles.iconWrapper} onClick={handleDeletePost}>
                    <DeleteIcon className={styles.deleteIcon} />
                </div>
            </div>
            {loading && <AdminLoading />}
        </div>
    );
}
