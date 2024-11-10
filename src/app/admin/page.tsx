import AdminHeader from "@/components/admin/global/AdminHeader";
import PostsListLayout from "@/components/admin/layouts/PostsListLayout";
import React from "react";
export default function page() {
    return (
        <div className="mainPage">
            <AdminHeader text="Posts List" />
            <PostsListLayout />
        </div>
    );
}
