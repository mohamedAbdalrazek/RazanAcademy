import Heading from "@/components/global/Heading";
import PdfList from "@/components/library/PdfList";
import React from "react";
import styles from "@/styles/library/Library.module.css"
import { useTranslations } from "next-intl";

export default function Library() {
    const t = useTranslations("Library")
    return (
        <div className={styles.library}>
            <Heading text={t(`header`)} />
            <PdfList />
        </div>
    );
}
