import React from "react";
import PdfIcon from "../icons/PdfIcon";
import styles from "@/styles/library/Pdf.module.css";
import { useTranslations } from "next-intl";

type Pdf = {
    name:string,
    size:number,
    pages:number,
    url:string
}
export default function Pdf({name, size, pages, url}:Pdf) {
    const t  = useTranslations("Library")
    return (
        <div className={styles.pdf}>
            <div className={styles.nameWrapper}>

                <PdfIcon className={styles.pdfIcon} />
                <span className={styles.name}>
                    {name}
                </span>
            </div>
            <div className={styles.pdfSize}>
                <span>{size}</span>
                <span>/MB</span>
            </div>
            <div className={styles.pdfPages}>
                <span>{pages}</span>
                <span>/{t("pages")}</span>
            </div>

            <a
                className="small-button"
                href={url}
                download
            >
                {t("download")}
            </a>
        </div>
    );
}
