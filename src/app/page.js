import HomeContent from "./components/HomeContent";
import { getFromApi } from "@/lib/api";

export default async function Home() {
  // promise.all sends reqs at same time

  const [patrons, trustees, volunteers] = await Promise.all([
    getFromApi("/members?type=patron"),
    getFromApi("/members?type=trustee"),
    getFromApi("/members?type=volunteer"),
  ]);


  return <HomeContent patrons={patrons} trustees={trustees} volunteers={volunteers} />;
}