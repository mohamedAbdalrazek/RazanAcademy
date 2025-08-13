"use client";

import TelegramIcon from "@/components/icons/TelegramIcon";
import styles from "./ConfirmPage.module.css";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type FormValues = {
    name: string;
    age: number;
    phone: string;
    email: string;
    country: string;
    privateOrGroup: "private" | "group";
    lessonsPerWeek: "one" | "two" | "three" | "five";
    teachingLanguage: "english" | "arabic" | "uzbek";
    motherTongue?: string;
    howDidYouKnowUs?: "facebook" | "instagram" | "friend" | "family" | "other";
    otherSource?: string;
};

export default function ReviewPage() {
    const router = useRouter();
    const t = useTranslations();
    const [formData, setFormData] = useState<FormValues | null>(null);

    // ✅ Load saved data in client-side effect
    useEffect(() => {
        const savedForm = localStorage.getItem("enrollFormData");
        if (savedForm) {
            setFormData(JSON.parse(savedForm) as FormValues);
        }
    }, []);

    if (!formData) {
        return null; // or show a loading state
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t("ReviewPage.title")}</h1>
            <p className={styles.subtitle}>{t("ReviewPage.subtitle")}</p>

            {/* Personal Information */}
            <div className={styles.reviewSection}>
                <h2 className={styles.sectionTitle}>
                    {t("ReviewPage.personalInfo")}
                </h2>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <span className={styles.label}>
                            {t("ReviewPage.fullName")}
                        </span>
                        <span className={styles.value}>{formData.name}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>
                            {t("ReviewPage.age")}
                        </span>
                        <span className={styles.value}>{formData.age}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>
                            {t("ReviewPage.phone")}
                        </span>
                        <span className={styles.value}>{formData.phone}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>
                            {t("ReviewPage.email")}
                        </span>
                        <span className={styles.value}>{formData.email}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>
                            {t("ReviewPage.country")}
                        </span>
                        <span className={styles.value}>{formData.country}</span>
                    </div>
                    {formData.motherTongue && (
                        <div className={styles.field}>
                            <span className={styles.label}>
                                {t("ReviewPage.motherTongue")}
                            </span>
                            <span className={styles.value}>
                                {formData.motherTongue}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Lesson Preferences */}
            <div className={styles.reviewSection}>
                <h2 className={styles.sectionTitle}>
                    {t("ReviewPage.lessonPreferences")}
                </h2>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <span className={styles.label}>
                            {t("ReviewPage.lessonType")}
                        </span>
                        <span className={styles.value}>
                            {t(`EnrollForm.${formData.privateOrGroup}`)}
                        </span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>
                            {t("ReviewPage.lessonsPerWeek")}
                        </span>
                        <span className={styles.value}>
                            {t(`EnrollForm.lessons.${formData.lessonsPerWeek}`)}
                        </span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>
                            {t("ReviewPage.teachingLanguage")}
                        </span>
                        <span className={styles.value}>
                            {t(`EnrollForm.${formData.teachingLanguage}`)}
                        </span>
                    </div>
                </div>
            </div>

            {/* How Found Us */}
            {formData.howDidYouKnowUs && (
                <div className={styles.reviewSection}>
                    <h2 className={styles.sectionTitle}>
                        {t("ReviewPage.howFoundUs")}
                    </h2>
                    <div className={styles.grid}>
                        <div className={styles.field}>
                            <span className={styles.label}>
                                {t("ReviewPage.source")}
                            </span>
                            <span className={styles.value}>
                                {t(`EnrollForm.${formData.howDidYouKnowUs}`)}
                            </span>
                        </div>
                        {formData.howDidYouKnowUs === "other" &&
                            formData.otherSource && (
                                <div className={styles.field}>
                                    <span className={styles.label}>
                                        {t("ReviewPage.otherSource")}
                                    </span>
                                    <span className={styles.value}>
                                        {formData.otherSource}
                                    </span>
                                </div>
                            )}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className={styles.actions}>
                <button
                    className={styles.editButton}
                    onClick={()=> router.push("https://t.me/RazanAcademy1")}
                >
                    <span> {t("ReviewPage.contact")}</span> 
                    <TelegramIcon />
                </button>
                <button
                    onClick={() => router.push("/")}
                    className={styles.submitButton}
                >
                    {t("ReviewPage.backHome")}
                </button>
            </div>
        </div>
    );
}
