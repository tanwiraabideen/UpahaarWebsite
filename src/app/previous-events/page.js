import Navbar from "../components/Navbar";
import { PreviousEventsCarousel } from "../components/PreviousEventsCarousel";

export default function Home() {
    return (
        <div>
            <Navbar></Navbar>
            <PreviousEventsCarousel></PreviousEventsCarousel>
        </div>
    )
}