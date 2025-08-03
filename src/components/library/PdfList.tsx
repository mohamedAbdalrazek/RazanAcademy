import React from "react";
import Pdf from "./Pdf";
import styles from "@/styles/library/PdfList.module.css"
import { useTranslations } from "next-intl";
type Pdf = {
    name: string;
    size: number;
    pages: number;
    url: string;
};
export default function PdfList() {
    const pdfList: Pdf[] = [
        {
            name: "noor-albayan",
            size: 5.74,
            pages: 79,
            url: "https://drive.google.com/file/d/10xQG63JzWM5urNHNOO9XDkrVSgw0u65e/view?usp=sharing",
        },
        {
            name: "advanced-tajweed",
            size: 27.63,
            pages: 181,
            url: "https://drive.google.com/file/d/1hNwKYUTxhMXZdVSp1saP3uxkrZoeUhv5/view?usp=sharing",
        },
       
    ];
    const t = useTranslations("Library.Books");
    return (
        <div className={styles.pdfList}>
            {pdfList.map((pdf) => {
                return (
                    <Pdf
                        name={t(pdf.name)}
                        size={pdf.size}
                        pages={pdf.pages}
                        url={pdf.url}
                        key={pdf.name}
                    />
                );
            })}
        </div>
    );
}
