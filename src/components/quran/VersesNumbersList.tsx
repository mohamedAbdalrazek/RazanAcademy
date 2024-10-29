import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import styles from "@/styles/quran/VersesNumbersList.module.css";
export default function VersesNumbersList({
    numberOfVerses,
}: {
    numberOfVerses: number;
}) {
    const [numbersArray, setNumbersArray] = useState(
        Array.from(Array(numberOfVerses).keys())
    );
    const filterVerses = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNumbersArray(() => {
            if (!value) {
                return Array.from(Array(numberOfVerses).keys());
            }
            return numbersArray.filter((number) =>
                (number+1).toString().includes(value.toString())
            );
        });
    };
    return (
        <div className={styles.numebrsList}>
            <h4 className={styles.header}>Verses</h4>
            <input
                className={styles.input}
                type="number"
                placeholder="Search"
                onChange={filterVerses}
                min={0}
                max={numberOfVerses}
            />
            <div className={styles.list}>
                {numbersArray.map((number) => {
                    return (
                        <Link
                            className={styles.number}
                            key={number}
                            href={`#${number}`}
                        >
                            {number + 1}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
