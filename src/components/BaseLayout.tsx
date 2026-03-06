import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React, { ReactNode } from "react";
import Header from "./Header";
import { Roboto, Roboto_Mono } from "next/font/google";
import "../styles/normalize.css";
import "../styles/global.css";
import Nav from "./Nav";
import Footer from "./Footer";
import WhatsappButton from "./WhatsappButton";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
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
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            <Script
                id="facebook-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              fbq('init', '787824725887629');
              fbq('track', 'PageView');
            `,
                }}
            />
            <body className={`${roboto_mono.className} ${roboto.className}`}>
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    <Nav />
                    {children}
                    <WhatsappButton />
                    <Footer />
                    <Toaster position="top-right" reverseOrder={false} />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
