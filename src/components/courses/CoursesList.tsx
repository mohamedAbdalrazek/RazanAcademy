import React from "react";
import CourseCard from "./CourseCard";
import styles from "@/styles/courses/CoursesList.module.css"
import quran from "../../../public/images/quran.jpg";
import { useTranslations } from "next-intl";

export default function CoursesList() {
    const t = useTranslations("Courses")
    const coursesKeys= [
        "noor",
        "tajweed",
        "quran"
    ] as const
    const coursesPictures = {
        "noor":quran,
        "tajweed":quran,
        "quran":quran
    }
    return (
        <div className={styles.coursesList}>
            {coursesKeys.map((key)=>{
                const name = t(`courses.${key}.name`)
                const description = t(`courses.${key}.description`)
                const imageSrc = coursesPictures[key]
                return(
                    <CourseCard name={name} description={description} imageSrc={imageSrc} key={name} />
                )
            })}
        </div>
    );
}
