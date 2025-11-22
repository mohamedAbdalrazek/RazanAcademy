import CoursesList from "@/components/courses/CoursesList";
import React from "react";
import styles from "@/styles/courses/Courses.module.css"
import Heading from "@/components/global/Heading";
import { useTranslations } from "next-intl";

export default function Courses() {
    const t = useTranslations("Courses")
    return (
        <div className={styles.courses}>
            <Heading text={t("header")} />
            <CoursesList />
        </div>
    );
}
