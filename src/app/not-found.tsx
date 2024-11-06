import BaseLayout from "@/components/BaseLayout";
import NotFound from "@/components/NotFound";
import { routing } from "@/i18n/routing";
import React from "react";

export default function GlobalNotFound() {
    return (
        <BaseLayout locale={routing.defaultLocale}>
            <NotFound />
        </BaseLayout>
    );
}
