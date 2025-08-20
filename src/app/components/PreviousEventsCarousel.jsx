"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { getPreviousEvents } from "../actions/actions";
import LoadingSpinner from "./LoadingSpinner";

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
    // Split paragraph by double line breaks to create separate paragraphs
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

// Helper function to format date
const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export function PreviousEventsCarousel() {
    const [previousEvents, setPreviousEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPreviousEvents = async () => {
            try {
                const tempPreviousEvents = await getPreviousEvents();
                setPreviousEvents(tempPreviousEvents);
            } catch (err) {
                console.error("Error fetching previous events:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPreviousEvents();
    }, []);

    const sortedData = previousEvents
        .map((previousEvent) => ({
            category: `${previousEvent.eventCity} | ${formatEventDate(previousEvent.eventDate)}`,
            title: previousEvent.eventTitle,
            src: previousEvent.eventImages[0],
            date: previousEvent.eventDate,
            content: (
                <DummyContent
                    heading={previousEvent.eventTitle}
                    paragraph={previousEvent.eventDescription}
                    images={previousEvent.eventImages}
                />
            ),
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const cards = sortedData.map((card, index) => (
        <Card key={`${card.src}-${index}`} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-20 bg-slate-900">
            <h2 className="max-w-7xl text-center md:text-left pl-4 mx-auto text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Upahaar's previous events.
            </h2>
            {loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : previousEvents.length === 0 ? (
                <p className="text-center text-neutral-500 mt-10">
                    No previous events found.
                </p>
            ) : (
                <Carousel items={cards} />
            )}
        </div>
    );
}