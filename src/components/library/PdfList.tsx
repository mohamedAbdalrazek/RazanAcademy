import React from "react";
import Pdf from "./Pdf";
import styles from "@/styles/library/PdfList.module.css"
type Pdf = {
    name: string;
    size: number;
    pages: number;
    url: string;
};
export default function PdfList() {
    const pdfList: Pdf[] = [
        {
            name: "Holy Quran Arabic",
            size: 94,
            pages: 625,
            url: "https://www.quran-pdf.com/arabic-quran.pdf",
        },
        {
            name: "Holy Quran Arabic",
            size: 94,
            pages: 625,
            url: "https://www.quran-pdf.com/arabic-quran.pdf",
        },
        {
            name: "Holy Quran Arabic",
            size: 94,
            pages: 625,
            url: "https://www.quran-pdf.com/arabic-quran.pdf",
        },
    ];
    return (
        <div className={styles.pdfList}>
            {pdfList.map((pdf) => {
                return (
                    <Pdf
                        name={pdf.name}
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
