import { GetPostResponse } from "@/types/admin.types";
import { Dispatch } from "react";

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