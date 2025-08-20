import Image from "next/image";
import CircularGallery from "../../Animations/CircularGallery/CircularGallery";
import ZainulAabideen from "../../../public/DirectorsImages/ZainulAabideen.png"
import SaudabiValappil from "../../../public/DirectorsImages/SaudabiValappil.png"
import VolunteersCarousel from "./VolunteersCarousel";

export default function Volunteers() {

    const galleryItems = [
        {
            image: ZainulAabideen.src,
            fullName: "Zainul Aabideen"
        },
        {
            image: SaudabiValappil.src,
            fullName: "Saudabi Valappil"
        },
        {
            image: ZainulAabideen.src,
            fullName: "Zainul Aabideen"
        },
        {
            image: SaudabiValappil.src,
            fullName: "Saudabi Valappil"
        }
    ]
    return (

        <div style={{ height: '600px', position: 'relative' }}>
            <VolunteersCarousel volunteers={galleryItems}></VolunteersCarousel>
        </div>
    )
}