import { getFromApi } from "@/lib/api";
import Navbar from "../components/Navbar";
import { UpcomingEventsCarousel } from "../components/UpcomingEventsCarousel";

export default async function Home() {
    const events = await getFromApi('/events?when=upcoming')

    return (
        <div>
            <Navbar></Navbar>
            <UpcomingEventsCarousel upcomingEvents={events}></UpcomingEventsCarousel>
        </div>
    )
}