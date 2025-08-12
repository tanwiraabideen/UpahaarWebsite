'use client'
import { useRouter } from "next/navigation"



export default function ReturnButton() {
    const navigate = useRouter()

    return (<button onClick={() => navigate.push('/stories')} className="btn btn-lg btn-success rounded-full w-fit m-5">Return to stories</button>)
}