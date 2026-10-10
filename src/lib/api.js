export async function getFromApi(path) {
    const res = await fetch(`${process.env.API_URL}${path}`, { cache: "no-store" })

    if (!res.ok) {
        throw new Error(`API Route ${path} failed: ${res.status}`)
    }

    return res.json()
}