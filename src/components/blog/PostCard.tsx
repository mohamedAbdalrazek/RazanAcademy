import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";
import styles from "@/styles/blog/PostCard.module.css";
import Date from "../global/Date";
type Post = {
    src: string;
    title: string;
    description: string;
    date: string;
};
export default function PostCard({src, title, description, date}:Post) {
    const url = title.split(" ").join("-");
    return (
        <Link href={`/blog/${url}`} className={styles.postCard}>
            <div className={styles.imageWrapper}>
                <Image
                    className={styles.image}
                    src={src}
                    width={400}
                    height={400}
                    alt=""
                />
            </div>
            <div className={styles.infoWrapper}>
                <h3 className={styles.header}>{title}</h3>
                <p className={styles.description}>
                    {description}
                </p>
                <Date date={date} className={styles.icon} />
            </div>
        </Link>
    );
}
