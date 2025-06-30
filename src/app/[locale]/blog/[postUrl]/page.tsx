import React from "react";
import styles from "./BlogPage.module.css";

const BlogPage = () => {
    const postData = {
        src: "/images/mockBackground-one-1.jpg",
        title: "The Importance of Tajweed in Quranic Recitation",
        description:
            "Discover why mastering Tajweed is essential for accurate and beautiful Quranic recitation. Learn how proper pronunciation enhances both the spiritual and linguistic experience of reading the Holy Quran.",
        date: "Jun 24, 2023",
    };

    const postBody = (
        <div className={styles.postContent}>
            <h2>The Art of Quranic Recitation</h2>

            <p>
                Tajweed, the set of rules governing the pronunciation during
                recitation of the Quran, is an essential science for every
                Muslim. It preserves the Quran&apos;s linguistic purity and
                ensures the correct delivery of Allah&apos;s words as revealed
                to Prophet Muhammad (PBUH).
            </p>

            <h3>Understanding Tajweed Fundamentals</h3>

            <p>
                The word &quot;Tajweed&quot; linguistically means
                &quot;proficiency&quot; or &quot;doing something well.&quot; In
                Islamic terms, it refers to the correct recitation of the
                Quranic words by giving each letter its due rights and
                characteristics. The rules of Tajweed were established to
                replicate the way the Prophet (PBUH) recited the Quran.
            </p>

            <div className={styles.highlightBox}>
                <p>
                    Mastering Tajweed is not just about beautiful recitation -
                    it&apos;s about preserving the meaning and message of the
                    Quran by pronouncing each word correctly.
                </p>
            </div>

            <h3>Key Components of Tajweed</h3>

            <ul>
                <li>
                    <strong>Makharij al-Huruf:</strong> The articulation points
                    of Arabic letters
                </li>
                <li>
                    <strong>Sifat al-Huruf:</strong> The characteristics of
                    letters
                </li>
                <li>
                    <strong>Rules of Noon and Meem:</strong> Including idgham,
                    ikhfa, and iqlab
                </li>
                <li>
                    <strong>Rules of Madd:</strong> Proper elongation of vowels
                </li>
                <li>
                    <strong>Waqf and Ibtida:</strong> Rules of pausing and
                    starting
                </li>
            </ul>

            <h3>The Spiritual Dimension</h3>

            <p>
                Beyond technical perfection, Tajweed connects the reciter
                spiritually with the Quran. When we recite with proper Tajweed,
                we honor the divine text and open our hearts to its guidance.
                The Prophet (PBUH) said:{" "}
                <em>
                    &quot;The one who is proficient in the recitation of the
                    Quran will be with the honorable and obedient scribes
                    (angels), and the one who recites the Quran and finds it
                    difficult to recite, doing his best to recite it in the best
                    way possible, will have two rewards.&quot;
                </em>{" "}
                (Bukhari and Muslim)
            </p>

            <h3>Practical Steps to Learn Tajweed</h3>

            <ol>
                <li>
                    Find a qualified teacher who can correct your pronunciation
                </li>
                <li>
                    Start with basic Arabic phonetics and letter articulation
                </li>
                <li>Practice daily, even if it&apos;s just a few verses</li>
                <li>
                    Record your recitation to identify areas for improvement
                </li>
                <li>Join a Quran study circle for motivation and feedback</li>
            </ol>

            <h3>Common Tajweed Mistakes to Avoid</h3>

            <p>
                Many reciters, especially beginners, struggle with similar
                challenges. Some common mistakes include:
            </p>

            <ul>
                <li>Not differentiating between heavy and light letters</li>
                <li>
                    Incorrect pronunciation of the Arabic &quot;ayn&quot; and
                    &quot;ghayn&quot;
                </li>
                <li>Neglecting the rules of nasalization (ghunnah)</li>
                <li>Over-elongating or under-elongating vowels</li>
                <li>Merging letters that should be pronounced separately</li>
            </ul>

            <h3>The Reward of Beautiful Recitation</h3>

            <p>
                Allah says in the Quran:{" "}
                <em>And recite the Quran with measured recitation.&quot;</em>{" "}
                (73:4) The beauty of Tajweed lies not just in the sound but in
                the connection it creates between the reciter and the divine
                words. When we perfect our recitation, we fulfill a religious
                obligation while also experiencing the profound beauty of
                Allah&apos;s final revelation.
            </p>

            <div className={styles.conclusion}>
                <p>
                    Learning Tajweed is a lifelong journey that brings us closer
                    to the Quran. Whether you&apos;re just starting or refining
                    your skills, remember that every effort to improve your
                    recitation is rewarded. The key is consistency, humility,
                    and seeking knowledge from qualified sources.
                </p>
            </div>
        </div>
    );

    return (
        <div className={styles.blogContainer}>
            <article className={styles.blogArticle}>
                <header className={styles.blogHeader}>
                    <div className={styles.imageContainer}>
                        {/* Replace with your Next.js Image component */}
                        <div
                            className={styles.featuredImage}
                            style={{ backgroundImage: `url(${postData.src})` }}
                        />
                    </div>
                    <div className={styles.headerContent}>
                        <span className={styles.postDate}>{postData.date}</span>
                        <h1 className={styles.postTitle}>{postData.title}</h1>
                        <p className={styles.postExcerpt}>
                            {postData.description}
                        </p>
                    </div>
                </header>

                <div className={styles.blogContent}>{postBody}</div>
            </article>
        </div>
    );
};

export default BlogPage;
