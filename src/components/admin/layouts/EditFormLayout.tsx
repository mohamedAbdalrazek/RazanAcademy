"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { editPost } from "@/lib/admin/adminAddPostUtils";

import TinyEditor from "../global/TinyEditor";
import ImageUploader from "../global/ImageUploader";
import InputsList from "../add-post/InputsList";
import AdminLoading from "../global/AdminLoading";
import { ToastContainer } from "react-toastify";

import styles from "@/styles/admin/add/AddForm.module.css";
import { Post, RetrievedPost } from "@/types/admin.types";
import "react-toastify/dist/ReactToastify.css";
import PostListSkeleton from "../loading/PostListSkeleton";

export default function EditFormLayout({
    id,
    route,
}: {
    id: string;
    route: string;
}) {
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
    const [isLoading, setIsLoading] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetch(
            `http://localhost:3000/api/admin/getPostById?postsId=${id}&route=${route}`,
            { method: "GET" }
        )
            .then((result) => {
                return result.json();
            })
            .catch(() => {
                console.error("Invalid JSON format");
            })
            .then(
                (data: {
                    ok: boolean;
                    message: string;
                    post: RetrievedPost;
                }) => {
                    if (!data.ok) {
                        console.error(data.message);
                        return;
                    }
                    setPost(data.post);
                }
            )
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id, route]);
    const handleChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handelSubmit = async (submitRoute: string) => {
        setIsSubmitting(true);
        const addPostCheck = await editPost(
            post,
            imageFile,
            id,
            submitRoute
        );
        if (addPostCheck.ok) router.back();

        setIsSubmitting(false);
        return;
    };
    if (isLoading) {
        return <PostListSkeleton numberOfPosts={10} />;
    }
    return (
        <form className={styles.addForm} onSubmit={(e) => e.preventDefault()}>
            <InputsList
                title={post.title}
                description={post.description}
                imageAlt={post.imageAlt}
                handleChange={handleChange}
            />
            <span className={styles.adminLabelAlt}>Upload Thumbnail</span>
            <ImageUploader
                setImageFile={setImageFile}
                initialUri={post.imageUrl}
            />
            <span className={styles.adminLabelAlt}>Post Body</span>
            <TinyEditor body={post.body} setPost={setPost} />
            <div className={styles.buttonsWrapper}>
                <button
                    className={`adminButton ${styles.submitButton}`}
                    onClick={() => handelSubmit(route)}
                >
                    Edit
                </button>
            </div>
            {isSubmitting && <AdminLoading />}
            <ToastContainer />
        </form>
    );
}
