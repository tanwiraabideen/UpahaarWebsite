
"use client";

import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import logo from "../../../public/upahaarlogo.png"
import Image from "next/image";


export function FooterComponent() {
    return (
        <Footer container>
            <div className="w-full">
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright href="#" by="Upahaar" year={2025} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FooterIcon href="https://www.facebook.com/UpahaarUK/" icon={BsFacebook} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
