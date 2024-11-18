import React, { useState } from "react";

import { Editor } from "@tinymce/tinymce-react";
import { Post } from "@/types/admin.types";

type Props = {
    setPost: React.Dispatch<
        React.SetStateAction<Post>
    >;
    body?:string
};

export default function TinyEditor({ setPost, body }: Props) {
    const [isError, setIsError] = useState(false);
    const handleChange = (a: string) => {
        setIsError(!a);
        setPost((prevPost) => ({
            ...prevPost,
            body: a,
        }));
    };
    return (
        <div>
            <Editor
            id="Razan Tiny editor"
                value={body}
                apiKey={process.env.NEXT_PUBLIC_Tiny_API_KEY}
                init={{
                    
                    plugins: "emoticons| link | preview | image | media",
                    automatic_uploads: true,
                    toolbar_mode: "sliding",
                    file_picker_types: "image",
                    images_upload_url: "http://localhost:3000/api/uploadImage",
                    toolbar:
                        "undo redo |forecolor backcolor| blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | media | link | preview ",
                }}
                onEditorChange={handleChange}
            />
            {isError && (
                <span className="errorMessage">Post Body is required</span>
            )}
        </div>
    );
}
