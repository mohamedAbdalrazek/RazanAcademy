import { useTranslations } from "next-intl";
import React from "react";
import styles from "@/styles/about-us/AboutUs.module.css";
import Heading from "@/components/global/Heading";
import { getTranslations } from "next-intl/server";
import AboutUsSections from "@/components/about-us/AboutUsSections";
import SubHeading from "@/components/global/SubHeading";
import TeachersCardList from "@/components/about-us/TeachersCardList";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({
    params: { locale },
}: Omit<Props, "children">) {
    const t = await getTranslations({ locale, namespace: "metaData" });

    return {
        title: t("AboutPage.title"),
        description: t("AboutPage.description"),
    };
}
export default function About() {
    const t = useTranslations("AboutUs");
    return (
        <div className={styles.aboutPage}>
            <Heading text={t("header")} />
            <AboutUsSections />
            <SubHeading text={t("subHeader")} />
            <TeachersCardList />
        </div>
    );
}
