import React from "react";
import styles from "@/styles/Footer.module.css";
import { Amiri, Noto_Nastaliq_Urdu } from "next/font/google";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import MapMarkerIcon from "./icons/MapMarkerIcon";
import PhoneIcon from "./icons/PhoneIcon";
import EnvelopeIcon from "./icons/EnvelopeIcon";
import FacebookIcon from "./icons/FacebookIcon";
import WhatsappIcon from "./icons/WhatsappIcon";

const amiri = Amiri({ subsets: ["latin"], weight: ["400"], style: ["italic"] });
const noto_nastaliq_urdu = Noto_Nastaliq_Urdu({
    subsets: ["arabic", "latin", "latin-ext"],
    display: "swap",
    weight: ["700"],
});

export default function Footer() {
    const t = useTranslations("Footer");

    const footerLinks = [
        { title: t("links.home"), href: "/" },
        { title: t("links.about"), href: "/about-us" }, 
        { title: t("links.courses"), href: "/courses" },
        { title: t("links.quran"), href: "/quran" },
        { title: t("links.pricing"), href: "/pricing" },
        { title: t("links.library"), href: "/library" },
        { title: t("links.blog"), href: "/blog" },
        { title: t("links.contact"), href: "/contact" },
    ];

    const socialLinks = [
        { name: "Facebook", icon: <FacebookIcon className={styles.socialIcon} />, href: "#" },
        { name: "WhatsApp", icon: <WhatsappIcon className={styles.socialIcon}  />, href: "#" },
        // { name: "YouTube", icon: "fa-youtube", href: "#" },
        // { name: "Instagram", icon: "fa-instagram", href: "#" },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={styles.footerSection}>
                    <h3 className={styles.footerTitle}>{t("about.title")}</h3>
                    <p className={styles.footerText}>
                        {t("about.description")}
                    </p>
                    <div className={styles.socialLinks}>
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                className={styles.socialLink}
                                aria-label={social.name}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                
                <div className={styles.footerSection}>
                    <h3 className={styles.footerTitle}>{t("contact.title")}</h3>
                    <ul className={styles.contactInfo}>
                        <li>
                            <MapMarkerIcon className={styles.contactIcon} />
                            {t("contact.address")}
                        </li>
                        <li>
                            <PhoneIcon className={styles.contactIcon} />
                            {t("contact.phone")}
                        </li>
                        <li>
                            <EnvelopeIcon className={styles.contactIcon} />
                            {t("contact.email")}
                        </li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3 className={styles.footerTitle}>
                        {t("quickLinks.title")}
                    </h3>
                    <ul className={styles.footerLinks}>
                        {footerLinks.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.href}
                                    className={styles.footerLink}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className={styles.footerBottom}>
                <div className={styles.separationLine}></div>
                <div className={styles.copyright}>
                    <p className={noto_nastaliq_urdu.className}>
                        {t("copyright.arabic")}
                    </p>
                    <p className={amiri.className}>{t("copyright.english")}</p>
                    <p>
                        © {new Date().getFullYear()} {t("copyright.rights")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
