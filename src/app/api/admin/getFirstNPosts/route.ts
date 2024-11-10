import { getNPosts } from "@/lib/admin/adminPostListUtils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const param = request.nextUrl.searchParams.get("numberOfPosts")
    if (!param || !Number(param)) {
        return Response.json({ "message": "Please provide a valid number", ok: false }, {
            status: 400
        })
    }
    const numberOfPosts = Number(param)
    try {
        const { ok, posts, lastVisibleId, count } = await getNPosts({ numberOfPosts })
        if (!ok) {
            return Response.json({ "message": `Somthing went wrong getting the in getting data from firestore .`, ok: false }, {
                status: 500
            })
        }
        return Response.json({ "message": `${numberOfPosts} was retrieved successfully`, ok: true, posts, lastVisibleId, count }, {
            status: 200
        })
    } catch (error) {
        return Response.json({ "message": `Somthing went wrong getting the posts. ${error}`, ok: false }, {
            status: 500
        })
    }
}