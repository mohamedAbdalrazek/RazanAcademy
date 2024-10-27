"use client"
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import React, { ChangeEvent, useTransition } from "react";

export default function SelectLanguage() {
    const router= useRouter()
    const locale = useLocale()
    const pathname = usePathname()
    console.log(locale)
    const params = useParams()
    const [, startTransition] = useTransition();
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value ;
        console.log(nextLocale)
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    };
    return (
        <select onChange={onChange} defaultValue={locale}>
            <option value="en">En</option>
            <option value="uz">Uz</option>
        </select>
    );
}
