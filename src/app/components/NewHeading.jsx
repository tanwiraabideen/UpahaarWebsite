import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'], // or just '700' if it's a heading
});

export default function NewHeading() {

    return (
        <h1 className={`${playfair.className} text-center text-7xl md:text-7xl lg:text-7xl text-slate-900`}>Live Life, Give Life</h1>
    )
}