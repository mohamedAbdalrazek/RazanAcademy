"use client";
import React, { ChangeEvent, useState } from "react";
import TinyEditor from "../TinyEditor";
import styles from "@/styles/admin/add/AddForm.module.css";
import { getUriFromFile } from "@/lib/adminBlog";
import Image from "next/image";
// import Image from "next/image";
export default function AddForm() {
    const [post, setPost] = useState({
        title: "",
        description: "",
        imageUrl: "",
        imageAlt: "",
        body: "",
    });
    const [, setImageFile] = useState<File>();
    const [imageUri, setImageUri] = useState<string>();
    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const uri = await getUriFromFile(file);
        setImageUri(uri);
        setImageFile(file);
    };
    const handleChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };
    console.log(post);
    return (
        <form className={styles.addForm}>
            <label className={styles.addLabel}>
                Post Title
                <input
                    className={styles.addInput}
                    type="text"
                    name="title"
                    value={post.title}
                    required
                    placeholder="Post Title"
                    onChange={handleChange}
                />
            </label>

            <label className={styles.addLabel}>
                Post Description
                <textarea
                    name="description"
                    className={styles.addInput}
                    required
                    value={post.description}
                    placeholder="Post Description"
                    onChange={handleChange}
                />
            </label>

            <label className={styles.addLabel}>
                Thumbnail Alt Text
                <input
                    className={styles.addInput}
                    type="text"
                    name="imageAlt"
                    required
                    value={post.imageAlt}
                    placeholder="Image Alt Text"
                    onChange={handleChange}
                />
            </label>
            <label>
                Upload Thumbnail
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                {imageUri && (
                    <Image
                        src={imageUri}
                        alt={"test Image"}
                        width={400}
                        height={400}
                        className={styles.thumbnailPreview}
                    />
                )}
            </label>
            <TinyEditor setPost={setPost} />
        </form>
    );
}
