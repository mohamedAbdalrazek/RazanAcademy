import React from "react";
import landing from "../../public/landing.png";
import Image from "next/image";
import styles from "../styles/Landing.module.css";
import { useTranslations } from "next-intl";
export default function Landing() {
    const t = useTranslations("Landing");
    return (
        <main className={styles.landing}>
            <div className={styles.left}>
                <h1 className={styles.landingHeader}>{t(`header`)}</h1>
                <p className={styles.subHeader}>{t(`subHeader`)}</p>
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
