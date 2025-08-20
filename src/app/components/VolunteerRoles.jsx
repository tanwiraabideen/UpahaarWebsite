import { useState } from 'react';
import trainingImg from "../../../public/icons/training.png"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import donationImg from "../../../public/icons/organ-donation.png"
import guidelineImg from "../../../public/icons/design-resources.png"
import outreachImg from "../../../public/icons/message.png"
import promotion from "../../../public/icons/promotion.png"

export default function VolunteerRoles() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const roles = [
        {
            image: trainingImg,
            title: "Attend the available training sessions."
        },
        {
            image: donationImg,
            title: "Participate in at least two donor registration drives per year."
        },
        {
            image: guidelineImg,
            title: "Follow all Upahaar, NHS BT, and Delete Blood Cancer guidelines."
        },
        {
            image: outreachImg,
            title: "Reach out to local organisations and help organise new drives."
        },
        {
            image: promotion,
            title: "Promote both blood stem cell and solid organ donation."
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? roles.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="mt-24 px-7 pb-28">
            {/* Desktop Layout - All cards in a row */}
            <div className="hidden lg:flex gap-6 items-stretch">
                {roles.map((role, index) => (
                    <Card key={index} className="flex-1 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4e4ff] via-[#57d0f8] to-[#48bfda]">
                        <CardHeader className="text-black">
                            <Image className="mx-auto pt-6" src={role.image} height={75} alt="" />
                            <CardTitle className="text-xl text-center my-8">{role.title}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            {/* Tablet Layout - 2x3 Grid */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
                {roles.map((role, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4e4ff] via-[#57d0f8] to-[#48bfda]">
                        <CardHeader className="text-black">
                            <Image className="mx-auto pt-6" src={role.image} height={75} alt="" />
                            <CardTitle className="text-lg text-center my-6">{role.title}</CardTitle>
                        </CardHeader>
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
                        {roles.map((role, index) => (
                            <div key={index} className="w-full flex-shrink-0 px-2">
                                <Card className="w-full hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4e4ff] via-[#57d0f8] to-[#48bfda]">
                                    <CardHeader className="text-black">
                                        <Image className="mx-auto pt-6" src={role.image} height={65} alt="" />
                                        <CardTitle className="text-lg text-center my-6">{role.title}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-center space-x-4 items-center mt-6">
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
                        {roles.map((_, index) => (
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