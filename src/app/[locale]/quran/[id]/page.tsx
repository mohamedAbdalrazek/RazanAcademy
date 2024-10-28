"use client";
import VersesList from "@/components/quran/VersesList";
import React, { useEffect, useState } from "react";

type Verse = {
    id: string,
    arabic_verse: string,
    english_verse: string,
    audio: string
}
type  Chapter= {
    fullAudio:string,
    verces:Verse[]
}
export default function Chapter({
    params: { id },
}: {
    params: { id: string; locale: string };
}) {
    // const [chapter, setChapter] = useState<Chapter>();
    // const [loading, setLoading] = useState(true);
    // const [errorMsg, setErrorMessage] = useState("");
    // useEffect(() => {
    //     try {
    //         fetch(`http://localhost:3000/api/chapters/${id}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 console.log(data)
    //                 if (data.verses && data.verses.length && data.fullAudio) {
    //                     setChapter(data);
    //                 } else {
    //                     setErrorMessage(
    //                         "Something went wrong please refresh the page"
    //                     );
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error, "from inside");
    //                 setErrorMessage(
    //                     "Something went wrong please refresh the page"
    //                 );
    //             })
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     } catch (error) {
    //         setLoading(false);
    //         setErrorMessage("Something went wrong please refresh the page");
    //         console.log(error);
    //     }
    // }, [id]);

    // console.log(chapter)
    return <div>
        <VersesList />
    </div>;
}
