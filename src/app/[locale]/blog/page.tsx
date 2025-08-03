import RecentPost from "@/components/blog/RecentPost";
import Heading from "@/components/global/Heading";
import SubHeading from "@/components/global/SubHeading";
import React from "react";
import styles from "@/styles/blog/Blog.module.css"
import PostsList from "@/components/blog/PostsList";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
type Props = {
    params: { locale: string };
};

export async function generateMetadata({
    params: { locale },
}: Omit<Props, "children">) {
    const t = await getTranslations({ locale, namespace: "metaData" });

    return {
        title: t("BlogPage.title"),
        description: t("BlogPage.description"),
    };
}
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
