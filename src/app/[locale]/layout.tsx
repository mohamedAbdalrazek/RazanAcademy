import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Roboto_Mono } from "next/font/google";
import "../../styles/normalize.css";
import "../../styles/global.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import WhatsappButton from "@/components/WhatsappButton";
const roboto_mono = Roboto_Mono({ subsets: ["latin"] });
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
                    <Header />
                    <Nav />
                    {children}
                    <WhatsappButton />
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
