import React from "react";
import Verse from "./Verse";
import localFont from "next/font/local";
const myFont = localFont({ src: "../../fonts/Hafs.ttf" });

export default function VersesList() {
    return (
        <div className={myFont.className}>
            <Verse />
        </div>
    );
}
