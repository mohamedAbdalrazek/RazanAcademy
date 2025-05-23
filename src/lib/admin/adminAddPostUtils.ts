import { Post } from "@/types/admin.types";
import { errorPopup, isObjectValuesEmpty, uploadImageAndGetUrl } from "./adminUtils";

export const UploadPostToFirestore = async (post: Post, route:string): Promise<{ ok: boolean, message: string }> => {
    const result = await fetch(`/api/admin/addPost`, {
        method: "POST",
        body: JSON.stringify({post, route}),
        headers: { "Content-Type": "application/json" }
    });
    const data = await result.json() as { ok: boolean, message: string }
    if (!data.ok) {
        console.error(data.message)
    }
    return { ok: data.ok, message: data.message }

}




export const addPost = async (post: Post, imageFile: File | null, route:string): Promise<{ ok: boolean }> => {
    if (isObjectValuesEmpty(post)) {
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
    const addPostResult = await UploadPostToFirestore(formedPost, route);
    if (!addPostResult.ok) {
        errorPopup(addPostResult.message);
        return { ok: false };
    }
    return { ok: true }
}


