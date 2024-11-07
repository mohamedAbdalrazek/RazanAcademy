"use client";
import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";

export default function Add() {
    const [loading, ] = useState(false);
    const handleChange = (a:string)=>{
        console.log({a})
    }
    return (
        <div>
            <Editor
                apiKey={process.env.NEXT_PUBLIC_Tiny_API_KEY}
                disabled={loading}
                
                initialValue={`What's in your mind`}
                init={{
                    
                    plugins: "emoticons| link | preview | image",
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    images_upload_url: "http://localhost:3000/api/uploadImage",
                    toolbar:
                        "undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | link | emoticons | preview |help",
                }}
                onEditorChange={handleChange}
            />
        </div>
    );
}
