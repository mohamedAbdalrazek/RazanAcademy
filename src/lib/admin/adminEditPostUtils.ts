import { Post } from "@/types/admin.types";
import { errorPopup, isObjectValuesEmpty, uploadImageAndGetUrl } from "./adminUtils";

export const editPostInFirestore = async (post: Post, id: string, route: string): Promise<{ ok: boolean, message: string }> => {
    const result = await fetch(`/api/admin/editPost`, {
        method: "POST",
        body: JSON.stringify({ post, id, route }),
        headers: { "Content-Type": "application/json" }
    });
    const data = await result.json() as { ok: boolean, message: string }
    if (!data.ok) {
        console.error(data.message)
    }
    return { ok: data.ok, message: data.message }

}
export const editPost = async (post: Post, imageFile: File | null, id: string, route: string): Promise<{ ok: boolean }> => {
    console.log(post)
    if (isObjectValuesEmpty(post)) {
        errorPopup("Please fill the required data");
        return { ok: false };
    }
    let result;
    if (imageFile) {
        result = await uploadImageAndGetUrl(imageFile);
    }
    if (result && !result.ok) {
        errorPopup(result.error);
        return { ok: false };
    }
    const formedPost = {
        ...post,
        imageUrl: result ? result.imageUrl : post.imageUrl,
    };
    const addPostResult = await editPostInFirestore(formedPost, id, route);
    if (!addPostResult.ok) {
        errorPopup(addPostResult.message);
        return { ok: false };
    }
    return { ok: true }
}