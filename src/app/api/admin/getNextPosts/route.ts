import { db } from "@/lib/firebase";
import { RetrievedPost } from "@/types/admin.types";
import { collection, limit, query, orderBy, getDocs, doc, getDoc, startAfter } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    let data;
    try {
        data = await request.json() as { lastVisibleId: string, numberOfPosts: number }
        if (!data.lastVisibleId || !data.numberOfPosts) {
            console.error("Last visible id or number of posts is not provieded");
            return Response.json({ ok: false, message: "Last post id or number of posts  for is not provieded" }, {
                status: 400
            });
        }
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return Response.json({ ok: false, message: "Invalid JSON format" }, {
            status: 400
        });
    }

    let lastSnapshot
    try {
        const firstDocRef = doc(collection(db, "posts"), data.lastVisibleId);
        lastSnapshot = await getDoc(firstDocRef);
        console.log(lastSnapshot)
    } catch (error) {
        console.error("Failed to get the last Post .", error);
        return Response.json({ ok: false, message: "Failed to get lastPost from the database" }, {
            status: 500
        });
    }
    try {
        const colRef = collection(db, "posts")
        const q = query(colRef, orderBy("issuedAt", "desc"), startAfter(lastSnapshot), limit(data.numberOfPosts));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RetrievedPost[];
        const newLastVisible = posts[snapshot.docs.length - 1].id;
        return Response.json({ message: "new", posts, lastVisible: newLastVisible, ok: true }, {
            status: 200
        })
    } catch (error) {
        console.error("Failed to get the next posts .", error);
        return Response.json({ ok: false, message: "Failed to get next posts from the database" }, {
            status: 500
        });
    }

}