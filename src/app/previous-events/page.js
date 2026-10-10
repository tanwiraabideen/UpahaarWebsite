import Navbar from "../components/Navbar";
import { PreviousEventsCarousel } from "../components/PreviousEventsCarousel";
import { getFromApi } from "@/lib/api";

export default async function Home() {
    const events = await getFromApi("/events?when=past")

    return (
        <div>
            <Navbar></Navbar>
            <PreviousEventsCarousel previousEvents={events}></PreviousEventsCarousel>
        </div>
    )
}