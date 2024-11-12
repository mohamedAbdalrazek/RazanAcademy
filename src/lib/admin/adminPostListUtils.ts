import { GetPostResponse, RetrievedPost } from "@/types/admin.types";
import { collection, getCountFromServer, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Dispatch } from "react";

export const getNextPosts = async (requestBody: {
    lastVisibleId: string | null;
    numberOfPosts: number;
    route:string
}): Promise<{ ok: boolean, data?: GetPostResponse, message: string }> => {
    let result;
    try {
        result = await fetch(
            "http://localhost:3000/api/admin/getNextPosts",
            {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error connecting with the server", error);
        return { ok: false, message: "Check your Internet connection" };
    }
    let data: GetPostResponse;
    try {
        data = await result.json();
    } catch (error) {
        console.error("Invalid JSON form", error);
        return { ok: false, message: "something went wrong try again" };
    }
    if (!data.ok) {
        console.error("Error in the server", data.message);
        return { ok: false, message: "something went wrong try again" };
    }
    console.log(data.posts.length);
    if (data.posts.length === 0) {
        return { ok: false, message: "something went wrong try again" };
    }
    return { ok: true, data, message: "everything is good" }
};


export const getNPosts = async ({ numberOfPosts, route }: { numberOfPosts: number, route: string }): Promise<{ ok: boolean, posts: RetrievedPost[], lastVisibleId: string, count?: number }> => {
    const colRef = collection(db, route);
    const countSnapshot = await getCountFromServer(colRef);
    const count = countSnapshot.data().count;

    const q = query(colRef, orderBy("issuedAt", "desc"), limit(numberOfPosts));
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RetrievedPost[];
    if (!posts || posts.length === 0) {
        return { ok: false, posts: [], lastVisibleId: "" }
    }
    const lastVisibleId = posts[snapshot.docs.length - 1].id;
    return { ok: true, posts, lastVisibleId, count }
}





export const deletePost = async (setData: Dispatch<React.SetStateAction<GetPostResponse | null>>, id: string, route:string) => {
    const result = await fetch(`/api/admin/deletePost?postId=${id}&route=${route}`);
    let data;
    try {
        data = (await result.json()) as { ok: boolean; message: string };
    } catch (error) {
        return { ok: false, message: `Invalid JSON form. ${error}` }
    }
    if (!data.ok) {
        return data;
    }
    setData((prevData) => {
        if (!prevData) return null;
        const filteredPosts = prevData.posts.filter(
            (post) => post.id !== id
        );
        return {
            ...prevData,
            count: prevData.count && prevData.count - 1,
            posts: filteredPosts,
        };
    });
    return data
}