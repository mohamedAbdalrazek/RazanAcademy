import CoursesList from "@/components/courses/CoursesList";
import React from "react";
import styles from "@/styles/courses/Courses.module.css"
import Heading from "@/components/global/Heading";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
 type Props = {
    params: { locale: string };
};

export async function generateMetadata({
    params: { locale },
}: Omit<Props, "children">) {
    const t = await getTranslations({ locale, namespace: "metaData" });

    return {
        title: t("CoursesPage.title"),
        description: t("CoursesPage.description"),
    };
}
export default function Courses() {
    const t = useTranslations("Courses")
    return (
        <div className={styles.courses}>
            <Heading text={t("header")} />
            <CoursesList />
        </div>
    );
}
