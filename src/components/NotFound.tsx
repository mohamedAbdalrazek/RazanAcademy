import Image from "next/image";
import React from "react";
import notFoundImage from "../../public/images/404.png";
import { Link } from "@/i18n/routing";
import styles from "@/styles/NotFound.module.css"
export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <Image
                className={styles.image}
                src={notFoundImage}
                width={400}
                height={400}
                alt="404 not found"
                placeholder="blur"
            />
            <h1 className={styles.header}>
                Page Not Found
            </h1>
            <h2 className={styles.subHeader}>
                Go Back
            </h2>
            <Link href={"/"} className="small-button">
                Home
            </Link>
        </div>
    );
}
