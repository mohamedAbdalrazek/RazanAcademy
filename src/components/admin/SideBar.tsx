"use client";
import React from "react";
import styles from "@/styles/admin/SideBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Url = {
    url: string;
    text: string;
};
export default function SideBar() {
    const pathName = usePathname();
    const blogLinks: Url[] = [
        { url: "", text: "Posts" },
        { url: "add", text: "Add Post" },
    ];
    const blogElements = blogLinks.map((link) => {
        const currentUrl = pathName.split("/")[2] ? pathName.split("/")[2] : "";
        const isActive = currentUrl === link.url;
        return (
            <Link
                href={`/admin/${link.url}`}
                className={`${styles.link} ${isActive && "active"}`}
                key={link.url}
            >
                {link.text}
            </Link>
        );
    });
    return (
        <div className={styles.sideBar}>
            <h1 className={styles.mainHeader}>Blog</h1>
            <div className={styles.linkList}>{blogElements}</div>
        </div>
    );
}
