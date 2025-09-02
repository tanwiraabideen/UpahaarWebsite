import { Inter } from 'next/font/google';
import "./globals.css";
import { FooterComponent } from './components/Footer';
import { ThemeModeScript } from "flowbite-react";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Upahaar",
  description: "Upahaar"
}

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body>
        {children}
        <FooterComponent></FooterComponent>
      </body>
    </html>
  );
}
