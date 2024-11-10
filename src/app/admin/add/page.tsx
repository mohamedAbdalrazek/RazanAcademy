import React from "react";

import AdminHeader from "@/components/admin/global/AdminHeader";
import AddFormLayout from "@/components/admin/layouts/AddFormLayout";

export default function Add() {
    return (
        <div className="mainPage">
            <AdminHeader text="Add Post" />
            <AddFormLayout />
        </div>
    );
}
