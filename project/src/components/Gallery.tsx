"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const mediaItems: {
		id: number;
		title: string;
		category: string;
		src: string;
		type: "image" | "video";
		action: "github" | "request" | "view" | "none";
		link?: string;
	}[] = [
		{ id: 1, title: "FdF", category: "42 School Project", src: "/images/fdf.png", type: "image", action: "github", link: "https://github.com/Tisarji/fdf-42cursus" },
		{ id: 2, title: "FdF in Action", category: "Project Demo", src: "/images/fdf3-doing.MOV", type: "video", action: "none" },
		{ id: 3, title: "Class Lecture", category: "Mentoring", src: "/images/lecture-student-about-class.JPG", type: "image", action: "none" },
		{ id: 14, title: "Hackathon Competitor 3", category: "University Hackathon", src: "/images/uni-hackathon-3.JPG", type: "image", action: "none" },
		{ id: 4, title: "Hackathon Staff", category: "Event Management", src: "/images/staff-hackathon-1.jpg", type: "image", action: "none" },
		{ id: 5, title: "TA KMITL", category: "TA & Tutoring", src: "/images/tutor-kmitl.jpg", type: "image", action: "none" },
		{ id: 6, title: "Hackathon Competitor 1", category: "University Hackathon", src: "/images/uni-hackathon-1.JPG", type: "image", action: "none" },
		{ id: 7, title: "Hackathon Competitor 2", category: "University Hackathon", src: "/images/uni-hackathon-2.JPG", type: "image", action: "none" },
		{ id: 8, title: "FdF in Action 2", category: "Project Demo", src: "/images/fdf2-doing.MOV", type: "video", action: "none" },
		{ id: 9, title: "Internal ERP System", category: "Web Application", src: "/images/Internal-erp-system.png", type: "image", action: "request", link: "mailto:jirast.dev@gmail.com?subject=Request%20ERP%20Demo" },
		{ id: 10, title: "Hackathon Vibe", category: "Event Management", src: "/images/staff-hackathon-3.MOV", type: "video", action: "none" },
		{ id: 11, title: "Robotics Class 1", category: "Mentoring", src: "/images/lecture-student-about-robot-1.JPG", type: "image", action: "none" },
		{ id: 12, title: "Hackathon Staff 2", category: "Event Management", src: "/images/staff-hackathon-2.jpg", type: "image", action: "none" },
		{ id: 13, title: "Teaching C", category: "Mentoring", src: "/images/teaching-friend-in-c.JPG", type: "image", action: "none" },
		{ id: 15, title: "Push Swap", category: "42 School Project", src: "/images/push-swap.png", type: "image", action: "github", link: "https://github.com/Tisarji/push-swap-42cursus" },
		{ id: 16, title: "Landing Page Sati 1", category: "Web Design", src: "/images/landing-page-sati-01.png", type: "image", action: "view", link: "https://www.sati.co.th/" },
		{ id: 17, title: "Landing Page Sati 2", category: "Web Design", src: "/images/landing-page-sati-02.png", type: "image", action: "view", link: "https://www.sati.co.th/" },
		{ id: 18, title: "Hackathon Competitor 4", category: "University Hackathon", src: "/images/uni-hackathon-4.JPG", type: "image", action: "none" },
		{ id: 19, title: "Robotics Class 2", category: "Mentoring", src: "/images/lecture-student-about-robot-2.JPG", type: "image", action: "none" }
	];

	const handleItemClick = (item: typeof mediaItems[0]) => {
		if (item.link && item.link !== "#") {
			window.open(item.link, '_blank');
		} else if (item.action === "request" && item.link) {
			window.location.href = item.link;
		}
	};

	return (
		<section id="gallery" className="py-20">
			<div className="w-full px-4 md:px-8">
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Work & Activities Gallery
					</h2>
					<div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white mx-auto"></div>
					<p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
						Visual showcases of some selected projects, design works, and community engagements
					</p>
				</div>

				{/* Masonry Layout */}
				<div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
					{mediaItems.map((item, index) => (
						<div 
							key={item.id}
							className="break-inside-avoid relative group overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
							onClick={() => handleItemClick(item)}
						>
							<div className="w-full h-auto relative bg-black/5 dark:bg-white/5">
								{item.type === 'video' ? (
									<video 
										src={item.src}
										autoPlay 
										loop 
										muted 
										playsInline
										className={`w-full h-auto object-cover transition-all duration-700 ease-in-out ${hoveredIndex === index ? 'scale-110 blur-sm' : 'scale-100'}`}
									/>
								) : (
									<Image 
										src={item.src}
										alt={item.title}
										width={800} // arbitrary high size for preserving detail
										height={800} // arbitrary high size
										className={`w-full h-auto object-cover transition-all duration-700 ease-in-out ${hoveredIndex === index ? 'scale-110 blur-sm' : 'scale-100'}`}
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									/>
								)}
							</div>
							
							{/* Overlay */}
							<div className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ease-in-out ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
								<span className="text-xs font-semibold text-gray-300 tracking-widest uppercase mb-2 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
									{item.category}
								</span>
								<h3 className="text-xl md:text-2xl font-light text-white transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
									{item.title}
								</h3>
								
								{item.action !== "none" && (
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
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
