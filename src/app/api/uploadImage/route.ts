import cloudinary from "@/lib/cloudinary";
import { getFileDataUrl } from "@/lib/utils";
export async function POST(request: Request) {
    const data = await request.formData()
    const file = data.get("file")
    console.log({file})
    // try {
    //     const result = await cloudinary.uploader.upload(file,
    //         {
    //             public_id: file.name,
    //             folder:"blog",
    //             resource_type:"image",

    //         }
    //     );
    //     return new Response(JSON.stringify({ url :result.secure_url, ok: true }), {
    //         status: 200,
    //         headers: { "Content-Type": "application/json" },
    //     });

    // } catch (error) {
    //     console.log({ error });
    //     return new Response(JSON.stringify({ error, ok: false }), {
    //         status: 500,
    //         headers: { "Content-Type": "application/json" },
    //     });
    // }
    return new Response(
        JSON.stringify({
            location: "https://upload.wikimedia.org/wikipedia/commons/0/01/Charvet_shirt.jpg",
        }),
        { status: 200 }
    );

}