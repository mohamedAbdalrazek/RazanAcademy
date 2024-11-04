import React from "react";
import PostCard from "./PostCard";
import styles from "@/styles/blog/PostList.module.css";
type Post = {
    src: string;
    title: string;
    description: string;
    date: string;
};
export default function PostsList() {
    const postList: Post[] = [
        {
            src: "/images/mockBackground-one-2.jpg",
            title: "Tips for Memorizing the Quran Effectively",
            description:
                "Explore proven techniques to help you memorize the Quran with ease and retain it for life. Perfect for students at any stage of their memorization journey.",
            date: "Jun 25, 2023",
        },
        {
            src: "/images/mockBackground-one-3.jpg",
            title: "Building a Consistent Quranic Study Routine",
            description:
                "Learn practical tips for creating a sustainable Quranic study schedule that fits your lifestyle and deepens your understanding and recitation skills.",
            date: "Jun 26, 2023",
        },
        {
            src: "/images/quran.jpg",
            title: "Understanding the Meaning Behind Quranic Verses",
            description:
                "Dive into the significance of comprehending the meanings of Quranic verses and how it enriches your spiritual connection and daily practice.",
            date: "Jun 28, 2023",
        },
    ];
    return (
        <div className={styles.postsList}>
            {postList.map((post) => {
                return (
                    <PostCard
                        src={post.src}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        key={post.title}
                    />
                );
            })}
        </div>
    );
}
