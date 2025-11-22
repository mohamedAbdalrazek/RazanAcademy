import RecentPost from "@/components/blog/RecentPost";
import Heading from "@/components/global/Heading";
import SubHeading from "@/components/global/SubHeading";
import React from "react";
import styles from "@/styles/blog/Blog.module.css"
import PostsList from "@/components/blog/PostsList";
import { useTranslations } from "next-intl";

export default function Blog(){
    const t= useTranslations("Blog")
    return (
        <div className={styles.blog}>
            <Heading text={t("header")} />
            <SubHeading text={t(`recent`)} />
            <RecentPost />
            <SubHeading text={t(`discover`)} />
            <PostsList />
        </div>
    );
}
