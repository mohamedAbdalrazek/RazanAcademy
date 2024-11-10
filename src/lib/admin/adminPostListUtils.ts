import { GetPostResponse, RetrievedPost } from "@/types/admin.types";
import { collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../firebase";
import { NextRequest } from "next/server";

export const getNextPosts = async ({
    lastVisibleId,
    numberOfPosts,
}: {
    lastVisibleId: string | null;
    numberOfPosts: number;
}): Promise<{ ok: boolean, data?: GetPostResponse, message: string }> => {
    const requestBody = {
        lastVisibleId,
        numberOfPosts,
    };
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


export const getNPosts = async ({ numberOfPosts }: { numberOfPosts: number }): Promise<{ ok: boolean, posts: RetrievedPost[], lastVisibleId: string, count?: number }> => {
    const colRef = collection(db, "posts");
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

export const getNextPostsServer = async (request: NextRequest): Promise<{ ok: boolean, message: string, posts?: RetrievedPost[], lastVisibleId?: string }> => {
    let data;
    try {
        data = await request.json() as { lastVisibleId: string, numberOfPosts: number }
        if (!data.lastVisibleId || !data.numberOfPosts) {
            console.error("Last visible id or number of posts is not provieded");
            return { ok: false, message: "Last post id or number of posts  for is not provieded" }
        }
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return { ok: false, message: "Invalid JSON format" }
    }
    let lastSnapshot
    try {
        const firstDocRef = doc(collection(db, "posts"), data.lastVisibleId);
        lastSnapshot = await getDoc(firstDocRef);
    } catch (error) {
        console.error("Failed to get the last Post .", error);
        return { ok: false, message: "Failed to get lastPost from the database" }
    }
    try {
        const colRef = collection(db, "posts")
        const q = query(colRef, orderBy("issuedAt", "desc"), startAfter(lastSnapshot), limit(data.numberOfPosts));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RetrievedPost[];
        const newLastVisible = posts[snapshot.docs.length - 1].id;
        return { message: "new", posts, lastVisibleId: newLastVisible, ok: true }
    } catch (error) {
        console.error("Failed to get the next posts .", error);
        return { ok: false, message: "Failed to get next posts from the database" }
    }
}