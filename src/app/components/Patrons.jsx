import { useState, useRef } from "react";
import { patrons } from "@/data/patrons"; // <-- your patrons data
import LoadingSpinner from "./LoadingSpinner";

// Reusable card component
function PatronCard({ patron, onClick, isMobile = false }) {
    return (
        <div
            onClick={() => onClick(patron)}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:scale-[1.02] border border-gray-100 w-full max-w-md mx-auto"
        >
            <div className={isMobile ? "p-6" : "p-8"}>
                {/* Profile Image */}
                <div className="relative mb-6 flex justify-center">
                    <div
                        className={`${isMobile ? "w-28 h-28" : "w-32 h-32 lg:w-36 lg:h-36"
                            } rounded-full overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-1.5 shadow-lg`}
                    >
                        <img
                            src={patron.image}
                            alt={patron.name}
                            className="w-full h-full object-cover rounded-full bg-white"
                        />
                    </div>
                    {/* Decorative ring */}
                    <div
                        className={`absolute inset-0 ${isMobile ? "w-28 h-28" : "w-32 h-32 lg:w-36 lg:h-36"
                            } mx-auto rounded-full border-4 border-amber-200/30 group-hover:border-amber-300/50 transition-colors`}
                    ></div>
                </div>

                {/* Name */}
                <h3
                    className={`${isMobile ? "text-xl" : "text-xl lg:text-2xl"
                        } font-bold text-gray-800 text-center mb-4 group-hover:text-amber-600 transition-colors`}
                >
                    {patron.name}
                </h3>

                {/* Patron Badge */}
                <div className="flex justify-center mb-4">
                    <span
                        className={`${isMobile
                            ? "px-3 py-1 text-xs"
                            : "px-4 py-1.5 text-sm"
                            } bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-semibold rounded-full border border-amber-200`}
                    >
                        Distinguished Patron
                    </span>
                </div>

                {/* Description */}
                <p
                    className={`text-gray-600 ${isMobile ? "text-sm" : "text-sm lg:text-base"
                        } text-center leading-relaxed line-clamp-4`}
                >
                    {patron.description.length > (isMobile ? 140 : 180)
                        ? `${patron.description.substring(
                            0,
                            isMobile ? 140 : 180
                        )}...`
                        : patron.description}
                </p>

                {/* Read More Indicator */}
                <div className="mt-4 text-center">
                    <span className="text-amber-600 text-sm font-medium group-hover:text-amber-700 transition-colors">
                        {isMobile ? "Tap to read more →" : "Click to read more →"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Patrons() {
    const [selectedPatron, setSelectedPatron] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    // Desktop: max index (3 cards visible)
    const maxDesktopIndex = Math.max(0, patrons.length - 3);

    // Mobile: max index (1 card visible)
    const maxMobileIndex = Math.max(0, patrons.length - 1);

    // Navigation
    const nextSlide = () => {
        setCurrentIndex((prev) => {
            const maxIndex =
                window.innerWidth < 768 ? maxMobileIndex : maxDesktopIndex;
            return prev >= maxIndex ? 0 : prev + 1;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => {
            const maxIndex =
                window.innerWidth < 768 ? maxMobileIndex : maxDesktopIndex;
            return prev <= 0 ? maxIndex : prev - 1;
        });
    };

    const goToSlide = (index) => {
        const maxIndex =
            window.innerWidth < 768 ? maxMobileIndex : maxDesktopIndex;
        setCurrentIndex(Math.min(index, maxIndex));
    };

    return (
        <div className="w-full pb-12 px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <p className="text-base md:text-lg text-gray-200 px-4">
                        Click on any card to learn more about our distinguished patrons
                    </p>
                </div>

                {/* Carousel */}
                <div ref={carouselRef} className="relative overflow-hidden">
                    {/* Desktop (3 cards) */}
                    <div className="hidden md:block">
                        {patrons.length <= 3 ? (
                            <div className="flex justify-center ">
                                {patrons.map((patron) => (
                                    <PatronCard
                                        key={patron.patronId}
                                        patron={patron}
                                        onClick={setSelectedPatron}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{
                                    transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                                }}
                            >
                                {patrons.map((patron) => (
                                    <div
                                        key={patron.patronId}
                                        className="w-1/3 flex-shrink-0 px-4"
                                    >
                                        <PatronCard
                                            patron={patron}
                                            onClick={setSelectedPatron}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile (1 card at a time) */}
                    <div className="md:hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out py-2"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                            }}
                        >
                            {patrons.map((patron) => (
                                <div
                                    key={patron.patronId}
                                    className="flex-shrink-0 w-full min-w-full px-4"
                                >
                                    <PatronCard
                                        patron={patron}
                                        onClick={setSelectedPatron}
                                        isMobile
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop navigation (if more than 3) */}
                {patrons.length > 3 && (
                    <div className="flex justify-center items-center mt-8 gap-4">
                        <button
                            onClick={prevSlide}
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 hover:cursor-pointer text-black rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Previous patron"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <div className="flex space-x-2">
                            {Array.from({ length: maxDesktopIndex + 1 }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? "bg-white w-8"
                                        : "bg-white bg-opacity-40 hover:bg-opacity-60"
                                        }`}
                                    aria-label={`Go to position ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 hover:cursor-pointer text-black rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Next patron"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Mobile navigation (if more than 1) */}
                <div className="md:hidden">
                    {patrons.length > 1 && (
                        <div className="flex justify-center items-center mt-8 gap-4">
                            <button
                                onClick={prevSlide}
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 hover:cursor-pointer text-black rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                                aria-label="Previous patron"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            <div className="flex space-x-2">
                                {Array.from({ length: maxMobileIndex + 1 }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? "bg-white w-8"
                                            : "bg-white bg-opacity-40 hover:bg-opacity-60"
                                            }`}
                                        aria-label={`Go to position ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 hover:cursor-pointer text-black rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                                aria-label="Next patron"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {selectedPatron && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedPatron(null)}
                >
                    <div
                        className="bg-white rounded-3xl p-8 md:p-10 max-w-xs sm:max-w-md md:max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedPatron(null)}
                            className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors z-10 text-xl font-light"
                        >
                            ×
                        </button>

                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                            {/* Image */}
                            <div className="flex-shrink-0">
                                <div className="w-40 h-40 md:w-56 md:h-56 rounded-3xl overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-2 shadow-xl">
                                    <img
                                        src={selectedPatron.image}
                                        alt={selectedPatron.name}
                                        className="w-full h-full object-cover rounded-2xl bg-white"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="mb-4">
                                    <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-sm font-semibold rounded-full border border-amber-200">
                                        Distinguished Patron
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                    {selectedPatron.name}
                                </h2>
                                <div className="w-16 md:w-20 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto md:mx-0 mb-6 md:mb-8 rounded-full"></div>
                                <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                                    {selectedPatron.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
