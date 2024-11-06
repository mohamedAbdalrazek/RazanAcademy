import BaseLayout from "@/components/BaseLayout";
import { routing } from "@/i18n/routing";
import React from "react";

export default function GlobalNotFound() {
    return (
        <BaseLayout locale={routing.defaultLocale}>
            <div>not-found</div>
        </BaseLayout>
    );
}
