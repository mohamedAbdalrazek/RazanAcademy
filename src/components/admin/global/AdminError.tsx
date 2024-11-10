import Image from "next/image";
import React from "react";
import errorImage from "../../../../public/images/admin-404.png";
import styles from "@/styles/admin/components/AdminError.module.css";
export default function AdminError({
    message = "Something went wrong please check your internet and reload the page",
}: {
    message?: string;
}) {
    return (
        <div className={styles.adminError}>
            <Image
                className={styles.errorImage}
                src={errorImage}
                alt="somthing went wrong"
                width={400}
                height={400}
                placeholder="blur"
            />
            <p className={styles.errorMessage}>{message}</p>
        </div>
    );
}
