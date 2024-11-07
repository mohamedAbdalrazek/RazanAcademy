import TinyEditor from "@/components/admin/TinyEditor";
import React from "react";
import styles from "@/styles/admin/blog/AddPost.module.css"
export default function Add() {
    
    return (
        <div className={styles.addPage}>
            <TinyEditor className={styles.editor} />
        </div>
    );
}
