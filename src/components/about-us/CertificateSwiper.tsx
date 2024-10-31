"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "@/styles/about-us/CertificateSwiper.css";
import firstImage from "../../../public/images/mockBackground-one-1.jpg";
import secondImage from "../../../public/images/mockBackground-one-2.jpg";
import thirdImage from "../../../public/images/mockBackground-one-3.jpg";

import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

export default function CertificateSwiper() {
    return (
        <div className="certificate">
            <Swiper
                modules={[Pagination, EffectCoverflow, Navigation]} // Ensure Pagination is included here
                effect="coverflow"
                grabCursor
                centeredSlides
                initialSlide={1}
                speed={600}
                preventClicks
                slidesPerView={"auto"}
                navigation = {true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 80,
                    depth: 350,
                    modifier: 1,
                    slideShadows: true,
                }}
                
                pagination={{ clickable: true }} // Enable pagination here
            >
                <SwiperSlide>
                    <Image
                        className="slideImage"
                        src={firstImage}
                        // width={320}
                        // height={480}
                        fill
                        placeholder="blur"
                        alt="Certificate"
                    />
                    <div className="title">
                        <span>Certificate title</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        className="slideImage"
                        src={secondImage}
                        // width={320}
                        // height={480}
                        fill
                        placeholder="blur"
                        alt="Certificate"
                    />
                    <div className="title">
                        <span>Certificate title</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        className="slideImage"
                        fill
                        src={thirdImage}
                        // width={320}
                        // height={480}
                        placeholder="blur"
                        alt="Certificate"
                    />
                    <div className="title">
                        <span>Certificate title</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        className="slideImage"
                        fill
                        src={thirdImage}
                        // width={320}
                        // height={480}
                        placeholder="blur"
                        alt="Certificate"
                    />
                    <div className="title">
                        <span>Certificate title</span>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
