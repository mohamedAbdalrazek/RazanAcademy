"use client";
import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";

type Props = {
    className: string;
};
export default function TinyEditor({ className }: Props) {
    const [loading] = useState(false);
    const handleChange = (a: string) => {
        console.log({ a });
    };
    return (
        <div className={className}>
            <Editor
                apiKey={process.env.NEXT_PUBLIC_Tiny_API_KEY}
                disabled={loading}
                initialValue={`What's in your mind`}
                init={{
                    plugins: "emoticons| link | preview | image | media",
                    automatic_uploads: true,
                    toolbar_mode: "sliding",
                    file_picker_types: "image",
                    images_upload_url: "http://localhost:3000/api/uploadImage",
                    toolbar:
                        "undo redo |forecolor backcolor| blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |image|media | link | emoticons | preview ",
                }}
                onEditorChange={handleChange}
            />
        </div>
    );
}
