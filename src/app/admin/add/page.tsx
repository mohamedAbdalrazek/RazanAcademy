import React from "react";

import AdminHeader from "@/components/admin/global/AdminHeader";
import AddFormLayout from "@/components/admin/layouts/AddFormLayout";

import styles from "@/styles/admin/add/AddPost.module.css";

export default function Add() {
    return (
        <div className={styles.addPage}>
            <AdminHeader text="Add Post" />
            <AddFormLayout />
        </div>
    );
}
