import { Bounce, toast } from "react-toastify";

export const fetchChapters = async () => {
    const response = await fetch(`${process.env.ROOTURL}/api/chapters`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const chapters = await response.json();
    return chapters.formatedChapters;
};


export const errorPopup = (message: string) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}

export const uploadImageAndGetUrl = async (imageFile: File): Promise<{ imageUrl?: string, error?: string }> => {
    if (!imageFile) {
        const error = "there's no image, please provide an image"
        console.error(error)
        return { error }

    }
    const formData = new FormData();
    formData.append("file", imageFile); // Use "file" to match the key in the server function

    try {
        const result = await fetch(`/api/uploadImage`, {
            method: "POST",
            body: formData,
        });
        const data = await result.json() as { ok: boolean, location?: string, error?: string };
        if (!data.ok) {
            console.error(data.error)
            return { error: data.error }
        }

        return { imageUrl: data.location };
    } catch (error) {
        console.error(error)
        return { error: "Somthing wrong happend please try again" }
    }
}

type Post = {
    title: string,
    description: string,
    imageUrl: string,
    imageAlt: string,
    body: string,
}
export const addPost = async (post: Post): Promise<{ ok: boolean, message: string }> => {
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