import { getUriFromFile } from "@/lib/adminBlog";
import cloudinary from "@/lib/cloudinary";
export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileUri = await getUriFromFile(file)
    try {
        const result = await cloudinary.uploader.upload(fileUri,
            {
                public_id: file.name,
                folder: "blog",
                resource_type: "image",

            }
        );
        return new Response(JSON.stringify({ location: result.secure_url }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.log({ error });
        return new Response(JSON.stringify({ error, ok: false }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}