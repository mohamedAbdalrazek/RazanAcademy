import React from "react";
import styles from "@/styles/about-us/TeacherCard.module.css";
import Image from "next/image";
import profilePicture from "../../../public/icons/hijabIcon.png";
import { useTranslations } from "next-intl";
type Teacher = {
    name: string;
    description: string;
    qualifications: string;
};
export default function TeacherCard({
    name,
    description,
    qualifications,
}: Teacher) {
    const t = useTranslations("AboutUs");
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    width={80}
                    height={80}
                    src={profilePicture}
                    placeholder="blur"
                    alt="Razan Academy Teacher Profile Picture"
                    className={styles.profilePicture}
                />
            </div>
            <div>
                <h4 className={styles.teacherName}>{name}</h4>
                <p className={styles.teacherDescription}>{description}</p>
                <div className={styles.teacherQualifications}>
                    <strong>{t("teachers.qualifications")}</strong>
                    <span>{qualifications}</span>
                </div>
            </div>
        </div>
    );
}
