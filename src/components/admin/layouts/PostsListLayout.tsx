"use client";
import { GetPostResponse, RetrievedPost } from "@/types/admin.types";
import React, { useEffect, useState } from "react";
import PostListSkeleton from "../loading/PostListSkeleton";
import PostCard from "../post-list/PostCard";
import styles from "@/styles/admin/post-list/PostListLayout.module.css";
import PostListHeader from "../global/PostListHeader";
import LoadMore from "../global/LoadMore";
import AdminError from "../global/AdminError";
import ArchivedPostCard from "../archived-list/ArchivedPostCard";

const NUMBER_OF_POSTS = 6;

export default function PostsListLayout({ route }: { route: string }) {
    const [data, setData] = useState<GetPostResponse | null>(null);

    const posts: RetrievedPost[] | null = data ? data.posts : null;
    const lastVisibleId: string | null = data ? data.lastVisibleId : null;
    const isPostsFinished = data?.count === posts?.length || data?.count == 0;

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch(
            `http://localhost:3000/api/admin/getFirstNPosts?numberOfPosts=${NUMBER_OF_POSTS}&route=${route}`,
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
    }, [route]);
    
    const postsListElement = posts?.map((post) => {
        return route === "posts" ? (
            <PostCard setData={setData} key={post.id} post={post} />
        ) : (
            <ArchivedPostCard setData={setData} key={post.id} post={post} />
        );
    });
    if (errorMessage !== null) {
        return (
            <div className={styles.postListWrapper}>
                <AdminError />
            </div>
        );
    }
    const headerTitles = [
        "Edit",
        route === "posts" ? "Archive" : "Post",
        "Delete",
    ];
    return (
        <div className={styles.postListWrapper}>
            {loading ? (
                <PostListSkeleton numberOfPosts={NUMBER_OF_POSTS} />
            ) : (
                <div className={styles.postList}>
                    <PostListHeader headerTitles={headerTitles} />
                    {postsListElement}
                    {!isPostsFinished && (
                        <LoadMore
                            setData={setData}
                            lastVisibleId={lastVisibleId}
                            numberOfPosts={NUMBER_OF_POSTS}
                            route={route}
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
