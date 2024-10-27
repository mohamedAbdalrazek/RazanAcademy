import React from "react";
import whatsapp from "../../public/whatsapp.png";
import Image from "next/image";
import styles from "../styles/WhatsappButton.module.css"
import { useTranslations } from "next-intl";
export default function WhatsappButton() {
    const t = useTranslations("WhatsappButton")
    return (
        <button className={styles.buttonWrapper}>
            <Image
                width={25}
                height={25}
                src={whatsapp}
                alt="Razan Academy whatsapp number"
                placeholder="blur"
                className={styles.whatsappLogo}
            />
            <p className={styles.buttonText}>
                {t(`text`)}
            </p>
        </button>
    );
}
