import cloudinary from "../cloudinary";
import { getUriFromFile } from "./adminUtils";

export const uploadImage = async (file: File) : Promise<{ok:boolean, location:string, error:string}> => {
    if (!file) {
        return {
            error: "No file provided. Please attach a file.",
            ok: false,
            location: ""
        }
    }

    let fileUri;
    try {
        fileUri = await getUriFromFile(file);
    } catch (error) {
        return {
            error: `Failed to process the file. Please try again. ${error}`,
            ok: false,
            location: ""

        };
    }

    try {
        const result = await cloudinary.uploader.upload(fileUri, {
            public_id: file.name,
            folder: "blog",
            resource_type: "image",
        });
        return { location: result.secure_url, ok: true, error: "" };
    } catch (error) {
        return {
            error: `Failed to upload image to Cloudinary. Please check your network or Cloudinary configuration. ${error}`,
            ok: false,
            location: ""
        }
    }



}