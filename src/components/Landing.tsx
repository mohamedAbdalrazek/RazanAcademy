import React from "react";
import landing from "../../public/landing.png";
import Image from "next/image";
import styles from "../styles/Landing.module.css";
import { useLocale, useTranslations } from "next-intl";
export default function Landing() {
    const t = useTranslations("Landing");
    const locale = useLocale()
    return (
        <main className={`${styles.landing} ${locale === "ar" ? styles.arLanding:"" }`}>
            <div className={styles.left}>
                <h1 className={styles.landingHeader}>{t(`header`)}</h1>
                <p className={styles.subHeader}>{t(`subHeaderOne`)}</p>
                <p className={styles.subHeader}>{t(`subHeaderTwo`)}</p>
                <p className={styles.subHeader}>{t(`subHeaderThree`)}</p>
                <p className={styles.subHeader}>{t(`subHeaderFour`)}</p>
            </div>
            <div className={styles.right}>
                <Image  
                    src={landing}
                    width={450}
                    height={369}
                    className={styles.landingImage}
                    alt="Photo of the holy quran"
                    placeholder="blur"
                />
            </div>
        </main>
    );
}
