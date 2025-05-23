import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React, { ReactNode } from "react";
import { Roboto, Roboto_Mono } from "next/font/google";
import "../styles/normalize.css";
import "../styles/global.css";
import Nav from "./Nav";
import Footer from "./Footer";
import WhatsappButton from "./WhatsappButton";
type Props = {
    children: ReactNode;
    locale: string;
};
const roboto = Roboto({
    weight: ["900", "700", "500", "400", "300"],
    subsets: ["latin"],
    display: "swap",
});
const roboto_mono = Roboto_Mono({ subsets: ["latin"], display: "swap" });

export default async function BaseLayout({ children, locale }: Props) {
    const messages = await getMessages();
    return (
        <html lang={locale}>
            <body className={`${roboto_mono.className} ${roboto.className}`}>
                <NextIntlClientProvider messages={messages}>
                    <Nav />
                    {children}
                    <WhatsappButton />
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
