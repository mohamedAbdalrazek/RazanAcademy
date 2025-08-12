"use client";

import { useForm } from "react-hook-form";
import styles from "./FormPage.module.css";
import { createTranslator, useTranslations } from "next-intl";
import { useState } from "react";
import enMessages from '@/../../messages/en.json';
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";
type FormValues = {
    name: string;
    age: number;
    phone: string;
    email: string;
    country: string;
    privateOrGroup: "private" | "group";
    lessonsPerWeek: "one" | "two" | "three" | "five";
    teachingLanguage: "english" | "arabic" | "uzbek";
    // Arabic-specific fields
    // English-specific fields
    motherTongue?: string;
    // Common fields
    howDidYouKnowUs?: "facebook" | "instagram" | "friend" | "family" | "other";
    otherSource?: string;
};

export default function FormComponent() {
    const t = useTranslations("EnrollForm");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValues>();

    const teachingLanguage = watch("teachingLanguage");
    const privateOrGroup = watch("privateOrGroup");
    const howDidYouKnowUsValue = watch("howDidYouKnowUs");
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true)
            const tEn = createTranslator({
                locale: 'en',
                messages: enMessages
            });
            const formedData = {
                ...data,
                privateOrGroup: tEn(`EnrollForm.${data.privateOrGroup}`),
                lessonsPerWeek: tEn(`EnrollForm.lessons.${data.lessonsPerWeek}`),
            }
            const res = await fetch('/api/form/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formedData)
            });

            const result = await res.json();
            if (result.success) {
                toast.success(t("success"));
                router.push("/")
            } else {
                toast.error(t("submitError"))

            }
        } catch (err) {
            console.error(err)
            toast.error(t("submitError"))
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>{t("formTitle")}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                {/* Common fields (name, age, phone, email) */}
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                        {t("fullName")}
                    </label>
                    <input
                        disabled={loading}
                        id="name"
                        className={styles.formInput}
                        {...register("name", {
                            required: `${t("fullName")} ${t("Error.required")}`,
                        })}
                    />
                    {errors.name && (
                        <span className={styles.errorMessage}>
                            {errors.name.message}
                        </span>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="age" className={styles.formLabel}>
                        {t("age")}
                    </label>
                    <input
                        disabled={loading}
                        id="age"
                        type="number"
                        className={styles.formInput}
                        {...register("age", {
                            required: `${t("age")} ${t("Error.required")}`,
                            min: {
                                value: 5,
                                message: `${t("age")} ${t("Error.minAge")}`,
                            },
                            max: {
                                value: 100,
                                message: `${t("age")} ${t("Error.maxAge")}`,
                            },
                        })}
                    />
                    {errors.age && (
                        <span className={styles.errorMessage}>
                            {errors.age.message}
                        </span>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>
                        {t("phoneNumber")}
                    </label>
                    <input
                        disabled={loading}
                        id="phone"
                        className={styles.formInput}
                        {...register("phone", {
                            required: `${t("phoneNumber")} ${t("Error.required")}`,
                            pattern: {
                                value: /^[0-9]{10,15}$/,
                                message: `${t("phoneNumber")} ${t(
                                    "Error.invalidPhone"
                                )}`,
                            },
                        })}
                    />
                    {errors.phone && (
                        <span className={styles.errorMessage}>
                            {errors.phone.message}
                        </span>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                        {t("email")}
                    </label>
                    <input
                        disabled={loading}
                        id="email"
                        type="email"
                        className={styles.formInput}
                        {...register("email", {
                            required: `${t("email")} ${t("Error.required")}`,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: `${t("email")} ${t(
                                    "Error.invalidEmail"
                                )}`,
                            },
                        })}
                    />
                    {errors.email && (
                        <span className={styles.errorMessage}>
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="country" className={styles.formLabel}>
                        {t("country")}
                    </label>
                    <input
                        disabled={loading}
                        id="country"
                        className={styles.formInput}
                        {...register("country", {
                            required: `${t("country")} ${t("Error.required")}`,
                        })}
                    />
                    {errors.country && (
                        <span className={styles.errorMessage}>
                            {errors.country.message}
                        </span>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label
                        htmlFor="privateOrGroup"
                        className={styles.formLabel}
                    >
                        {t("privateOrGroup")}
                    </label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="private"
                                {...register("privateOrGroup", {
                                    required: `${t("Error.privateOrGroupRequired")}`,
                                })}
                            />
                            {t("private")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="group"
                                {...register("privateOrGroup")}
                            />
                            {t("group")}
                        </label>
                    </div>
                    {errors.privateOrGroup && (
                        <span className={styles.errorMessage}>
                            {errors.privateOrGroup.message}
                        </span>
                    )}
                </div>
                {privateOrGroup && <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        {t("lessonsPerWeek")}
                    </label>
                    <div className={styles.radioGroup}>
                        {privateOrGroup === "private" && <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="one"
                                {...register("lessonsPerWeek", {
                                    required: `${t("Error.lessonsPerWeekRequired")}`,
                                })}
                            />
                            {t("lessons.one")}
                        </label>}
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="two"
                                {...register("lessonsPerWeek")}
                            />
                            {t("lessons.two")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="three"
                                {...register("lessonsPerWeek")}
                            />
                            {t("lessons.three")}
                        </label>
                        {privateOrGroup === "private" && <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="five"
                                {...register("lessonsPerWeek")}
                            />
                            {t("lessons.five")}
                        </label>}
                    </div>
                    {errors.lessonsPerWeek && (
                        <span className={styles.errorMessage}>
                            {errors.lessonsPerWeek.message}
                        </span>
                    )}
                </div>}
                {/* Language Selection */}
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        {t("teachingLanguage")}
                    </label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="english"
                                {...register("teachingLanguage", {
                                    required: `${t("Error.languageRequired")}`,
                                })}
                            />
                            {t("english")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="arabic"
                                {...register("teachingLanguage")}
                            />
                            {t("arabic")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="uzbek"
                                {...register("teachingLanguage")}
                            />
                            {t("uzbek")}
                        </label>
                    </div>
                    {errors.teachingLanguage && (
                        <span className={styles.errorMessage}>
                            {errors.teachingLanguage.message}
                        </span>
                    )}
                </div>

                {/* Arabic-specific fields */}


                {/* English-specific fields */}
                {teachingLanguage !== "arabic" && (
                    <>
                        <div className={styles.formGroup}>
                            <label
                                htmlFor="motherTongue"
                                className={styles.formLabel}
                            >
                                {t("motherTongue")}
                            </label>
                            <input
                                disabled={loading}
                                id="motherTongue"
                                className={styles.formInput}
                                {...register("motherTongue", {
                                    required: `${t(
                                        "Error.motherTongueRequired"
                                    )}`,
                                })}
                            />
                            {errors.motherTongue && (
                                <span className={styles.errorMessage}>
                                    {errors.motherTongue.message}
                                </span>
                            )}
                        </div>


                    </>
                )}

                {/* Common fields (how did you know us) */}
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        {t("howDidYouKnowUs")}
                    </label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="facebook"
                                {...register("howDidYouKnowUs")}
                            />
                            {t("facebook")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="instagram"
                                {...register("howDidYouKnowUs")}
                            />
                            {t("instagram")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="friend"
                                {...register("howDidYouKnowUs")}
                            />
                            {t("friend")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="family"
                                {...register("howDidYouKnowUs")}
                            />
                            {t("family")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                disabled={loading}
                                type="radio"
                                value="other"
                                {...register("howDidYouKnowUs")}
                            />
                            {t("other")}
                        </label>
                    </div>
                    {howDidYouKnowUsValue === "other" && (
                        <div className={styles.formGroup}>
                            <label
                                htmlFor="otherSource"
                                className={styles.formLabel}
                            >
                                {t("pleaseSpecify")}
                            </label>
                            <input
                                disabled={loading}
                                id="otherSource"
                                className={styles.formInput}
                                {...register("otherSource")}
                            />
                            {errors.otherSource && (
                                <span className={styles.errorMessage}>
                                    {errors.otherSource.message}
                                </span>
                            )}
                        </div>
                    )}
                    {errors.howDidYouKnowUs && (
                        <span className={styles.errorMessage}>
                            {errors.howDidYouKnowUs.message}
                        </span>
                    )}
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className={`small-button ${styles.submitButton}`}
                >
                    {loading ? t("loading") : t("submit")}
                </button>
            </form>
        </div>
    );
}
