import React from "react";
import whatsapp from "../../public/whatsapp.png";
import Image from "next/image";
import styles from "../styles/WhatsappButton.module.css"
import { useTranslations } from "next-intl";
import Link from "next/link";
export default function WhatsappButton() {
    const t = useTranslations("WhatsappButton")

    return (
        <Link href="https://chat.whatsapp.com/LcptojNhzIwEnSVrI8FJeb?mode=ac_t" className={styles.buttonWrapper}>
            <Image
                width={25}
                height={25}
                src={whatsapp}
                alt="Razan Academy whatsapp number"
                className={styles.whatsappLogo}
            />
            <p className={styles.buttonText}>
                {t(`text`)}
            </p>
        </Link>
    );
}
