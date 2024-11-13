import React from "react";

import styles from "@/styles/admin/post-list/PostCard.module.css";
import Link from "next/link";
import EditIcon from "@/components/icons/EditIcon";
import AdminLoading from "../global/AdminLoading";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function PostCardLayout({
    title,
    id,
    children,
    loading,
}: {
    children: React.ReactNode;
    id: string;
    title: string;
    loading: boolean;
}) {
    return (
        <div className={styles.postCard}>
            <h2 className={styles.postTitle}>{title}</h2>
            <div className={styles.iconsList}>
                <Link href={`/admin/edit/${id}`} className={styles.iconWrapper}>
                    <EditIcon className={styles.editIcon} />
                </Link>
                {children}
            </div>
            {loading && <AdminLoading />}
            <ToastContainer />
        </div>
    );
}
