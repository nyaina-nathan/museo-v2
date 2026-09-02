import type { Metadata } from "next";
import { Hanken_Grotesk, MuseoModerno } from "next/font/google";
import "./globals.css";

const museoModerno = MuseoModerno({
  variable: "--font-museo-moderno",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Museo.mg",
  description: "Ex vintage jersey",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${museoModerno.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.css" 
        integrity="sha512-x9WwyMYBnlXMNQ6kQ/Lyzu1NqIhLQKL5Oq6xByfXuRj7s9CskyCbLv/1IjqzJmXwFXWr0ov6jBV7Qbc0hh9nHg==" 
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}