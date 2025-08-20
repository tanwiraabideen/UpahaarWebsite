'use client'
import BlurText from "../../Animations/BlurText/BlurText"
import { Playfair_Display } from 'next/font/google';
import StemCellDonationFAQ from "../components/StemCellDonationFAQ";
import Navbar from "../components/Navbar";
import { useRef } from "react";

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'], // or just '700' if it's a heading
});

export default function Home() {

    const AboutUsRef = useRef()
    const volunteerRef = useRef()

    return (
        <div>
            <Navbar volunteerRef={volunteerRef} AboutUsRef={AboutUsRef}></Navbar>
            <div className="flex pt-8 flex-col items-center bg-gradient-to-br from-[#d4eaff] via-[#a3d8ff] to-[#6bbefb]">
                <h1 className={`text-center text-3xl ${playfair.className} text-black `}>Frequently asked questions about stem cell donation</h1>
                <StemCellDonationFAQ></StemCellDonationFAQ>
            </div>
        </div>

    )
}