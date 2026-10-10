import Image from "next/image";
import VolunteersCarousel from "./VolunteersCarousel";

export default function Volunteers({ volunteers }) {

    return (

        <div style={{ height: '600px', position: 'relative' }}>
            <VolunteersCarousel volunteers={volunteers}></VolunteersCarousel>
        </div>
    )
}