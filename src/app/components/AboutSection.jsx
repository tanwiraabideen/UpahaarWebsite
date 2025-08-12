'use client'
import BlurText from "../../Animations/BlurText/BlurText";
import Image from "next/image";
import AboutUsImage from "../../../public/AboutUsImage.png"
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'], // or just '700' if it's a heading
});

const handleAnimationComplete = () => {
    console.log('Animation completed!');
};

export default function AboutSection() {
    return (
        <div className="grid grid-cols-2 grid-rows-1 items-start ">
            <Image src={AboutUsImage} className="justify-self-center mt-6"></Image>
            <div className="grid grid-rows-2 place-items-center">
                <BlurText
                    text="About Us"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className={`text-5xl ${playfair.className}`}
                />
                <p className="text-lg">
                    Upahaar is a UK-based charity dedicated to saving lives through blood stem cell and organ donation, with a special focus on supporting the South Asian community.<br />
                    <br />
                    We raise awareness, run registration drives, and provide support to donor families. Through partnerships with organizations like Delete Blood Cancer UK and NHS Blood and Transplant, we help people join the donor registry and understand the life-saving impact of donation.<br />

                </p>
            </div>
        </div>
    )
}