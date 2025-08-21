"use client";

import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { getUpcomingEvents } from "../actions/actions";
import LoadingSpinner from "./LoadingSpinner";
import { upcomingEvents } from "@/data/futureEvents";

// Mini carousel inside the card for event images
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-xl mb-6">
            <img
                src={images[currentIndex]}
                alt={`Event image ${currentIndex + 1}`}
                className="w-full h-full object-contain bg-black"
            />
            {/* Left arrow */}
            <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
            >
                ◀
            </button>
            {/* Right arrow */}
            <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
            >
                ▶
            </button>
        </div>
    );
};

const DummyContent = ({ heading, paragraph, images }) => {

    const paragraphs = paragraph ? paragraph.split('\n\n').filter(p => p.trim()) : [];

    return (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            {/* Image carousel at the top */}
            <ImageCarousel images={images} />

            {/* Event heading */}
            <h3 className="font-bold text-neutral-700 dark:text-neutral-200 text-lg md:text-3xl font-sans max-w-3xl mx-auto mb-4">
                {heading}
            </h3>

            {/* Event description with spaced paragraphs */}
            <div className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto space-y-4">
                {paragraphs.length > 0 ? (
                    paragraphs.map((para, index) => (
                        <p key={index} className="leading-relaxed">
                            {para.trim()}
                        </p>
                    ))
                ) : (
                    <p className="leading-relaxed">{paragraph}</p>
                )}
            </div>
        </div>
    );
};

const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export function UpcomingEventsCarousel() {


    const sortedData = upcomingEvents
        .map((upcomingEvent) => ({
            category: `${upcomingEvent.eventCity} | ${formatEventDate(upcomingEvent.eventDate)}`,
            title: upcomingEvent.eventTitle,
            src: upcomingEvent.eventImages[0],
            date: upcomingEvent.eventDate,
            content: (
                <DummyContent
                    heading={upcomingEvent.eventTitle}
                    paragraph={upcomingEvent.eventDescription}
                    images={upcomingEvent.eventImages}
                />
            ),
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const cards = sortedData.map((card, index) => (
        <Card key={`${card.src}-${index}`} card={card} index={index} />
    ));

    return (
        <div className="w-full bg-slate-900 h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-center md:text-left text-3xl md:text-5xl font-bold text-neutral-200 font-sans">
                Upahaar's upcoming events.
            </h2>

            {upcomingEvents.length === 0 ? (
                <p className="text-center text-neutral-500 mt-10">
                    No upcoming events found.
                </p>
            ) : (
                <Carousel items={cards} />
            )}
        </div>
    );
}
