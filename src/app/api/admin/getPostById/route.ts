import { db } from "@/lib/firebase";
import { RetrievedPost } from "@/types/admin.types";
import { collection, doc, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const postsId = request.nextUrl.searchParams.get("postsId")
    const route = request.nextUrl.searchParams.get("route")
    if (!postsId || !route) {
        return Response.json({ message: "Please provide a valid fetch params", ok: false }, {
            status: 400
        })
    }
    try {
        const firstDocRef = doc(collection(db, route), postsId);
        const snapshot = await getDoc(firstDocRef);
        const post = snapshot.data() as RetrievedPost
        return Response.json({ "message": `[${post.title}] was retrieved successfully`, ok: true, post }, {
            status: 200
        })
    }
    catch (error) {
        return Response.json({ "message": `Somthing went wrong getting the posts. ${error}`, ok: false }, {
            status: 500
        })
    }
}