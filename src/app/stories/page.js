'use client'
import BlurText from "../../Animations/BlurText/BlurText";
import { Playfair_Display } from 'next/font/google';
import Navbar from "../components/Navbar";
import AceternityBentoStories from "../components/BentoGrid";

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export default function Stories() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#d4eaff] via-[#a3d8ff] to-[#6bbefb] pb-20">
            <Navbar />

            <div className="pt-10">
                <BlurText
                    text="Our Stories"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className={`text-5xl ${playfair.className} justify-center text-slate-900 mt-10`}
                />
                <p className="text-lg text-gray-600 text-center mt-5 max-w-2xl mx-auto">
                    Upahaar in Action: Lives Touched, Futures Transformed. Click on any story to read more.
                </p>
            </div>

            <div className="mt-16">
                <AceternityBentoStories />
            </div>
        </div>
    );
}