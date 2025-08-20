import { useState } from 'react';
import SpotlightCard from "../../Animations/SpotlightCard/SpotlightCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";
import volunteerImg from "../../../public/icons/volunteer.png"
import organDonorImg from "../../../public/icons/organDonor.png"
import VolunteerRoles from "./VolunteerRoles";

export default function Volunteering({ ref }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const cards = [
        {
            image: volunteerImg,
            title: "How to Become a Volunteer",
            content: (
                <>
                    <p>We deeply value our volunteers. Whether you help raise awareness, attend registration drives, or encourage others to join, your involvement can save lives. We provide all necessary training and a certificate of participation.</p>
                </>
            )
        },
        {
            image: organDonorImg,
            title: "How to Organise a Donor Registration Drive",
            content: (
                <>
                    <p>You can host a donor registration drive in your community or with a local organisation. Once you've confirmed local support, contact Upahaar's national volunteer coordinator.</p>
                    <p className="font-bold">Please do not make financial agreements without prior approval.</p>
                </>
            )
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div ref={ref} className="my-24 px-7">
            {/* Desktop Layout - Side by side cards */}
            <div className="hidden md:flex gap-6 items-stretch">
                {cards.map((card, index) => (
                    <Card key={index} className="flex-1 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4eaff] via-[#a3d8ff] to-[#6bbefb]">
                        <CardHeader className="text-black">
                            <Image className="mb-4" src={card.image} height={75} alt="" />
                            <CardTitle className="text-2xl">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-black">
                            {card.content}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Mobile Carousel Layout */}
            <div className="md:hidden">
                {/* Carousel Container */}
                <div className="relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {cards.map((card, index) => (
                            <div key={index} className="w-full flex-shrink-0 px-2">
                                <Card className="h-90 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4eaff] via-[#a3d8ff] to-[#6bbefb]">
                                    <CardHeader className="text-black">
                                        <Image className="mb-4" src={card.image} height={75} alt="" />
                                        <CardTitle className="text-xl">{card.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-black text-sm">
                                        {card.content}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-center space-x-4 items-center mt-4">
                    <button
                        onClick={prevSlide}
                        className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex space-x-2">
                        {cards.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                                    ? 'bg-blue-500 w-6'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}