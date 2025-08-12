import SideBar from "@/components/admin/SideBar";
import { ReactNode } from "react";
import "@/styles/admin/globalAdmin.css"
import { Roboto, Roboto_Mono } from "next/font/google";
type Props = {
    children: ReactNode;
};
const roboto = Roboto({
    weight: ["900", "700", "500", "400", "300"],
    subsets: ["latin"],
    display: "swap",
});
const roboto_mono = Roboto_Mono({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: Props) {
    return (
        <html>
            <body className={`${roboto_mono.className} ${roboto.className}`}>
                <main className="layout">
                    <SideBar />
                    {children}
                    
                </main>
            </body>
        </html>
    );
}
