import { uploadImage } from "@/lib/admin/adminServerUtils";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const result = await uploadImage(file)
        if (!result.ok) {
            return new Response(JSON.stringify({
                error: result.error,
                ok: false
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify({ location: result.location, ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    }
    catch (error) {
        return new Response(JSON.stringify({
            error: `An unexpected error occurred. Please try again later.${error}`,
            ok: false
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

}
