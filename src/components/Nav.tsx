"use client"
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "@/styles/Navigaton.module.css"
import SelectLanguage from "./SelectLanguage";
import Image from "next/image";
export default function Nav() {
    const navKeys = [
        "home",
        "aboutUs",
        "courses",
        "quran",
        "library",
        "blog",
    ];
    const t = useTranslations("Nav");
    const pathaname = usePathname()
    const linksElement = navKeys.map((key) => {
        const href = t(`links.${key}.href`)
        const isActive = pathaname.split("/")[1] === href.split("/")[1]
        return (
            <Link href={href} key={key} className={`${styles.navLink} ${isActive &&"active"}`}>
                {t(`links.${key}.title`)}
            </Link>
        );
    });
    return (
        <nav className={styles.nav}>
            <Image className={styles.logo} src={"/logo.png"} alt="Razan Academy" width={100} height={150}/>
            <div className={styles.navLinkWrapper}>

                {linksElement}  
            </div>
            <SelectLanguage />
        </nav>
    );
}
