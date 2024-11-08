import React from "react";
import styles from "@/styles/admin/add/AddPost.module.css";
import AdminHeader from "@/components/admin/AdminHeader";
import AddForm from "@/components/admin/add/AddForm";
export default function Add() {
    // Handle thumbnail alt text change

    return (
        <div className={styles.addPage}>
            <AdminHeader text="Add Post" />
            <AddForm />
        </div>
    );
}
