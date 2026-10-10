'use client'
import { useEffect, useState } from 'react';
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { BeatLoader } from "react-spinners"
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner.jsx';

const AceternityBentoStories = ({ stories }) => {

    const [expandedStory, setExpandedStory] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);




    const openStory = (story, index) => {
        setExpandedStory({ ...story, index });
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeStory = () => {
        setExpandedStory(null);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'unset';
    };

    const nextImage = () => {
        if (expandedStory && currentImageIndex < expandedStory.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    // Create items for BentoGrid with click handlers
    const bentoItems = stories.map((story, index) => ({
        title: story.title,
        description: story.description,
        header: (
            <div
                className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden cursor-pointer group-hover:scale-105 transition-transform duration-300"
                onClick={() => openStory(story, index)}
            >
                {story.images && story.images[0] && (
                    <Image
                        src={story.images[0]}
                        alt={story.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={index === 0}
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        ),
        className: getItemClassName(index),
        story: story,
        index: index
    }));

    function getItemClassName(index) {
        // Define different sizes for variety like the reference image
        const classNames = [
            "md:col-span-1 md:row-span-1", // Small card
            "md:col-span-1 md:row-span-1", // Small card
            "md:col-span-1 md:row-span-1", // Small card
            "md:col-span-2 md:row-span-2", // Large card (2x2)
            "md:col-span-1 md:row-span-2", // Tall card
            "md:col-span-2 md:row-span-1", // Wide card
            "md:col-span-1 md:row-span-1", // Small card
        ];
        return classNames[index % classNames.length];
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[18rem]">
                {bentoItems.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => openStory(item.story, item.index)}
                        className="cursor-pointer hover:shadow-xl transition-all duration-300 group"
                    >
                        <BentoGridItem
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            className={`${item.className} h-70 group-hover:scale-[1.02] transition-transform duration-300`}
                        />
                    </div>
                ))}
            </BentoGrid>

            {/* Expanded Story Modal */}
            {expandedStory && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeStory}
                >
                    <div
                        className="bg-white dark:bg-neutral-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-700 p-6 flex justify-between items-center rounded-t-2xl z-10">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-8">
                                {expandedStory.title}
                            </h2>
                            <button
                                onClick={closeStory}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors flex-shrink-0"
                            >
                                <X size={24} className="text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Image Carousel */}
                            {expandedStory.images && expandedStory.images.length > 0 && (
                                <div className="relative mb-6">
                                    <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gray-100 dark:bg-neutral-800">
                                        <Image
                                            src={expandedStory.images[currentImageIndex]}
                                            alt={`${expandedStory.title} - Image ${currentImageIndex + 1}`}
                                            fill
                                            className="object-cover"
                                        />

                                        {/* Image Navigation */}
                                        {expandedStory.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    disabled={currentImageIndex === 0}
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-2 transition-all"
                                                >
                                                    <ChevronLeft size={20} color='black' />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    disabled={currentImageIndex === expandedStory.images.length - 1}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-2 transition-all"
                                                >
                                                    <ChevronRight size={20} color='black' />
                                                </button>
                                            </>
                                        )}

                                        {/* Image Counter */}
                                        {expandedStory.images.length > 1 && (
                                            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                                {currentImageIndex + 1} / {expandedStory.images.length}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Story Content */}
                            <div className="prose dark:prose-invert max-w-none">
                                {expandedStory.description && (
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 font-medium">
                                        {expandedStory.description}
                                    </p>
                                )}
                                <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                                    {expandedStory.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AceternityBentoStories;