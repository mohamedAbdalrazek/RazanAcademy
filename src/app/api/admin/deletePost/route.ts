import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const param = request.nextUrl.searchParams.get("postId")
    const route = request.nextUrl.searchParams.get("route")
    if (!param || !route) {
        return Response.json({ message: "Please provide a post id and a route", ok: false }, {
            status: 400
        })
    }
    try {
        const docRef = doc(collection(db, route), param)
        await deleteDoc(docRef)
        return Response.json({ "message": `post with Id:${param} was deleted successfully`, ok: true}, {
            status: 200
        })
    } catch (error) {
        return Response.json({ "message": `Somthing went wrong getting the posts. ${error}`, ok: false }, {
            status: 500
        })
    }
}