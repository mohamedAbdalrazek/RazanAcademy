import AdminHeader from "@/components/admin/global/AdminHeader";
import PostsListLayout from "@/components/admin/layouts/PostsListLayout";
import React from "react";
export default function Archived() {
    return (
        <div className="mainPage">
            <AdminHeader text="Archived Posts" />
            <PostsListLayout route="archivedPosts" />
        </div>
    );
}
