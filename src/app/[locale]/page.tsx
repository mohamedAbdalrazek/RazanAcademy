import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import WhatsappButton from "@/components/WhatsappButton";
// import { useTranslations } from "next-intl";



export default function IndexPage() {
    // Enable static rendering

    // const t = useTranslations("HomePage");

    return (
            <div>
                <Header />
                <Nav />
                <WhatsappButton />
                <Footer />
            </div>
    );
}
