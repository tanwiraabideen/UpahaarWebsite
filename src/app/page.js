'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Heading from "./components/Heading";
import organDonationImg from "../../public/FinalMainPhoto.png"
import RedirectButton from "./components/RedirectButton";
import AboutSection from "./components/AboutSection";
import BlurText from "../Animations/BlurText/BlurText";
import LightRays from "../Animations/LightRays/LightRays";
import StatCard from "./components/StatCard";

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
import Patrons from "./components/Patrons";
import NewHeading from "./components/NewHeading";

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
    <div className="w-full relative">
      <Navbar volunteerRef={volunteerRef} AboutUsRef={AboutUsRef}></Navbar>

      {/* Hero Section */}
      <div className="min-h-fit w-full relative flex flex-col z-0 md:grid md:grid-cols-2 place-items-center pt-10 md:pt-20 md:pb-10 lg:pb-20 lg:pt-30 bg-gradient-to-br from-[#d4eaff] via-[#a3d8ff] to-[#6bbefb]">
        <div className="grid grid-rows-2 place-items-center">
          <Heading></Heading>

          {/* Mobile: Column layout with 3 buttons */}
          <div className="flex md:hidden flex-col items-center space-y-3 w-full px-4">
            <button className="text-sm btn btn-lg btn-success rounded-full w-full max-w-xs">
              Register as a stem cell donor
            </button>
            <button className="text-sm btn btn-lg btn-success rounded-full w-full max-w-xs">
              Register as a solid organ donor
            </button>
            <button onClick={() => {
              AboutUsRef.current?.scrollIntoView({
                behavior: 'smooth'
              })
            }} className="text-sm btn btn-lg btn-outline btn-neutral rounded-full w-full max-w-xs">
              Learn More
            </button>
          </div>

          {/* Desktop: Two row layout */}
          <div className="hidden md:flex md:flex-col md:items-center md:space-y-4 lg:mb-15 w-full px-4">
            {/* First row - Registration buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-8 w-full max-w-4xl justify-center">
              <button className="text-xs md:text-sm lg:text-md xl:text-xl btn btn-sm md:btn-md lg:btn-lg btn-success rounded-full flex-shrink min-w-0 px-2 sm:px-4 lg:px-6 whitespace-nowrap max-w-[45%]">
                <span className="hidden lg:inline">Register as a stem cell donor</span>
                <span className="lg:hidden">Stem cell donation</span>
              </button>
              <button className="text-xs md:text-sm lg:text-md xl:text-xl btn btn-sm md:btn-md lg:btn-lg btn-success rounded-full flex-shrink min-w-0 px-2 sm:px-4 lg:px-6 whitespace-nowrap max-w-[45%]">
                <span className="hidden lg:inline">Register as a solid organ donor</span>
                <span className="lg:hidden">Organ donation</span>
              </button>
            </div>

            {/* Second row - Learn More button */}
            <div className="flex justify-center">
              <button onClick={() => {
                AboutUsRef.current?.scrollIntoView({
                  behavior: 'smooth'
                })
              }} className="text-sm lg:text-xl btn btn-md lg:btn-lg btn-outline btn-neutral rounded-full">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:mb-40 w-auto">
          <Image className="md:h-70 lg:h-86 w-auto" src={organDonationImg}></Image>
        </div>
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
          className={`text-5xl text-slate-300 ${playfair.className} justify-center pt-26 `}
        />

        <Volunteering ref={volunteerRef}></Volunteering>

        <BlurText
          text="Your roles as a volunteer"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className={`text-4xl text-slate-300 ${playfair.className} justify-center `}
        />
        <VolunteerRoles></VolunteerRoles>
        <div className="flex justify-center items-center">
          <Button onClick={() => navigate.push('https://forms.gle/fi1V9WYZQWP8B8Rm6')} className="w-60 text-lg h-14 bg-blue-700 text-white hover:cursor-pointer hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800">
            Register as a volunteer
          </Button>
        </div>

        <div className="flex flex-col space-y-8 mt-20 pb-20">
          <BlurText
            text="Our Patrons"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className={`text-5xl text-slate-300 ${playfair.className} justify-center `}
          />
          <Patrons></Patrons>
          <BlurText
            text="Our Trustees"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className={`text-5xl text-slate-300 ${playfair.className} justify-center `}
          />
          <Directors></Directors>
          <BlurText
            text="Our Volunteers"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className={`text-5xl text-slate-300 ${playfair.className} justify-center `}
          />
          <Volunteers></Volunteers>
        </div>
      </div>
    </div>
  );
}