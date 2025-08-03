"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import styles from "../styles/Select.module.css";
import ArrowDown from "./icons/ArrowDown";
type Option = {
    value: "en" | "uz" | "ar";
    label: string;
    imgSrc: string;
};
export default function SelectLanguage() {
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();
    const params = useParams();
    const [, startTransition] = useTransition();
    const [showDropdown, setShowDropdown] = useState(false);
    const options: Option[] = [
        { value: "en", label: "En", imgSrc: "/en.png" },
        { value: "uz", label: "Uz", imgSrc: "/uz.png" },
        { value: "ar", label: "Ar", imgSrc: "/ar.png" },
    ];
    const selected = options.filter((option) => {
        return option.value === locale;
    })[0];
    const changeLanguage = (nextLocale: "uz" | "en"|"ar") => {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    };
    const handleClick = () => {
        setShowDropdown(!showDropdown);
    };
    return (
        <div className={`${styles.dropdown} ${locale === "ar"?styles.arDropdown:""}`}>
            <button
                className={`${styles.dropdownBtn} ${
                    showDropdown && styles.activeBtn
                }`}
                onClick={handleClick}
            >
                <Image

                    width={100}
                    height={60}
                    src={selected.imgSrc}
                    alt={selected.label}
                    className={styles.optionImage}
                />
                <span>{selected.label}</span>
                <ArrowDown className={styles.arrowDown} />
            </button>
            {showDropdown && (
                <div className={styles.dropdownOptions}>
                    {options.map((option) => {
                        return (
                            locale != option.value && (
                                <div
                                    key={option.value}
                                    className={styles.dropdownOption}
                                    onClick={() => changeLanguage(option.value)}
                                >
                                    <Image
                                        src={option.imgSrc}
                                        alt={option.label}
                                        width={20}
                                        height={25}
                                        className={styles.optionImage}
                                    />
                                    <span>{option.label}</span>
                                </div>
                            )
                        );
                    })}
                </div>
            )}
        </div>
    );
}
