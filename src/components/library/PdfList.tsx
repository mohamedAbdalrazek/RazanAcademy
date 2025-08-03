import React from "react";
import Pdf from "./Pdf";
import styles from "@/styles/library/PdfList.module.css";
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
            url: "https://drive.google.com/file/d/12Qbu9NqG7XJD6_iD0lLhffCQKPRd-Lhy/view?usp=drive_link",
        },
        {
            name: "advanced-tajweed",
            size: 27.63,
            pages: 181,
            url: "https://drive.google.com/file/d/1KpGw-uf73icsA3gvXs29ERUYxDCMdKsI/view?usp=sharing",
        },
        {
            name: "basic-tajweed",
            size: 19.3,
            pages: 123,
            url: "https://drive.google.com/file/d/1tVhpAkJnUvtBsHFgloUy1ktLJZtvRz77/view?usp=sharing",
        },
        {
            name: "quran",
            size: 192.4,
            pages: 685,
            url: "https://drive.google.com/file/d/1AoHztZzPv94I7_Vi1tYzxiD3fRK1dL6t/view?usp=drive_link",
        }
        
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
