import React from "react";
import styles from "@/styles/quran/Chapter.module.css";
import localFont from "next/font/local";
import ChapterLayout from "@/components/quran/ChapterLayout";
import { getTranslations } from "next-intl/server";
import { getChapterInfo } from "@/lib/chapter";
const hafsFont = localFont({ src: "../../../../fonts/Hafs.ttf" });

type Props = {
    params: { locale: string; id: string };
};

export async function generateMetadata({
    params: { locale, id },
}: Omit<Props, "children">) {
    const t = await getTranslations({ locale, namespace: "metaData" });
    const chapterInfo = await getChapterInfo(id);
    return {
        title: t("ChapterPage.title", { name: chapterInfo.name_simple }),
        description: t("ChapterPage.description", {
            name: chapterInfo.name_simple,
        }),
    };
}
export default function Chapter({
    params: { id },
}: {
    params: { id: string };
}) {
    return (
        <div className={`${hafsFont.className} ${styles.chapter}`}>
            <ChapterLayout id={id} />
        </div>
    );
}
