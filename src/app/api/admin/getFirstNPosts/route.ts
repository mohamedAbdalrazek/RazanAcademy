import { db } from "@/lib/firebase";
import { RetrievedPost } from "@/types/admin.types";
import { collection, getCountFromServer, getDocs, limit, orderBy, query } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const param = request.nextUrl.searchParams.get("numberOfPosts")
    if (!param) {
        return Response.json({ "message": "Please provide a number", ok: false }, {
            status: 400
        })
    }
    const numberOfPosts = Number(param)
    if (!numberOfPosts) {
        return Response.json({ "message": "Please provide a valid number", ok: false }, {
            status: 400
        })
    }
    try {
        const colRef = collection(db, "posts");
        const countSnapshot = await getCountFromServer(colRef);
        const count = countSnapshot.data().count;

        const q = query(colRef, orderBy("issuedAt", "desc"), limit(numberOfPosts));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RetrievedPost[];
        const lastVisibleId = posts[snapshot.docs.length - 1].id;
        return Response.json({ "message": `${numberOfPosts} was retrieved successfully`, ok: true, posts, lastVisibleId, count }, {
            status: 200
        })
    } catch (error) {
        return Response.json({ "message": `Somthing went wrong getting the posts. ${error}`, ok: false }, {
            status: 400
        })
    }
}