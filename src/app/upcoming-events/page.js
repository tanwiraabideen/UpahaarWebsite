import Navbar from "../components/Navbar";
import { UpcomingEventsCarousel } from "../components/UpcomingEventsCarousel";

export default function Home() {
    return (
        <div>
            <Navbar></Navbar>
            <UpcomingEventsCarousel></UpcomingEventsCarousel>
        </div>
    )
}