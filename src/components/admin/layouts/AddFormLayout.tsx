"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { addPost } from "@/lib/admin/adminAddPostUtils";

import TinyEditor from "../global/TinyEditor";
import ImageUploader from "../global/ImageUploader";
import InputsList from "../add-post/InputsList";
import AdminLoading from "../global/AdminLoading";
import { ToastContainer } from "react-toastify";

import styles from "@/styles/admin/add/AddForm.module.css";
import { Post } from "@/types/admin.types";
import "react-toastify/dist/ReactToastify.css";

export default function AddFormLayout() {
    const router = useRouter();

    const [post, setPost] = useState<Post>({
        title: "",
        description: "",
        imageUrl: "",
        imageAlt: "",
        body: "",
        issuedAt: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handelSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const currentTime = new Date().toISOString();
        const formedPost = {
            ...post,
            issuedAt: currentTime,
        };
        const addPostCheck = await addPost(formedPost, imageFile);
        if (addPostCheck.ok) router.push("/admin/");

        setIsLoading(false);
        return;
    };
    return (
        <form className={styles.addForm} onSubmit={handelSubmit}>
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
            <button className={`adminButton ${styles.submitButton}`}>
                Add Post
            </button>
            {isLoading && <AdminLoading />}
            <ToastContainer />
        </form>
    );
}
