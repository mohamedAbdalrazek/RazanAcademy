"use client";
import React, { ChangeEvent, useState } from "react";
import TinyEditor from "../TinyEditor";
import styles from "@/styles/admin/add/AddForm.module.css";
import ImageUploader from "../ImageUploader";
import InputsList from "./InputsList";

export default function AddForm() {
    const [post, setPost] = useState({
        title: "",
        description: "",
        imageUrl: "",
        imageAlt: "",
        body: "",
    });
    const [, setImageFile] = useState<File | null>(null);
    const handleChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };
    return (
        <form className={styles.addForm}>
            <InputsList
                title={post.title}
                description={post.description}
                imageAlt={post.imageAlt}
                handleChange={handleChange}
            />
            <span className={styles.adminLabelAlt}>Upload Thumbnail</span>
            <ImageUploader setImageFile={setImageFile} />
            <span className={styles.adminLabelAlt}>Post Body</span>
            <TinyEditor setPost={setPost} />
        </form>
    );
}
