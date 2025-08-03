import {
    getTranslations,
    setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../../styles/normalize.css";
import "../../styles/global.css";
import BaseLayout from "@/components/BaseLayout";


type Props = {
    params: { locale: string };
};
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
    params: { locale },
}: Omit<Props, "children">) {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "metaData" });

    return {
        title: t("Layout.title"),
        description: t("HomePage.description"),
        icons: {
            icon: "/favicon/icon.png",
            shortcut: "/favicon/shortcut.png",
            apple: "/favicon/apple.png",
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
