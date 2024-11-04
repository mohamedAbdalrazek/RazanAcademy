import Image from "next/image";
import React from "react";
import styles from "@/styles/blog/RecentPost.module.css";
import { Link } from "@/i18n/routing";
import Date from "../global/Date";
import { useTranslations } from "next-intl";
export default function RecentPost() {
    const t = useTranslations("Blog")
    const title = t(`recentPost.title`)
    const src = t(`recentPost.src`)
    const description = t(`recentPost.description`)
    const date = t(`recentPost.date`)
    const url = title.split(" ").join("-")
    return (
        <Link href={`/blog/${url}`} className={styles.recentPost}>
            <Image
                className={styles.image}
                src={src}
                width={1000}
                height={1000}
                alt={title}
            />
            <div className={styles.infoWrapper}>
                <h3 className={styles.header}>
                    {title}
                </h3>
                <p className={styles.description}>
                    {description}
                </p>
                <Date date={date} />
            </div>
        </Link>
    );
}
