"use client";
import { GetPostResponse, RetrievedPost } from "@/types/admin.types";
import React, { useEffect, useState } from "react";
import PostListSkeleton from "../loading/PostListSkeleton";
import PostCard from "../post-list/PostCard";
import styles from "@/styles/admin/post-list/PostListLayout.module.css";
import PostListHeader from "../post-list/PostListHeader";
import LoadMore from "../post-list/LoadMore";
import AdminError from "../global/AdminError";

const NUMBER_OF_POSTS = 6;

export default function PostsListLayout() {
    const [data, setData] = useState<GetPostResponse | null>(null);
    const posts: RetrievedPost[] | null = data ? data.posts : null;
    const lastVisibleId: string | null = data ? data.lastVisibleId : null;
    const isPostsFinished = data?.count === posts?.length || data?.count == 0;
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    console.log({ lastVisibleId });
    useEffect(() => {
        fetch(
            `http://localhost:3000/api/admin/getFirstNPosts?numberOfPosts=${NUMBER_OF_POSTS}`,
            { method: "GET" }
        )
            .then((result) => {
                return result.json();
            })
            .catch(() => {
                console.error("Invalid JSON format");
                setErrorMessage("Something went wrong please reload the page");
            })
            .then((data: GetPostResponse) => {
                if (!data.ok) {
                    console.error(data.message);
                    setErrorMessage(
                        "Something went wrong in the server side please reload the page"
                    );
                    return;
                }
                setData(data);
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage(
                    "Somthing went wrong check the internet and reload the page"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const postsListElement = posts?.map((post) => {
        return <PostCard setData={setData} key={post.id} post={post} />;
    });
    if (errorMessage !== null) {
        return (
            <div className={styles.postListWrapper}>
                <AdminError />
            </div>
        );
    }

    return (
        <div className={styles.postListWrapper}>
            {loading ? (
                <PostListSkeleton numberOfPosts={NUMBER_OF_POSTS} />
            ) : (
                <div className={styles.postList}>
                    <PostListHeader />
                    {postsListElement}
                    {!isPostsFinished && (
                        <LoadMore
                            setData={setData}
                            lastVisibleId={lastVisibleId}
                            numberOfPosts={NUMBER_OF_POSTS}
                        />
                    )}
                    {data?.count === 0 && (
                        <span
                            className={styles.noPosts}
                        >{`There's no Posts`}</span>
                    )}
                </div>
            )}
        </div>
    );
}
