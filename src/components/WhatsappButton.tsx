import React from "react";
import whatsapp from "../../public/whatsapp.png";
import Image from "next/image";
import styles from "../styles/WhatsappButton.module.css"
export default function WhatsappButton() {
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
                Contact Us on Whatsapp
            </p>
        </button>
    );
}
