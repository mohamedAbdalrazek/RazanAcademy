import {
    getTranslations,
    setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../../styles/normalize.css";
import "../../styles/global.css";
import BaseLayout from "@/components/BaseLayout";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/utils";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metaData.Layout" });

    return {
        title: t("title", {
            default: "Razan Academy | Online Quran & Arabic Classes",
        }),
        description: t("description", {
            default:
                "Razan Academy offers professional online Quran, Tajweed, Arabic, and Islamic studies classes for all ages. Learn with qualified native Arab teachers through flexible schedules and interactive live sessions.",
        }),
        keywords: t("keywords", {
            default:
                "Razan Academy, online Quran classes, Tajweed courses, Arabic learning, Quran memorization, Islamic studies online, Quran for kids, native Arab tutors",
        })
            .split(",")
            .map((kw: string) => kw.trim()),

        openGraph: {
            title: t("ogTitle", {
                default: "Razan Academy – Learn Quran & Arabic Online",
            }),
            description: t("ogDescription", {
                default:
                    "Join Razan Academy to learn Quran, Tajweed, and Arabic with expert native Arab teachers. Flexible online lessons for kids and adults with certified instructors.",
            }),
            url: `${BASE_URL}`,
            siteName: "Razan Academy",
            type: "website",
            images: [
                {
                    url: `${BASE_URL}/og/home.png`,
                    width: 1200,
                    height: 630,
                    alt: t("ogAlt", {
                        default: "Razan Academy – Online Quran & Arabic Learning",
                    }),
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: t("twitterTitle", {
                default: "Razan Academy | Online Quran & Arabic Learning",
            }),
            description: t("twitterDescription", {
                default:
                    "Learn Quran, Tajweed, and Arabic online with certified native Arab tutors. Flexible scheduling, interactive classes, and programs for all ages.",
            }),
            images: [`${BASE_URL}/og/home.png`],
        },

        alternates: {
            canonical: `${BASE_URL}/`,
            languages: {
                en: `${BASE_URL}/en`,
                ar: `${BASE_URL}/ar`,
                uz: `${BASE_URL}/uz`,
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params;
    if (!routing.locales.includes(locale as "uz" | "en" | "ar")) {
        notFound();
    }
    setRequestLocale(locale);
    return (
        <BaseLayout locale={locale} >
            {children}
        </BaseLayout>
    );
}
