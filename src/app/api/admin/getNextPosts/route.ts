import { getNextPostsServer } from "@/lib/admin/adminServerUtils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { ok, posts, message, lastVisibleId } = await getNextPostsServer(request)
    if (!ok || !posts || !lastVisibleId) {
        return Response.json({ message, ok: false }, {
            status: 400
        })
    } else {
        return Response.json({ "message": `next posts was retrieved successfully`, ok: true, posts, lastVisibleId }, {
            status: 200
        })
    }
}