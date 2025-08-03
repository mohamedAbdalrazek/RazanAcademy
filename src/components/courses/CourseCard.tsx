import { Link } from "@/i18n/routing";
import Image, { StaticImageData } from "next/image";
import React from "react";
import styles from "@/styles/courses/CourseCard.module.css";
import { useTranslations } from "next-intl";
type CourseCard = {
    name: string;
    imageSrc: StaticImageData;
    description: string;
};
export default function CourseCard({
    name,
    imageSrc,
    description,
}: CourseCard) {
    const t = useTranslations("Courses");
    return (
        <Link href={"/pricing"} className={styles.courseCard}>
            <div className={styles.imageWrapper}>
                <Image
                    className={styles.image}
                    width={180}
                    placeholder="blur"
                    height={180}
                    src={imageSrc}
                    alt={`${name} Course`}
                />
            </div>
            <div className={styles.info}>
                <h3 className={styles.infoHeader}>{name}</h3>
                <p className={styles.infoBody}>{description}</p>
                <span className={styles.infoLink}>{t("startLearning")}</span>
            </div>
        </Link>
    );
}
