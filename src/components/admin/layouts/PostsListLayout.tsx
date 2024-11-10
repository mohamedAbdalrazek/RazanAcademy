"use client";
import { GetPostResponse, RetrievedPost } from "@/types/admin.types";
import React, { useEffect, useState } from "react";
import PostListSkeleton from "../loading/PostListSkeleton";
import PostCard from "../post-list/PostCard";
import styles from "@/styles/admin/post-list/PostListLayout.module.css";
import PostListHeader from "../post-list/PostListHeader";
import LoadMore from "../post-list/LoadMore";

const NUMBEROFPOSTS = 6;

export default function PostsListLayout() {
    const [posts, setPosts] = useState<RetrievedPost[] | null>(null);
    const [lastVisibleId, setLastVisibleId] = useState<string|null>(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(
            `http://localhost:3000/api/admin/getFirstNPosts?numberOfPosts=${NUMBEROFPOSTS}`,
            { method: "GET" }
        )
            .then((result) => {
                return result.json();
            })
            .then((data: GetPostResponse) => {
                setPosts(data.posts);
                setLastVisibleId(data.lastVisibleId)
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const postsListElement = posts?.map((post) => {
        return <PostCard key={post.id} title={post.title} id={post.id} />;
    });
    return (
        <div className={styles.postListWrapper}>
            {loading ? (
                <PostListSkeleton numberOfPosts={NUMBEROFPOSTS} />
            ) : (
                <div className={styles.postList}>
                    <PostListHeader />
                    {postsListElement}
                    <LoadMore setLastVisibleId={setLastVisibleId} setPosts={setPosts} lastVisibleId={lastVisibleId} numberOfPosts={NUMBEROFPOSTS} />
                </div>
            )}
        </div>
    );
}
