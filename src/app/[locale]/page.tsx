
import Landing from "@/components/Landing";
import { getTranslations } from "next-intl/server";

// import { useTranslations } from "next-intl";
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
    };
}


export default function IndexPage() {

    return (
            <div>
                <Landing />
            </div>
    );
}
