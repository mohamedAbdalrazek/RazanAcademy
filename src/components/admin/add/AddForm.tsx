"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import TinyEditor from "../TinyEditor";
import styles from "@/styles/admin/add/AddForm.module.css";
import ImageUploader from "../ImageUploader";
import InputsList from "./InputsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPost, errorPopup, uploadImageAndGetUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import AdminLoading from "../AdminLoading";
type Post = {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    body: string;
};
export default function AddForm() {
    const router = useRouter();
    const [post, setPost] = useState<Post>({
        title: "",
        description: "",
        imageUrl: "",
        imageAlt: "",
        body: "",
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
        for (const [key, value] of Object.entries(post)) {
            if (key === "imageUrl") {
                continue;
            }
            if (!value) {
                console.log({ key });
                setIsLoading(false);
                errorPopup("Please fill the required data");
                return;
            }
        }
        if (!imageFile) {
            errorPopup("Please upload a thumbnail Image");
            setIsLoading(false);

            return;
        }
        const result = await uploadImageAndGetUrl(imageFile);
        if (!result.imageUrl) {
            setIsLoading(false);
            errorPopup(
                result.error
                    ? result.error
                    : "Error uploading the Thumbnail, please try again"
            );
            return;
        }
        const formedPost = {
            ...post,
            imageUrl: result.imageUrl,
        };
        const addPostResult = await addPost(formedPost);
        if (!addPostResult.ok) {
            setIsLoading(false);
            errorPopup(addPostResult.message);
            return;
        }
        router.push("/admin/");
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
