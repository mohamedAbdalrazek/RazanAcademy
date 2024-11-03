import React from "react";
import PdfIcon from "../icons/PdfIcon";
import styles from "@/styles/library/Pdf.module.css";

type Pdf = {
    name:string,
    size:number,
    pages:number,
    url:string
}
export default function Pdf({name, size, pages, url}:Pdf) {
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
                <span>/Pages</span>
            </div>

            <a
                className={styles.pdfDownload}
                href={url}
                download
            >
                Download
            </a>
        </div>
    );
}
