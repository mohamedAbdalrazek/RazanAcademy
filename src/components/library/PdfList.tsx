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
            name: "Sahih al-Bukhari Vol.1",
            size: 12.1,
            pages: 481,
            url: "https://www.ahlesunnatpak.com/uploads/books/Saheh%20Al-Bukhari/english/SahihAl-bukhariVol.1-Ahadith1-875.pdf",
        },
        {
            name: "Sahih Muslim Vol.1",
            size: 10.1,
            pages: 624,
            url: "https://www.kalamullah.com/Books/Hadith/Sahih%20Muslim%20Vol.%201%20-%201-1160.pdf",
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
