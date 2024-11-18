import React from "react";

import styles from "@/styles/admin/post-list/PostCard.module.css";
import AdminLoading from "../global/AdminLoading";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function PostCardLayout({
    title,
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
                
                {children}
            </div>
            {loading && <AdminLoading />}
            <ToastContainer />
        </div>
    );
}
