import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'], // or just '700' if it's a heading
});
export default function Heading() {
    return (<h1 className={`mt-12 text-8xl md:text-7xl lg:text-8xl font-bold text-slate-900 ml-7 ${playfair.className}`}>
        Live Life, <br />
        <span className="relative inline-block my-8">
            {/* Background highlight */}
            <span className="absolute inset-0 bg-blue-500 -skew-y-3 rounded-md z-[-1] scale-110 "></span>

            {/* Foreground text with working padding */}
            <span className="relative inline-flex items-center  text-slate-900">
                Give Life
            </span>
        </span>
    </h1>


    )
}