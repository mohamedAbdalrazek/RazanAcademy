import RecentPost from "@/components/blog/RecentPost";
import Heading from "@/components/global/Heading";
import SubHeading from "@/components/global/SubHeading";
import React from "react";
import styles from "@/styles/blog/Blog.module.css"
import PostsList from "@/components/blog/PostsList";
export default function page(){
    return (
        <div className={styles.blog}>
            <Heading text="Blog" />
            <SubHeading text="Recent Post" />
            <RecentPost />
            <SubHeading text="Discover Posts" />
            <PostsList />
        </div>
    );
}
