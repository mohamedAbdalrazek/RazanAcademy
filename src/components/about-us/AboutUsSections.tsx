import React from "react";
import styles from "@/styles/about-us/AboutUsSections.module.css";
// import BookOpenIcon from "@/components/icons/BookOpenIcon"
import CertificateIcon from "@/components/icons/CertificateIcon";
// import ClockIcon from "@/components/icons/ClockIcon";
import LightBulbIcon from "@/components/icons/LightBulbIcon";
// import UsersIcon from "@/components/icons/UsersIcon";
import { useTranslations } from "next-intl";
export default function AboutUsSections() {
    const t = useTranslations("AboutUs");
    return (
        <div className={styles.services}>
            <div className={styles.section}>
                <div className={styles.icon}>
                    <LightBulbIcon />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.infoHeader}>
                        {t("distinctiveEducational.header")}
                    </h3>
                    <p className={styles.infoBody}>
                        {t("distinctiveEducational.body")}
                    </p>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.icon}>
                    <CertificateIcon />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.infoHeader}>
                        {t("certifiedTeachers.header")}
                    </h3>
                    <p className={styles.infoBody}>
                        {t("certifiedTeachers.body")}
                    </p>
                </div>
            </div>
            {/* <div className={styles.section}>
                <div className={styles.icon}>
                    <UsersIcon />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.infoHeader}>
                        {t("safeLearning.header")}
                    </h3>
                    <p className={styles.infoBody}>{t("safeLearning.body")}</p>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.icon}>
                    <BookOpenIcon />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.infoHeader}>
                        {t("diversePrograms.header")}
                    </h3>
                    <p className={styles.infoBody}>
                        {t("diversePrograms.body")}
                    </p>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.icon}>
                    <ClockIcon />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.infoHeader}>
                        {t("flexibleLearning.header")}
                    </h3>
                    <p className={styles.infoBody}>
                        {t("flexibleLearning.body")}
                    </p>
                </div>
            </div> */}
        </div>
    );
}
