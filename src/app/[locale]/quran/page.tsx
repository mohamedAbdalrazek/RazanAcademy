import ChapterList from "@/components/quran/ChapterList";
import React from "react";
import styles from "@/styles/quran/ChapterPage.module.css";
import Skeleton from "@/components/global/Skeleton";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { fetchChapters } from "@/lib/utils";
type Chapter = {
    id: number;
    revelation_place: string;
    name_english: string;
    name_arabic: string;
};
type Props = {
    params: { locale: string };
};

export async function generateMetadata({
    params: { locale },
}: Omit<Props, "children">) {
    const t = await getTranslations({ locale, namespace: "metaData" });

    return {
        title: t("QuranPage.title"),
        description: t("QuranPage.description"),
    };
}
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function Quran({ params: { locale } }: Props) {
    setRequestLocale(locale);
    const chapters: Chapter[] | null = await fetchChapters();
    return (
        <div className={styles.chapters}>
            <h1 className={styles.header}>
                {locale === "en" ? "Chapters of the Quran" : "Qur'on suralari"}
            </h1>

            {chapters ? <ChapterList chapters={chapters} /> : <Skeleton />}
        </div>
    );
}
