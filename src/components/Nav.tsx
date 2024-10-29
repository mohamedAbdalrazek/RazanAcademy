"use client"
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "../styles/Navigaton.module.css"
import SelectLanguage from "./SelectLanguage";
export default function Nav() {
    const navKeys = [
        "home",
        "aboutUs",
        "courses",
        "quran",
        "pricing",
        "library",
        "blog",
    ];
    const t = useTranslations("Nav");
    const pathaname = usePathname()
    console.log(pathaname)
    const linksElement = navKeys.map((key) => {
        const href = t(`links.${key}.href`)
        const isActive = pathaname.split("/").includes(key)
        return (
            <Link href={href} key={key} className={`${styles.navLink} ${isActive &&"active"}`}>
                {t(`links.${key}.title`)}
            </Link>
        );
    });
    return (
        <nav className={styles.nav}>
            {linksElement}
            <SelectLanguage />
        </nav>
    );
}
