import Heading from "@/components/global/Heading";
import PdfList from "@/components/library/PdfList";
import React from "react";
import styles from "@/styles/library/Library.module.css"
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
type Props = {
    params: { locale: string };
};
export async function generateMetadata({
    params: { locale },
}: Omit<Props, "children">) {
    const t = await getTranslations({ locale, namespace: "metaData" });

    return {
        title: t("LibraryPage.title"),
        description: t("LibraryPage.description"),
    };
}

export default function Library() {
    const t = useTranslations("Library")
    return (
        <div className={styles.library}>
            <Heading text={t(`header`)} />
            <PdfList />
        </div>
    );
}
