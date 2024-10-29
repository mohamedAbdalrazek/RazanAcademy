"use client";
import ChapterList from "@/components/quran/ChapterList";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/quran/ChapterPage.module.css";
import Skeleton from "@/components/global/Skeleton";
import { useTranslations } from "next-intl";
import { Metadata } from "next";
type Chapter = {
    id: number;
    revelation_place: string;
    name_english: string;
    name_arabic: string;
};


export default function Quran() {
    const t = useTranslations("QuranList");
    const [chapters, setChapters] = useState<Chapter[]>();
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMessage] = useState("");
    useEffect(() => {
        try {
            fetch("http://localhost:3000/api/chapters", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.formatedChapters && data.formatedChapters.length) {
                        setChapters(data.formatedChapters);
                    } else {
                        setErrorMessage(
                            "Something went wrong please refresh the page"
                        );
                    }
                })
                .catch((error) => {
                    console.log(error, "from inside");
                    setErrorMessage(
                        "Something went wrong please refresh the page"
                    );
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
            setErrorMessage("Something went wrong please refresh the page");
            console.log(error);
        }
    }, []);

    return (
        <div className={styles.chapters}>
            <h1 className={styles.header}>{t(`header`)}</h1>
            {loading ? (
                <Skeleton />
            ) : chapters && chapters.length ? (
                <ChapterList chapters={chapters} />
            ) : (
                errorMsg
            )}
        </div>
    );
}
