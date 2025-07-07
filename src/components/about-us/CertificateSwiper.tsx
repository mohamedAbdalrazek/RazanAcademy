"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "@/styles/about-us/CertificateSwiper.css";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

export default function CertificateSwiper() {
    const certificateImages = [
        "/certificates/certificate-1.jpeg",
        "/certificates/certificate-2.jpeg",
        "/certificates/certificate-3.jpeg",
        "/certificates/certificate-4.jpeg",
        "/certificates/certificate-5.jpeg",
        "/certificates/certificate-6.jpeg",
    ];
    return (
        <div className="certificate">
            <Swiper
                modules={[Pagination, EffectCoverflow, Navigation]} // Ensure Pagination is included here
                effect="coverflow"
                grabCursor
                centeredSlides
                initialSlide={2}
                speed={600}
                zoom
                slidesPerView={"auto"}
                navigation={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 80,
                    depth: 350,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }} // Enable pagination here
            >
                {certificateImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            className="slideImage"
                            src={image}
                            width={320}
                            height={480}
                            alt={`Certificate ${index + 1}`}
                        />
                       
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
