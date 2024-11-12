import cloudinary from "../cloudinary";
import { getUriFromFile } from "./adminUtils";
import { RetrievedPost } from "@/types/admin.types";
import { collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../firebase";
import { NextRequest } from "next/server";

export const uploadImage = async (file: File): Promise<{ ok: boolean, location: string, error: string }> => {
    if (!file) {
        return {
            error: "No file provided. Please attach a file.",
            ok: false,
            location: ""
        }
    }

    let fileUri;
    try {
        fileUri = await getUriFromFile(file);
    } catch (error) {
        return {
            error: `Failed to process the file. Please try again. ${error}`,
            ok: false,
            location: ""

        };
    }

    try {
        const result = await cloudinary.uploader.upload(fileUri, {
            public_id: file.name,
            folder: "blog",
            resource_type: "image",
        });
        return { location: result.secure_url, ok: true, error: "" };
    } catch (error) {
        return {
            error: `Failed to upload image to Cloudinary. Please check your network or Cloudinary configuration. ${error}`,
            ok: false,
            location: ""
        }
    }



}


export const getNPosts = async ({ numberOfPosts, route }: { numberOfPosts: number, route: string }): Promise<{ ok: boolean, posts: RetrievedPost[], lastVisibleId: string, count?: number }> => {
    const colRef = collection(db, route);
    let count;
    try {
        const countSnapshot = await getCountFromServer(colRef);
        count = countSnapshot.data().count;
    } catch (error) {
        console.error("Error getting the number of posts", error)
        return { ok: false, posts: [], lastVisibleId: "" }
    }
    let posts;
    try {
        const q = query(colRef, orderBy("issuedAt", "desc"), limit(numberOfPosts));
        const snapshot = await getDocs(q);
        posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RetrievedPost[];
    } catch (error) {
        console.error("Error getting posts from the database", error)
        return { ok: false, posts: [], lastVisibleId: "" }
    }

    if (!posts || posts.length === 0) {
        return { ok: false, posts: [], lastVisibleId: "" }
    }
    const lastVisibleId = posts[posts.length - 1].id;
    return { ok: true, posts, lastVisibleId, count }
}


export const getNextPostsServer = async (request: NextRequest): Promise<{ ok: boolean, message: string, posts?: RetrievedPost[], lastVisibleId?: string }> => {
    let data;
    try {
        data = await request.json() as { lastVisibleId: string, numberOfPosts: number, route: string }

    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return { ok: false, message: "Invalid JSON format" }
    }
    if (!data.lastVisibleId || !data.numberOfPosts || !data.route) {
        console.error("Last visible id or number of posts is not provieded");
        return { ok: false, message: "Last post id or number of posts  for is not provieded" }
    }
    let lastSnapshot
    try {
        const firstDocRef = doc(collection(db, data.route), data.lastVisibleId);
        lastSnapshot = await getDoc(firstDocRef);
    } catch (error) {
        console.error("Failed to get the last Post .", error);
        return { ok: false, message: "Failed to get lastPost from the database" }
    }
    try {
        const colRef = collection(db, data.route)
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