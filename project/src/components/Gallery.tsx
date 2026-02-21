"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const galleryItems: {
		title: string;
		category: string;
		images: string[];
		action: "github" | "request" | "view";
		link: string;
	}[] = [
		{
			title: "FdF",
			category: "42 School Project",
			images: ["/images/fdf.png"],
			action: "github",
			link: "https://github.com/Tisarji/fdf-42cursus"
		},
		{
			title: "Push Swap",
			category: "42 School Project",
			images: ["/images/push-swap.png"],
			action: "github",
			link: "https://github.com/Tisarji/push-swap-42cursus"
		},
		{
			title: "Internal ERP System",
			category: "Web Application",
			images: ["/images/Internal-erp-system.png"],
			action: "request",
			link: "mailto:jirast.dev@gmail.com?subject=Request%20ERP%20Demo"
		},
		{
			title: "Landing Page Sati",
			category: "Web Design",
			images: ["/images/landing-page-sati-01.png", "/images/landing-page-sati-02.png"],
			action: "view",
			link: "https://www.sati.co.th/"
		}
	];

	const handleItemClick = (item: typeof galleryItems[0]) => {
		if (item.link && item.link !== "#") {
			window.open(item.link, '_blank');
		} else if (item.action === "request") {
			window.location.href = item.link;
		}
	};

	return (
		<section id="gallery" className="py-20">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Work Gallery
					</h2>
					<div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white mx-auto"></div>
					<p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
						Visual showcases of some selected projects and design works
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{galleryItems.map((item, index) => (
						<div 
							key={index}
							className="relative aspect-video overflow-hidden group cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-500"
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
							onClick={() => handleItemClick(item)}
						>
							{/* Render single or multiple images depending on the projects */}
							<div className="flex w-full h-full relative">
								{item.images.map((imgSrc, imgIndex) => (
									<div key={imgIndex} className="relative flex-1 h-full">
										<Image 
											src={imgSrc}
											alt={`${item.title} - ${imgIndex + 1}`}
											fill
											className={`object-cover transition-all duration-700 ease-in-out ${hoveredIndex === index ? 'scale-110 blur-sm' : 'scale-100'}`}
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
										/>
									</div>
								))}
							</div>
							
							{/* Overlay */}
							<div className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ease-in-out ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
								<span className="text-sm font-medium text-gray-300 tracking-wider uppercase mb-2 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
									{item.category}
								</span>
								<h3 className="text-2xl font-light text-white transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
									{item.title}
								</h3>
								<div className="mt-6 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 flex items-center gap-2">
									<div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors">
										{item.action === "github" && (
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
											</svg>
										)}
										{item.action === "request" && (
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
											</svg>
										)}
										{item.action === "view" && (
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
										)}
									</div>
									<span className="text-white text-sm font-medium">
										{item.action === "github" ? "View Code" : 
										 item.action === "request" ? "Request Demo" : 
										 "View Project"}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
