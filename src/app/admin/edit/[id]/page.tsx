import React from "react";

import AdminHeader from "@/components/admin/global/AdminHeader";
import EditFormLayout from "@/components/admin/layouts/EditFormLayout";

export default function EditPost({
    params: { id },
}: {
    params: { id: string };
}) {
    console.log(id)
    return (
        <div className="mainPage">
            <AdminHeader text="Edit Post" />
            <EditFormLayout id={id} />
        </div>
    );
}
