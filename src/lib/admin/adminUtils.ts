
import { Bounce, toast } from "react-toastify";

export const getUriFromFile = async (file: File) => {
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
    return fileUri
}

export const uploadImageAndGetUrl = async (imageFile: File): Promise<{ imageUrl: string, error: string, ok: boolean }> => {
    if (!imageFile) {
        const error = "there's no image, please provide an image"
        console.error(error)
        return { ok: false, imageUrl: "", error }
    }
    const formData = new FormData();
    formData.append("file", imageFile);
    try {
        const result = await fetch(`/api/uploadImage`, {
            method: "POST",
            body: formData,
        });
        const data = await result.json() as { ok: boolean, location: string, error: string };
        if (!data.ok) {
            console.error(data.error)
            return { ok: false, imageUrl: "", error: data.error }
        }
        return { ok: true, imageUrl: data.location, error: "" };
    } catch (error) {
        console.error(error)
        return { ok: false, imageUrl: "", error: "Somthing wrong happend please try again" }
    }
}

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

