'use client';

import { Carousel } from 'flowbite-react';
import Image from 'next/image';
import MainStoryImg from "../../../public/organdonation.jpg";

export function PhotoCarousel() {
    return (
        <div className="h-64 w-full max-w-3xl mx-auto overflow-hidden rounded-lg">
            <Carousel slide={false} className="h-full w-full overflow-hidden">
                {[MainStoryImg, MainStoryImg, MainStoryImg].map((img, index) => (
                    <div
                        key={index}
                        className="relative h-full w-full flex items-center justify-center bg-black"
                    >
                        <Image
                            src={img}
                            alt={`Story image ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 768px) 100vw, 700px"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
