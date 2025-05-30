import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Jirasit Karunwong | Portfolio",
	description: "Minimal portfolio showcasing projects and skills",
	icons: {
		icon: "/images/icon.png",
		shortcut: "/images/icon.png",
		apple: "/images/icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 font-sans leading-relaxed overflow-x-hidden`}>
				{children}
			</body>
		</html>
	);
}
