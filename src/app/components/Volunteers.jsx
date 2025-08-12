import Image from "next/image";
import CircularGallery from "../../Animations/CircularGallery/CircularGallery";
import ZainulAabideen from "../../../public/DirectorsImages/ZainulAabideen.png"
import SaudabiValappil from "../../../public/DirectorsImages/SaudabiValappil.png"

export default function Volunteers() {

    const galleryItems = [
        {
            image: ZainulAabideen.src,
            text: "Zainul Aabideen"
        },
        {
            image: SaudabiValappil.src,
            text: "Saudabi Valappil"
        },
        {
            image: ZainulAabideen.src,
            text: "Zainul Aabideen"
        },
        {
            image: SaudabiValappil.src,
            text: "Saudabi Valappil"
        }
    ]
    return (

        <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery items={galleryItems} bend={1} textColor="#ffffff" borderRadius={0.05} scrollEase={0.05} scrollSpeed={0.35} />
        </div>
    )
}