'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function Directors({ directors }) {
    const [selectedDirector, setSelectedDirector] = useState(null);

    return (
        <>
            <div className="w-full pb-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 md:mb-12">
                        <p className="text-base md:text-lg text-gray-200 px-4">
                            Click on any card to learn more about our leadership team
                        </p>
                    </div>

                    {/* Desktop Layout - Centered Flex */}
                    <div className="hidden md:flex md:flex-wrap md:justify-center md:items-center gap-6">
                        {directors.map((director) => (
                            <div
                                key={director.id}
                                onClick={() => setSelectedDirector(director)}
                                className="w-full max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105"
                            >
                                <div className="p-6">
                                    {/* Profile Image */}
                                    <div className="relative mb-4">
                                        <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                                            <img
                                                src={director.image}
                                                alt={director.name}
                                                className="w-full h-full object-cover rounded-full bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-lg lg:text-xl font-semibold text-gray-800 text-center mb-3 group-hover:text-blue-600 transition-colors">
                                        {director.name}
                                    </h3>

                                    {/* Truncated Description */}
                                    <p className="text-gray-600 text-sm text-center line-clamp-3">
                                        {director.description.length > 100
                                            ? `${director.description.substring(0, 100)}...`
                                            : director.description
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Layout - Horizontal Scroll */}
                    <div className="md:hidden">
                        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-4 -mx-4 py-4">
                            {directors.map((director) => (
                                <div
                                    key={director.id}
                                    onClick={() => setSelectedDirector(director)}
                                    className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group snap-center transform hover:scale-105"
                                >
                                    <div className="p-6">
                                        {/* Profile Image */}
                                        <div className="relative mb-4">
                                            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                                                <img
                                                    src={director.image}
                                                    alt={director.name}
                                                    className="w-full h-full object-cover rounded-full bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <h3 className="text-lg font-semibold text-gray-800 text-center mb-3 group-hover:text-blue-600 transition-colors">
                                            {director.name}
                                        </h3>

                                        {/* Truncated Description */}
                                        <p className="text-gray-600 text-sm text-center line-clamp-3">
                                            {director.description.length > 80
                                                ? `${director.description.substring(0, 80)}...`
                                                : director.description
                                            }
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Navigation hint */}
                        <div className="text-center mt-4">
                            <p className="text-gray-100 text-sm">← Scroll horizontally to see all directors →</p>
                        </div>
                    </div>
                </div>

                {/* Responsive Modal */}
                {selectedDirector && (
                    <div
                        className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedDirector(null)}
                    >
                        <div
                            className="bg-white rounded-3xl p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedDirector(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors z-10"
                            >
                                ×
                            </button>

                            {/* Modal content */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start ">
                                {/* Director image */}
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-2">
                                        <img
                                            src={selectedDirector.image}
                                            alt={selectedDirector.name}
                                            className="w-full h-full object-cover rounded-xl bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Director info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                        {selectedDirector.name}
                                    </h2>
                                    <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto md:mx-0 mb-4 md:mb-6"></div>
                                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                        {selectedDirector.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}