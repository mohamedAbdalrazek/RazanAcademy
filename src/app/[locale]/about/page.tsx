import { useTranslations } from "next-intl";
import React from "react";
import styles from "@/styles/about-us/AboutUs.module.css";
import Heading from "@/components/global/Heading";
import AboutUsSections from "@/components/about-us/AboutUsSections";
import SubHeading from "@/components/global/SubHeading";
import TeachersCardList from "@/components/about-us/TeachersCardList";
import CertificateSwiper from "@/components/about-us/CertificateSwiper";
export default function About() {
    const t = useTranslations("AboutUs");
    return (
        <div className={styles.aboutPage}>
            <Heading text={t("header")} />
            <AboutUsSections />
            <SubHeading text={t("subHeaderTeachers")} />
            <TeachersCardList />
            <SubHeading text={t("subHeaderCertifications")} />
            <CertificateSwiper />
        </div>
    );
}
