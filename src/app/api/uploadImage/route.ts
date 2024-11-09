import { getUriFromFile } from "@/lib/adminBlog";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
    try {
        // Step 1: Retrieve the file from the form data
        const formData = await request.formData();
        const file = formData.get("file") as File;

        // Handle case if file is not provided
        if (!file) {
            return new Response(JSON.stringify({
                error: "No file provided. Please attach a file.",
                ok: false
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Step 2: Convert the file to a URI
        let fileUri;
        try {
            fileUri = await getUriFromFile(file);
        } catch (error) {
            console.error("Error converting file to URI:", error);
            return new Response(JSON.stringify({
                error: "Failed to process the file. Please try again.",
                ok: false
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Step 3: Upload the file to Cloudinary
        try {
            const result = await cloudinary.uploader.upload(fileUri, {
                public_id: file.name,
                folder: "blog",
                resource_type: "image",
            });

            // Return success response with Cloudinary URL
            return new Response(JSON.stringify({ location: result.secure_url, ok: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return new Response(JSON.stringify({
                error: "Failed to upload image to Cloudinary. Please check your network or Cloudinary configuration.",
                ok: false
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        // General fallback for any other unexpected errors
        return new Response(JSON.stringify({
            error: "An unexpected error occurred. Please try again later.",
            ok: false
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
