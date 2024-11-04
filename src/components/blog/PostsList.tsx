import React from "react";
import PostCard from "./PostCard";
import styles from "@/styles/blog/PostList.module.css";
import { useTranslations } from "next-intl";

export default function PostsList() {
    const t = useTranslations("Blog");
    const postsKeys = ["first", "second", "third"];
    return (
        <div className={styles.postsList}>
            {postsKeys.map((key) => {
                return (
                    <PostCard
                        src={t(`posts.${key}.src`)}
                        title={t(`posts.${key}.title`)}
                        description={t(`posts.${key}.description`)}
                        date={t(`posts.${key}.date`)}
                        key={t(`posts.${key}.title`)}
                    />
                );
            })}
        </div>
    );
}
