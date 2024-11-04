import Image from "next/image";
import React from "react";
import styles from "@/styles/blog/RecentPost.module.css";
import { Link } from "@/i18n/routing";
import Date from "../global/Date";
export default function RecentPost() {
                    
    const title = "The Importance of Tajweed in Quranic Recitation"
    const url = title.split(" ").join("-")
    return (
        <Link href={`/blog/${url}`} className={styles.recentPost}>
            <Image
                className={styles.image}
                src={"/images/mockBackground-one-1.jpg"}
                width={1000}
                height={1000}
                alt="The Importance of Tajweed in Quranic Recitation"
            />
            <div className={styles.infoWrapper}>
                <h3 className={styles.header}>
                    {title}
                </h3>
                <p className={styles.description}>
                    Discove r why mastering Tajweed is essential for accurate
                    and beautiful Quranic recitation. Learn how proper
                    pronunciation enhances both the spiritual and linguistic
                    experience of reading the Holy Quran.
                </p>
                <Date date="Jun 25, 2023" />
            </div>
        </Link>
    );
}
