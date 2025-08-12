'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Heading from "./components/Heading";
import organDonationImg from "../../public/FinalMainPhoto.png"
import RedirectButton from "./components/RedirectButton";
import AboutSection from "./components/AboutSection";
import BlurText from "../Animations/BlurText/BlurText";
import LightRays from "../Animations/LightRays/LightRays";

import { useRef } from "react";
import Directors from "./components/Directors";
import { Playfair_Display } from 'next/font/google';
import Volunteering from "./components/Volunteering";
import VolunteerRoles from "./components/VolunteerRoles";
import Volunteers from "./components/Volunteers";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import DarkVeil from "../../Animations/DarkVeil/DarkVeil";
import Particles from "../../Animations/Particles/Particles";

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

export default function Home() {
  const AboutUsRef = useRef()
  const volunteerRef = useRef()

  const navigate = useRouter()

  return (
    <div className="min-h-screen w-full relative">
      <Navbar volunteerRef={volunteerRef} AboutUsRef={AboutUsRef}></Navbar>



      {/* Hero Section */}
      <div className="relative z-0 min-h-screen grid grid-rows-1 grid-cols-2 place-items-center pt-20 bg-gradient-to-br from-[#d4eaff] via-[#a3d8ff] to-[#6bbefb]">
        <div className="grid grid-rows-2 place-items-center">
          <Heading></Heading>
          <div className="flex justify-center mb-15 space-x-15 w-full">
            <RedirectButton></RedirectButton>
            <button onClick={() => {
              AboutUsRef.current?.scrollIntoView({
                behaviour: 'smooth'
              })
            }} className="btn btn-lg btn-outline btn-neutral rounded-full">
              Learn More
            </button>
          </div>
        </div>
        <Image className="mb-9" src={organDonationImg} height={500}></Image>
      </div>
      {/* LightRays as background overlay - only for hero section */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <Particles
          particleColors={['#ffffff', '#000000']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Content Sections */}
      <div className="relative z-10 bg-slate-800">
        <div ref={AboutUsRef}>
          <AboutSection></AboutSection>
        </div>

        <BlurText
          text="Volunteering"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className={`text-5xl ${playfair.className} justify-center pt-16 `}
        />

        <Volunteering ref={volunteerRef}></Volunteering>

        <BlurText
          text="Your roles as a volunteer"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className={`text-4xl ${playfair.className} justify-center `}
        />
        <VolunteerRoles></VolunteerRoles>
        <div className="flex justify-center items-center">
          <Button onClick={() => navigate.push('https://forms.gle/fi1V9WYZQWP8B8Rm6')} className="w-60 text-lg h-14 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:cursor-pointer hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800">
            Register as a volunteer
          </Button>
        </div>




        <div className="flex flex-col space-y-8 mt-20 pb-20">
          <BlurText
            text="Our Trustees"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className={`text-5xl ${playfair.className} justify-center `}
          />
          <Directors></Directors>
          <BlurText
            text="Our Volunteers"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className={`text-5xl ${playfair.className} justify-center `}
          />
          <Volunteers></Volunteers>
        </div>
      </div>
    </div>
  );
}