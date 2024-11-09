import React from "react";

import styles from "@/styles/admin/components/AdminHeader.module.css"

export default function AdminHeader({ text }: { text: string }) {
    return <h1 className={styles.adminHeader}>{text}</h1>;
}
