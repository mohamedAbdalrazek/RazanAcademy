"use client";
import ArchiveIcon from "@/components/icons/ArchiveIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import React, { Dispatch, useState } from "react";
import styles from "@/styles/admin/post-list/PostCard.module.css";

import { GetPostResponse, RetrievedPost } from "@/types/admin.types";
import { deletePost, movePost } from "@/lib/admin/adminPostListUtils";
import { errorPopup } from "@/lib/admin/adminUtils";

import PostCardLayout from "../layouts/PostCardLayout";
import Link from "next/link";
import EditIcon from "@/components/icons/EditIcon";

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
        if (!confirm(`Are you sure you want to delete this post ?`)) return;
        setLoading(true);

        const result = await deletePost(setData, id, "posts");
        if (!result.ok) {
            console.error(result.message);
            errorPopup("Somthing went wrong try again later");
            setLoading(false);
            return;
        }
        setLoading(false);
    };

    const handleArchive = async () => {
        if (!confirm(`Are you sure you want to archive this post ?`)) return;
        setLoading(true);

        const archiveResult = await movePost(post, "archivedPosts");

        if (!archiveResult.ok) {
            console.error(archiveResult.message);
            errorPopup("Somthing went wrong try again later");
            setLoading(false);
            return;
        }

        const deleteResult = await deletePost(setData, id, "posts");

        if (!deleteResult.ok) {
            console.error(deleteResult.message);
            errorPopup("Somthing went wrong try again later");
            setLoading(false);
            return;
        }
        setLoading(false);
    };

    return (
        <PostCardLayout title={title} id={id} loading={loading}>
            <Link href={`/admin/posts/${id}`} className={styles.iconWrapper}>
                <EditIcon className={styles.editIcon} />
            </Link>
            <div className={styles.iconWrapper} onClick={handleArchive}>
                <ArchiveIcon className={styles.archiveIcon} />
            </div>
            <div className={styles.iconWrapper} onClick={handleDeletePost}>
                <DeleteIcon className={styles.deleteIcon} />
            </div>
        </PostCardLayout>
    );
}
