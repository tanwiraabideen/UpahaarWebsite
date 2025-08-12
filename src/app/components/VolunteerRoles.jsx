import trainingImg from "../../../public/icons/training.png"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import donationImg from "../../../public/icons/organ-donation.png"
import guidelineImg from "../../../public/icons/design-resources.png"
import outreachImg from "../../../public/icons/message.png"
import promotion from "../../../public/icons/promotion.png"

export default function VolunteerRoles() {
    return (
        <div className=" mt-24 flex gap-6 items-stretch px-7 pb-28">
            <Card className="flex-1 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4e4ff] via-[#57d0f8] to-[#48bfda]">
                <CardHeader className={"text-black"}>
                    <Image className="mx-auto pt-6" src={trainingImg} height={75}></Image>
                    <CardTitle className={'text-xl text-center my-8'}>Attend the available training sessions.</CardTitle>
                </CardHeader>
            </Card>
            <Card className="flex-1 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4e4ff] via-[#57d0f8] to-[#48bfda]">
                <CardHeader className={"text-black"}>
                    <Image className="mx-auto pt-6" src={donationImg} height={75}></Image>
                    <CardTitle className={'text-xl text-center my-8'}>Participate in at least two donor registration drives per year.</CardTitle>
                </CardHeader>
            </Card>
            <Card className="flex-1 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4e4ff] via-[#57d0f8] to-[#48bfda]">
                <CardHeader className={"text-black"}>
                    <Image className="mx-auto pt-6" src={guidelineImg} height={75}></Image>
                    <CardTitle className={'text-xl text-center my-8'}>Follow all Upahaar, NHS BT, and Delete Blood Cancer guidelines.</CardTitle>
                </CardHeader>
            </Card>
            <Card className="flex-1 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4e4ff] via-[#57d0f8] to-[#48bfda]">
                <CardHeader className={"text-black"}>
                    <Image className="mx-auto pt-6" src={outreachImg} height={75}></Image>
                    <CardTitle className={'text-xl text-center my-8'}>Reach out to local organisations and help organise new drives.</CardTitle>
                </CardHeader>
            </Card>
            <Card className="flex-1 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#d4e4ff] via-[#57d0f8] to-[#48bfda]">
                <CardHeader className={"text-black"}>
                    <Image className="mx-auto pt-6" src={promotion} height={75}></Image>
                    <CardTitle className={'text-xl text-center my-8'}>Promote both blood stem cell and solid organ donation.</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}