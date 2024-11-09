import React, { ChangeEvent, useState } from "react";

import styles from "@/styles/admin/components/AdminInput.module.css";

type Props = {
    value: string;
    type?: string;
    name: string;
    text: string;
    handleChange: (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
    placeholder: string;
    required: boolean;
};

export default function AdminInput({
    value,
    type,
    name,
    text,
    handleChange,
    placeholder,
    required,
}: Props) {
    const [isTyped, setIsTyped] = useState(false);
    const isError = isTyped && !value && required;

    const onChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        handleChange(e);
        setIsTyped(true);
    };
    return (
        <label className={styles.adminLabel}>
            {text}
            {type ? (
                <input
                    className={styles.adminInput}
                    type={type}
                    name={name}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            ) : (
                <textarea
                    className={styles.adminInput}
                    name={name}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            )}

            {isError && (
                <span className="errorMessage">{text} is required</span>
            )}
        </label>
    );
}
