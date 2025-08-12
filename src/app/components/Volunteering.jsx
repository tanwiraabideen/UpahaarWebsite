import SpotlightCard from "../../Animations/SpotlightCard/SpotlightCard";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";
import volunteerImg from "../../../public/icons/volunteer.png"
import organDonorImg from "../../../public/icons/organDonor.png"
import VolunteerRoles from "./VolunteerRoles";
export default function Volunteering({ ref }) {
    return (
        <div ref={ref} className="my-24 flex gap-6 items-stretch px-7">

            <Card className="flex-1 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4eaff] via-[#a3d8ff] to-[#6bbefb]">
                <CardHeader className={"text-black"}>
                    <Image className="mb-4" src={volunteerImg} height={75}></Image>
                    <CardTitle className={'text-2xl'}>How to Become a Volunteer</CardTitle>

                </CardHeader>
                <CardContent className={"text-black"}>
                    <p>We deeply value our volunteers. Whether you help raise awareness, attend registration drives, or encourage others to join, your involvement can save lives. We provide all necessary training and a certificate of participation.</p>
                </CardContent>
            </Card>

            <Card className="flex-1 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4eaff] via-[#a3d8ff] to-[#6bbefb]">
                <CardHeader className={"text-black"}>
                    <Image className="mb-4" src={organDonorImg} height={75}></Image>
                    <CardTitle className={'text-2xl'}>How to Organise a Donor Registration Drive</CardTitle>

                </CardHeader>
                <CardContent className={"text-black"}>
                    <p>You can host a donor registration drive in your community or with a local organisation. Once you’ve confirmed local support, contact Upahaar’s national volunteer coordinator.</p>
                    <p className="font-bold">Please do not make financial agreements without prior approval.</p>
                </CardContent>
            </Card>
        </div>
    )
}