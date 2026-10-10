'use client'
import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Error({ error, reset }) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    function retry() {
        startTransition(() => {
            router.refresh();
            reset();
        });
    }

    return (
        <div className="min-h-screen bg-slate-800">
            <Navbar></Navbar>
            <div className="flex flex-col items-center justify-center gap-6 px-4 py-32 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-200">Something went wrong</h2>
                <p className="max-w-md text-gray-300">
                    We couldn&apos;t load this page right now. Please try again in a moment.
                </p>
                <div className="flex gap-4">
                    <button onClick={retry} className="btn btn-success rounded-full px-6">
                        Try again
                    </button>
                    <Link href="/" className="btn btn-outline rounded-full px-6 text-slate-200">
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    );
}
