import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const VolunteersCarousel = ({ volunteers = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const carouselRef = useRef(null);
    const autoPlayRef = useRef(null);

    // Create extended array to ensure at least 3 cards are always visible
    const getExtendedVolunteers = () => {
        if (volunteers.length === 0) return [];
        if (volunteers.length >= 3) return volunteers;

        // If less than 3 volunteers, duplicate them to fill at least 3 slots
        const extended = [...volunteers];
        while (extended.length < 3) {
            extended.push(...volunteers.slice(0, Math.min(volunteers.length, 3 - extended.length)));
        }
        return extended;
    };

    const extendedVolunteers = getExtendedVolunteers();
    const maxIndex = Math.max(0, extendedVolunteers.length - 3);

    // Auto-scroll functionality
    useEffect(() => {
        if (isAutoPlaying && extendedVolunteers.length > 3) {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex >= maxIndex ? 0 : prevIndex + 1
                );
            }, 4000); // Change slide every 4 seconds

            return () => clearInterval(autoPlayRef.current);
        }
    }, [isAutoPlaying, extendedVolunteers.length, maxIndex]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // Manual navigation
    const goToSlide = (index) => {
        setCurrentIndex(Math.min(index, maxIndex));
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 2000);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex <= 0 ? maxIndex : prevIndex - 1
        );
    };

    if (!volunteers || volunteers.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No volunteers to display</p>
            </div>
        );
    }

    return (
        <div className="w-full py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Carousel Container */}
                <div
                    ref={carouselRef}
                    className="relative overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Desktop Layout - Always show 3 cards */}
                    <div className="hidden md:block">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / 3)}%)`
                            }}
                        >
                            {extendedVolunteers.map((volunteer, index) => (
                                <div key={`${volunteer.fullName}-${index}`} className="w-1/3 flex-shrink-0 px-4">
                                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                        <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-xl">
                                            <Image
                                                src={volunteer.image}
                                                alt={volunteer.fullName}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                {volunteer.fullName}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Layout - Single card */}
                    <div className="md:hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`
                            }}
                        >
                            {volunteers.map((volunteer, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-20">
                                    <div className="bg-white rounded-2xl py-2 shadow-lg max-w-sm mx-auto">
                                        <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-xl">
                                            <Image
                                                src={volunteer.image}
                                                alt={volunteer.fullName}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                {volunteer.fullName}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows - Only show if there are more than 3 volunteers */}
                {extendedVolunteers.length > 3 && (
                    <div className="flex justify-center items-center mt-8 gap-4">
                        <button
                            onClick={prevSlide}
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 hover:cursor-pointer text-black rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Previous volunteer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Dot Indicators - Show dots based on navigation positions */}
                        <div className="flex space-x-2">
                            {Array.from({ length: maxIndex + 1 }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-white w-8'
                                        : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                                        }`}
                                    aria-label={`Go to position ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 hover:cursor-pointer text-black rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Next volunteer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Auto-play indicator - Only show if carousel is functional */}
                {extendedVolunteers.length > 3 && (
                    <div className="flex justify-center mt-4">
                        <div className="text-white text-sm opacity-60">
                            {isAutoPlaying ? ' Hover to pause' : ' Auto-play paused'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolunteersCarousel;