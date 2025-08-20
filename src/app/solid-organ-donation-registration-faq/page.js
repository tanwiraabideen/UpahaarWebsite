'use client'
import BlurText from "../../Animations/BlurText/BlurText"
import { Playfair_Display } from 'next/font/google';
import OrganDonationFAQ from "../components/organDonationFAQ.jsx";
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
            <div className="flex flex-col pt-8 w-full justify-center items-center bg-gradient-to-br from-[#d4eaff] via-[#a3d8ff] to-[#6bbefb]">
                <h1 className={`text-center text-3xl ${playfair.className} text-black `}>Frequently asked questions about organ donation registration</h1>
                <OrganDonationFAQ></OrganDonationFAQ>
            </div>
        </div>

    )
}