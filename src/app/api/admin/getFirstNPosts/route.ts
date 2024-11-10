import { db } from "@/lib/firebase";
import { RetrievedPost } from "@/types/admin.types";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const param = request.nextUrl.searchParams.get("numberOfPosts")
    if (!param) {
        return Response.json({ "message": "please provide a number", ok: false }, {
            status: 400
        })
    }
    const numberOfPosts = Number(param)
    if (!numberOfPosts) {
        return Response.json({ "message": "please provide a valid number", ok: false }, {
            status: 400
        })
    }
    try {

        const colRef = collection(db, "posts");
        const q = query(colRef, orderBy("issuedAt", "desc"), limit(numberOfPosts));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RetrievedPost[];
        const lastVisibleId = posts[snapshot.docs.length - 1].id;
        return Response.json({ "message": `${numberOfPosts} was retrieved successfully`, ok: true, posts, lastVisibleId }, {
            status: 200
        })
    } catch (error) {
        return Response.json({ "message": `somthing went wrong getting the posts. ${error}`, ok: false }, {
            status: 400
        })
    }
}