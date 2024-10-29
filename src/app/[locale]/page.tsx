
import Landing from "@/components/Landing";
import { getTranslations } from "next-intl/server";
type Props = {
    params: { locale: string };
};
export async function generateMetadata({
    params: { locale },
}: Omit<Props, "children">) {
    const t = await getTranslations({ locale, namespace: "metaData" });

    return {
        title: t("HomePage.title"),
        description: t("HomePage.description"),
        icons: {
            icon: "/favicon/icon.png",
            shortcut: "/favicon/shortcut.png",
            apple: "/favicon/apple.png",
        },
    };
}
// import { useTranslations } from "next-intl";



export default function IndexPage() {
    // Enable static rendering

    // const t = useTranslations("HomePage");

    return (
            <div>

                <Landing />

            </div>
    );
}
