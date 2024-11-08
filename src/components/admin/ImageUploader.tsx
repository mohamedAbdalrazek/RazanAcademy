import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import { getUriFromFile } from "@/lib/adminBlog";
import styles from "@/styles/admin/components/ImageUploader.module.css";
type Props = {
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
};
export default function ImageUploader({ setImageFile }: Props) {
    const [imageUri, setImageUri] = useState<string>();
    const [isError, setIsError] = useState(false);
    const handleSelectImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImageFile(e.target.files[0]);
        const file = e.target.files[0];
        const uri = await getUriFromFile(file);
        setImageUri(uri);
        setIsError(false);
    };
    const handleDeletePreview = () => {
        setIsError(true);
        setImageUri("");
        setImageFile(null);
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
                    <CloseIcon
                        onClick={handleDeletePreview}
                        className={styles.deleteImageIcon}
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
