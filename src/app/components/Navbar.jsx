'use client'
import logo from "../../../public/upahaarlogo.png"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import { useRef } from "react";

export default function Navbar({ volunteerRef, AboutUsRef }) {
    const navigate = useRouter()

    return (
        <div className="navbar bg-blue-100 shadow-sm relative z-50">
            <div className="flex-1">
                <Image
                    className=" hover:cursor-pointer"
                    onClick={() => navigate.push('/')}
                    src={logo}
                    height={50}
                />
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal">
                    <li>
                        <details className="relative z-50">
                            <summary className="text-black">Events</summary>
                            <ul className="bg-white rounded-t-none p-2 shadow-lg z-50 absolute">
                                <li onClick={() => navigate.push('/previous-events')}><a className="text-black">Previous events</a></li>
                                <li onClick={() => navigate.push('/upcoming-events')}><a className="text-black">Upcoming events</a></li>
                            </ul>
                        </details>
                    </li>
                    <li onClick={() => navigate.push('/stories')}>
                        <a className="text-black">Our stories</a>
                    </li>
                    <li>
                        <details className="relative z-50">
                            <summary className="text-black">FAQs</summary>
                            <ul className="bg-white rounded-t-none p-2 shadow-lg z-50 absolute">
                                <li onClick={() => navigate.push('/solid-organ-donation-registration-faq')}>
                                    <a className="text-black">Solid organ donor registration FAQ</a>
                                </li>
                                <li onClick={() => navigate.push('/solid-organ-donation-faq')}>
                                    <a className="text-black">Stem cell donation FAQ</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li><a onClick={() => navigate.push('/contact-us')} className="text-black">Contact us</a></li>
                    <li className="pl-5">
                        <Button onClick={() => navigate.push('https://forms.gle/fi1V9WYZQWP8B8Rm6')} className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800">
                            Volunteer Registration
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    )
}