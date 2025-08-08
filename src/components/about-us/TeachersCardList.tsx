import React from "react";
import TeacherCard from "./TeacherCard";
import styles from "@/styles/about-us/TeachersCardList.module.css";
import { useTranslations } from "next-intl";


export default function TeachersCardList() {
    const t = useTranslations("AboutUs.teachers");
    const teachersKey = ["hager", "khadija", "salwa"];
    return (
        <div className={styles.teachersCardList}>
            {teachersKey.map((teacherKey) => {
                const name = t(`${teacherKey}.name`);
                const description = t(`${teacherKey}.description`);
                const qualifications = t(`${teacherKey}.qualifications`);
                return (
                    <TeacherCard
                        key={name}
                        name={name}
                        description={description}
                        qualifications={qualifications}
                    />
                );
            })}
        </div>
    );
}
