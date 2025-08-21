import Image from "next/image";
import { volunteers } from "@/data/volunteers";
import VolunteersCarousel from "./VolunteersCarousel";

export default function Volunteers() {

    return (

        <div style={{ height: '600px', position: 'relative' }}>
            <VolunteersCarousel volunteers={volunteers}></VolunteersCarousel>
        </div>
    )
}