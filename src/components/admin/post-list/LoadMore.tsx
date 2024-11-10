import ArrowDown from "@/components/icons/ArrowDown";
import React, { Dispatch, useState } from "react";
import styles from "@/styles/admin/post-list/LoadMore.module.css";
import { GetPostResponse, RetrievedPost } from "@/types/admin.types";
import AdminLoading from "../global/AdminLoading";
export default function LoadMore({
    lastVisibleId,
    setPosts,
    numberOfPosts,
    setLastVisibleId,
}: {
    lastVisibleId: string | null;
    setPosts: Dispatch<React.SetStateAction<RetrievedPost[] | null>>;
    numberOfPosts: number;
    setLastVisibleId: Dispatch<React.SetStateAction<string | null>>;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const getNextPosts = async () => {
        setLoading(true);
        const requestBody = {
            lastVisibleId,
            numberOfPosts,
        };
        let result;
        try {
            result = await fetch(
                "http://localhost:3000/api/admin/getNextPosts",
                {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: { "Content-Type": "application/json" },
                }
            );
        } catch (error) {
            console.error("Error connecting with the server", error);
            setLoading(false);
            return;
        }
        let data: GetPostResponse;
        try {
            data = await result.json();
        } catch (error) {
            console.error("Invalid JSON form", error);
            setLoading(false);
            return;
        }
        if (!data.ok) {
            console.error("Error in the server", data.message);
            setLoading(false);
            return;
        }
        setPosts((prevPosts) => [...(prevPosts || []), ...data.posts]);
        setLastVisibleId(data.lastVisibleId);
        setLoading(false);
    };
    return (
        <div className={styles.loadMore} onClick={getNextPosts}>
            <span className={styles.text}>Load More</span>
            <ArrowDown className={styles.icon} />
            {loading && <AdminLoading />}
        </div>
    );
}
