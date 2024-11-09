import React, { ChangeEvent } from "react";

import AdminInput from "../global/AdminInput";

type Inputs = {
    text: string;
    placeholder: string;
    name: "title" | "description" | "imageAlt";
    type?: string;
    required: boolean;
};
type Props = {
    title: string;
    description: string;
    imageAlt: string;
    handleChange: (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
};
export default function InputsList({
    title,
    description,
    imageAlt,
    handleChange,
}: Props) {
    const container = {
        title,
        description,
        imageAlt,
    };
    const formInputs: Inputs[] = [
        {
            text: "Post Title",
            placeholder: "Post Title",
            name: "title",
            type: "text",
            required: true,
        },
        {
            text: "Post Description",
            placeholder: "Post Description",
            name: "description",
            required: true,
        },
        {
            text: "Thumbnail Alt Text",
            placeholder: "Image Alt Text",
            name: "imageAlt",
            type: "text",
            required: true,
        },
    ];

    return (
        <div>
            {formInputs.map((input) => {
                const { text, placeholder, name, type, required } = input;
                return (
                    <AdminInput
                        text={text}
                        key={name}
                        name={name}
                        placeholder={placeholder}
                        value={container[name]}
                        type={type}
                        required={required}
                        handleChange={handleChange}
                    />
                );
            })}
        </div>
    );
}
