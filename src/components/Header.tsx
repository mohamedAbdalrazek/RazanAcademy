import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import coverBackground from "../../public/cover-background.png";
import styles from "../styles/Header.module.css";
import { Link } from "@/i18n/routing";
import { Amiri, Noto_Nastaliq_Urdu } from "next/font/google";
const amiri = Amiri({ subsets: ["latin"], weight: ["400"], style: ["italic"] });
const noto_nastaliq_urdu = Noto_Nastaliq_Urdu({
    subsets: ["arabic", "latin", "latin-ext"],
    display: "swap",
    weight: ["700"],
});

export default function Header() {
    return (
        <div className={styles.header}>
            <Link href={"/"} className={styles.logoWrapper}>
                <Image
                    className={styles.logo}
                    width={140}
                    height={180}
                    src={logo}
                    alt="Razan Academy"
                    placeholder="blur"
                />
            </Link>
            <div className={styles.cover}>
                <div className={styles.coverBackgroundWrapper}>
                    <Image
                        className={styles.coverBackground}
                        src={coverBackground}
                        fill
                        alt="Razan Academy Cover"
                        placeholder="blur"
                    />
                </div>
                <div className={styles.coverTextWrapper}>
                    <p className={noto_nastaliq_urdu.className}>
                        أكاديمية رزان للدراسات القرآنية
                    </p>
                    <p className={amiri.className}>
                        RAZAN Academy for Teaching the Holy Quran
                    </p>
                    <p className={amiri.className}>
                        RAZAN Qur{`'`}oni Karimni o{`'`}rgatish akademiyasi
                    </p>
                </div>
            </div>
        </div>
    );
}
