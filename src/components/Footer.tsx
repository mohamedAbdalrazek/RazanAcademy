import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import shape from "../../public/footer-shape.png";
import styles from "@/styles/Footer.module.css"
import { useTranslations } from "next-intl";
export default function Footer() {
    const t = useTranslations("Footer")
    return (
        <footer className={styles.footer}>
            <div className={styles.left}>
                <Link href={"/"} className={styles.logoWrapper}>
                    <Image
                        className={styles.logo}
                        width={45}
                        height={60}
                        src={logo}
                        alt="Razan Academy"
                        placeholder="blur"
                    />
                </Link>
                <div className={styles.leftTextWrapper}>
                    <h4>
                        {t(`name`)}
                    </h4>
                    <span>
                        {t(`customer`)}
                    </span>
                </div>
            </div>
            <div className={styles.right}>
                <Image
                    className={styles.shape}
                    width={90}
                    height={90}
                    src={shape}
                    alt="Razan Academy"
                    placeholder="blur"
                />
            </div>
        </footer>
    );
}
