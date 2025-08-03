
import Heading from "@/components/global/Heading";
import styles from "./PricingPage.module.css";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PricingPage() {
    const t = useTranslations("pricingPage");

    const planKeys = ["starter", "standard", "intensive", "group", "trial"];

    const featuredPlan = "standard";

    return (
        <section className={styles.pricing}>
            <div className={styles.container}>
                <Heading text={t("heading")} />
                <p className={styles.subtitle}>{t("subtitle")}</p>

                <div className={styles.plansContainer}>
                    {planKeys.map((key, index) => {
                        const plan = t.raw(`plans.${key}`);
                        const isFeatured = key === featuredPlan;

                        return (
                            <div
                                key={index}
                                className={`${styles.planCard} ${
                                    isFeatured ? styles.featured : ""
                                }`}
                            >
                                {isFeatured && (
                                    <div className={styles.featuredBadge}>
                                        {t("mostPopular")}
                                    </div>
                                )}
                                <h2 className={styles.planName}>
                                    {plan.name}
                                </h2>
                                <p className={styles.planAudience}>
                                    {plan.audience}
                                </p>
                                <div className={styles.separationLine}></div>
                                <ul className={styles.featuresList}>
                                    {plan.features.map((feature: string, i: number) => (
                                        <li key={i} className={styles.featureItem}>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.price}>{plan.price}</div>
                                <Link href={"enroll"} className={styles.ctaButton}>
                                    {key === "trial"
                                        ? t("getTrial")
                                        : t("enroll")}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
