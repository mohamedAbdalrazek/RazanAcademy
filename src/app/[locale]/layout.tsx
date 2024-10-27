import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Roboto_Mono } from "next/font/google";
import "../../styles/normalize.css";
import "../../styles/global.css";
import { ReactNode } from "react";
type Props = {
    children: ReactNode;
    params: { locale: string };
};
const roboto_mono = Roboto_Mono({ subsets: ["latin"] });
export async function generateMetadata({
    params: { locale },
}: Omit<Props, "children">) {
    const t = await getTranslations({ locale, namespace: "LocaleLayout" });

    return {
        title: t("title"),
        description: t("description"),
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
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as "uz" | "en")) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${roboto_mono.className}`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
