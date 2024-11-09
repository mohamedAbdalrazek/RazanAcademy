import { Post } from "@/types/admin.types";
import { errorPopup, uploadImageAndGetUrl } from "./adminUtils";

export const UploadPostToFirestore = async (post: Post): Promise<{ ok: boolean, message: string }> => {
    const result = await fetch(`/api/admin/addPost`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" }
    });
    const data = await result.json() as { ok: boolean, message: string }
    if (!data.ok) {
        console.error(data.message)
    }
    return { ok: data.ok, message: data.message }

}


export const isObjectValuesEmpty = (object: Post) => {
    for (const [key, value] of Object.entries(object)) {
        if (key === "imageUrl") {
            continue;
        }
        if (!value) {
            console.log({value}, "test")
            return true;
        }
    }
    return false
}

export const addPost = async (post: Post, imageFile: File | null): Promise<{ ok: boolean }> => {
    console.log(post)
    if (isObjectValuesEmpty(post)) {
        console.log("first")
        errorPopup("Please fill the required data");
        return { ok: false };
    }
    if (!imageFile) {
        errorPopup("Please upload a thumbnail Image");
        return { ok: false };
    }
    const result = await uploadImageAndGetUrl(imageFile);
    if (!result.ok) {
        errorPopup(result.error);
        return { ok: false };
    }
    const formedPost = {
        ...post,
        imageUrl: result.imageUrl,
    };
    const addPostResult = await UploadPostToFirestore(formedPost);
    if (!addPostResult.ok) {
        errorPopup(addPostResult.message);
        return { ok: false };
    }
    return { ok: true }
}