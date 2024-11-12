import ArrowDown from "@/components/icons/ArrowDown";
import React, { Dispatch, useState } from "react";
import styles from "@/styles/admin/post-list/LoadMore.module.css";
import { GetPostResponse } from "@/types/admin.types";
import AdminLoading from "./AdminLoading";
import { getNextPosts } from "@/lib/admin/adminPostListUtils";
import { errorPopup } from "@/lib/admin/adminUtils";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function LoadMore({
    setData,
    lastVisibleId,
    numberOfPosts,
    route
}: {
    setData: Dispatch<React.SetStateAction<GetPostResponse | null>>;
    lastVisibleId: string | null;
    numberOfPosts: number;
    route:string;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const handleClick = async () => {
        setLoading(true);
        const requestBody = { lastVisibleId, numberOfPosts, route }
        const request = await getNextPosts(requestBody);
        if (!request.ok || !request.data) {
            errorPopup(request.message);
            setLoading(false);
            return;
        }
        const data = request.data;
        setData((prevData) => ({
            ...data,
            count: prevData?.count,
            posts: [...(prevData?.posts || []), ...data.posts],
        }));
        setLoading(false);
    };
    return (
        <div className={styles.loadMore} onClick={handleClick}>
            <span className={styles.text}>Load More</span>
            <ArrowDown className={styles.icon} />
            {loading && <AdminLoading />}
            <ToastContainer />
        </div>
    );
}
