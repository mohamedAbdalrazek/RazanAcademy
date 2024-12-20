"use client"
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import { getUriFromFile } from "@/lib/admin/adminUtils";

import styles from "@/styles/admin/components/ImageUploader.module.css";

type Props = {
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
    initialUri?:string
};
export default function ImageUploader({ setImageFile, initialUri }: Props) {
    const [imageUri, setImageUri] = useState<string>(initialUri??"");
    console.log({imageUri})
    const [isError, setIsError] = useState(false);
    const handleSelectImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImageFile(e.target.files[0]);
        const file = e.target.files[0];
        const uri = await getUriFromFile(file);
        setImageUri(uri);
        setIsError(false);
    };
    return (
        <div className={styles.ImageUploader}>
            <div className={styles.UploaderButtonWrapper}>
                <label htmlFor="uploadButton" className="adminButton">
                    Choose File
                </label>
                <input
                    id="uploadButton"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleSelectImage}
                />
                {!imageUri && (
                    <span className={styles.adminUploaderButtonText}>
                        No file chosen
                    </span>
                )}
            </div>
            {imageUri && (
                <div className={styles.imagePreviewWrapper}>
                    <Image
                        src={imageUri}
                        alt={"test Image"}
                        width={400}
                        height={400}
                        className={styles.imagePreview}
                    />
                </div>
            )}
            {isError && (
                <span className="errorMessage">
                    Thumbnail Image is required
                </span>
            )}
        </div>
    );
}
