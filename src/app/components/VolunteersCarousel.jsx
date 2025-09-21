import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const VolunteersCarousel = ({ volunteers = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const carouselRef = useRef(null);
    const autoPlayRef = useRef(null);

    // Check if mobile on component mount and window resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const maxIndex = isMobile ? Math.max(0, volunteers.length - 1) : Math.max(0, volunteers.length - 3);

    // Auto-scroll functionality
    useEffect(() => {
        const shouldAutoPlay = isMobile ? volunteers.length > 1 : volunteers.length > 3;

        if (isAutoPlaying && shouldAutoPlay) {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex >= maxIndex ? 0 : prevIndex + 1
                );
            }, 4000); // Change slide every 4 seconds

            return () => clearInterval(autoPlayRef.current);
        }
    }, [isAutoPlaying, volunteers.length, maxIndex, isMobile]);

    // Reset current index when switching between mobile/desktop
    useEffect(() => {
        setCurrentIndex(0);
    }, [isMobile]);

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

    const shouldShowNavigation = isMobile ? volunteers.length > 1 : volunteers.length > 3;

    return (
        <div className="w-full px-4">
            <div className="max-w-7xl mx-auto">
                {/* Carousel Container */}
                <div
                    ref={carouselRef}
                    className="relative overflow-hidden py-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                        <div
                            className={`flex transition-transform duration-500 ease-out ${volunteers.length === 1 ? "justify-center" : ""
                                }`}
                            style={{
                                transform:
                                    volunteers.length > 1
                                        ? `translateX(-${currentIndex * (100 / 3)}%)`
                                        : "none",
                            }}
                        >
                            {volunteers.map((volunteer, index) => (
                                <div
                                    key={`${volunteer.fullName}-${index}`}
                                    className={`${volunteers.length === 1 ? "w-1/3" : "w-1/3"
                                        } flex-shrink-0 px-4 py-2`}
                                >
                                    <div
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105 mx-auto max-w-xs"
                                        onClick={() => setSelectedVolunteer(volunteer)}
                                    >
                                        <div className="p-6">
                                            {/* Profile Image */}
                                            <div className="relative mb-4">
                                                <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                                                    <Image
                                                        src={volunteer.image}
                                                        alt={volunteer.fullName}
                                                        width={96}
                                                        height={96}
                                                        className="w-full h-full object-cover rounded-full bg-white"
                                                    />
                                                </div>
                                            </div>

                                            {/* Name */}
                                            <h3 className="text-lg lg:text-xl font-semibold text-gray-800 text-center mb-3 group-hover:text-blue-600 transition-colors">
                                                {volunteer.fullName}
                                            </h3>

                                            {/* Click for description */}
                                            <p className="text-gray-600 text-sm text-center">
                                                Click for description
                                            </p>
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
                                <div key={index} className="w-full flex-shrink-0 px-8">
                                    <div
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105 max-w-xs mx-auto"
                                        onClick={() => setSelectedVolunteer(volunteer)}
                                    >
                                        <div className="p-6">
                                            {/* Profile Image */}
                                            <div className="relative mb-4">
                                                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                                                    <Image
                                                        src={volunteer.image}
                                                        alt={volunteer.fullName}
                                                        width={64}
                                                        height={64}
                                                        className="w-full h-full object-cover rounded-full bg-white"
                                                    />
                                                </div>
                                            </div>

                                            {/* Name */}
                                            <h3 className="text-lg font-semibold text-gray-800 text-center mb-3 group-hover:text-blue-600 transition-colors">
                                                {volunteer.fullName}
                                            </h3>

                                            {/* Click for description */}
                                            <p className="text-gray-600 text-sm text-center">
                                                Click for description
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                {shouldShowNavigation && (
                    <div className="flex justify-center items-center mt-8 gap-4">
                        <button
                            onClick={prevSlide}
                            className="bg-slate-400 bg-opacity-20 hover:bg-opacity-30 hover:cursor-pointer text-black rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Previous volunteer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Dot Indicators */}
                        <div className="flex space-x-2">
                            {Array.from({ length: maxIndex + 1 }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-slate-400 w-8'
                                        : 'bg-slate-400 bg-opacity-40 hover:bg-opacity-60'
                                        }`}
                                    aria-label={`Go to position ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="bg-slate-400 bg-opacity-20 hover:bg-opacity-30 hover:cursor-pointer text-black rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Next volunteer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Auto-play indicator */}
                {shouldShowNavigation && (
                    <div className="flex justify-center mt-4">
                        <div className="text-white text-sm opacity-60">
                            {isAutoPlaying ? ' Hover to pause' : ' Auto-play paused'}
                        </div>
                    </div>
                )}

                {/* Responsive Modal */}
                {selectedVolunteer && (
                    <div
                        className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedVolunteer(null)}
                    >
                        <div
                            className="bg-white rounded-3xl p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedVolunteer(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors z-10"
                            >
                                ×
                            </button>

                            {/* Modal content */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start ">
                                {/* Volunteer image */}
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-2">
                                        <Image
                                            src={selectedVolunteer.image}
                                            alt={selectedVolunteer.fullName}
                                            width={192}
                                            height={192}
                                            className="w-full h-full object-cover rounded-xl bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Volunteer info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                        {selectedVolunteer.fullName}
                                    </h2>
                                    <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto md:mx-0 mb-4 md:mb-6"></div>
                                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                        {selectedVolunteer.description || 'Thank you for being part of our volunteer team!'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolunteersCarousel;