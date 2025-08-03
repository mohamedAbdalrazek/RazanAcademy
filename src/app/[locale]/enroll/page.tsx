"use client";

import { useForm } from "react-hook-form";
import styles from "./FormPage.module.css";
import { useTranslations } from "next-intl";

type FormValues = {
    name: string;
    age: number;
    phone: string;
    email: string;
    country: string;
    teachingLanguage: "arabic" | "english" | "uzbek";
    // Arabic-specific fields
    submissionPurpose?: "memorizing" | "improving-recitation" | "ijazah ";
    quranMemorization?: "one" | "two" | "five" | "completed";
    lessonsPerWeek?: "once" | "twice" | "three" | "group";
    // English-specific fields
    motherTongue?: string;
    interestedCourse?: "noor-albayan" | "tajweed" | "quran-with-tajweed";
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
    const howDidYouKnowUsValue = watch("howDidYouKnowUs");

    const onSubmit = (data: FormValues) => {
        console.log(data);
        // Handle form submission here
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
                {/* Language Selection */}
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        {t("teachingLanguage")}
                    </label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
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
                                type="radio"
                                value="arabic"
                                {...register("teachingLanguage")}
                            />
                            {t("arabic")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
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
                {teachingLanguage === "arabic" && (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                {t("submissionPurpose")}
                            </label>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="memorizing"
                                        {...register("submissionPurpose", {
                                            required:
                                                teachingLanguage === "arabic"
                                                    ? `${t(
                                                          "Error.purposeRequired"
                                                      )}`
                                                    : false,
                                        })}
                                    />
                                    {t("memorizing")}
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="improving"
                                        {...register("submissionPurpose")}
                                    />
                                    {t("improving")}
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="ijazah"
                                        {...register("submissionPurpose")}
                                    />
                                    {t("ijazah")}
                                </label>
                            </div>
                            {errors.submissionPurpose && (
                                <span className={styles.errorMessage}>
                                    {errors.submissionPurpose.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                {t("quranMemorization")}
                            </label>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="one "
                                        {...register("quranMemorization", {
                                            required:
                                                teachingLanguage === "arabic"
                                                    ? `${t(
                                                          "Error.memorizationRequired"
                                                      )}`
                                                    : false,
                                        })}
                                    />
                                    {t("one")}
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="two"
                                        {...register("quranMemorization")}
                                    />
                                    {t("two")}
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="five"
                                        {...register("quranMemorization")}
                                    />
                                    {t("five")}
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="completed"
                                        {...register("quranMemorization")}
                                    />
                                    {t("completed")}
                                </label>
                            </div>
                            {errors.quranMemorization && (
                                <span className={styles.errorMessage}>
                                    {errors.quranMemorization.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                {t("lessonsPerWeek")}
                            </label>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="once"
                                        {...register("lessonsPerWeek", {
                                            required:
                                                teachingLanguage === "arabic"
                                                    ? `${t(
                                                          "Error.lessonsRequired"
                                                      )}`
                                                    : false,
                                        })}
                                    />
                                    {t("once")}
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="twice"
                                        {...register("lessonsPerWeek")}
                                    />
                                    {t("twice")}
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="three"
                                        {...register("lessonsPerWeek")}
                                    />
                                    {t("three")}
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="group"
                                        {...register("lessonsPerWeek")}
                                    />
                                    {t("group")}
                                </label>
                            </div>
                            {errors.lessonsPerWeek && (
                                <span className={styles.errorMessage}>
                                    {errors.lessonsPerWeek.message}
                                </span>
                            )}
                        </div>
                    </>
                )}

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

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                {t("interestedCourse")}
                            </label>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="noor-albayan"
                                        {...register("interestedCourse", {
                                            required: `${t(
                                                "Error.courseRequired"
                                            )}`,
                                        })}
                                    />
                                    {t("noor-albayan")}
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="tajweed"
                                        {...register("interestedCourse")}
                                    />
                                    {t("tajweed")}
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value="quran-with-tajweed"
                                        {...register("interestedCourse")}
                                    />
                                    {t("quran-with-tajweed")}
                                </label>
                            </div>
                            {errors.interestedCourse && (
                                <span className={styles.errorMessage}>
                                    {errors.interestedCourse.message}
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
                                type="radio"
                                value="facebook"
                                {...register("howDidYouKnowUs")}
                            />
                            {t("facebook")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="instagram"
                                {...register("howDidYouKnowUs")}
                            />
                            {t("instagram")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="friend"
                                {...register("howDidYouKnowUs")}
                            />
                            {t("friend")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="family"
                                {...register("howDidYouKnowUs")}
                            />
                            {t("family")}
                        </label>
                        <label className={styles.radioLabel}>
                            <input
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
                    type="submit"
                    className={`small-button ${styles.submitButton}`}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
