"use client";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Navigaton.module.css";
import SelectLanguage from "./SelectLanguage";
import BarsIcon from "./icons/BarsIcon";
import CloseIcon from "./icons/CloseIcon";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function Nav() {
    const navKeys = [
        "home",
        "aboutUs",
        "courses",
        "quran",
        "pricing",
        "library",
        // "blog",
    ];
    const t = useTranslations("Nav");
    const pathname = usePathname();
    useEffect(() => {
        setShowMobileNav(false);
    }, [pathname]);
    const linksElement = navKeys.map((key) => {
        const href = t(`links.${key}.href`);
        const isActive = pathname.split("/")[1] === href.split("/")[1];
        return (
            <Link
                href={href}
                key={key}
                className={`${styles.navLink} ${isActive && "active"}`}
            >
                {t(`links.${key}.title`)}
            </Link>
        );
    });
    const [showMobileNav, setShowMobileNav] = useState(false);
    return (
        <nav className={styles.nav}>
            <div
                className={`${styles.navLinksWrapper} ${
                    showMobileNav && styles.openNavLinkWrapper
                }`}
            >
                {linksElement}
                <CloseIcon
                    className={styles.closeIcon}
                    onClick={() => setShowMobileNav(false)}
                />
            </div>
            <Image
                className={styles.logo}
                width={140}
                height={180}
                src={logo}
                alt="Razan Academy"
            />
            <div className={styles.mobileNavRight}>
                <BarsIcon
                    onClick={() => setShowMobileNav(true)}
                    className={styles.barsIcon}
                />
                <SelectLanguage />
            </div>
        </nav>
    );
}
