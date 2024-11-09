import React from "react";
import styles from "@/styles/admin/components/AdminLoading.module.css";
export default function AdminLoading() {
    return (
        <div className={styles.loaderWrapper}>
            <span className={styles.loader}></span>
        </div>
    );
}
