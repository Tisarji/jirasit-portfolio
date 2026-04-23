"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LaunchIcon from "@mui/icons-material/Launch";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

type MediaAction = "github" | "request" | "view" | "none";

type MediaItem = {
	id: number;
	title: string;
	category: string;
	src: string;
	type: "image" | "video";
	action: MediaAction;
	link?: string;
};

const mediaItems: MediaItem[] = [
	{ id: 1, title: "FdF", category: "42 School Project", src: "/images/fdf.png", type: "image", action: "github", link: "https://github.com/Tisarji/fdf-42cursus" },
	{ id: 2, title: "FdF in Action", category: "42 School Project", src: "/images/fdf3-doing.MOV", type: "video", action: "none" },
	{ id: 25, title: "Minishell in Action", category: "42 School Project", src: "/images/minishell-doing.MOV", type: "video", action: "none" },
	{ id: 3, title: "Class Lecture", category: "Mentoring", src: "/images/lecture-student-about-class.JPG", type: "image", action: "none" },
	{ id: 24, title: "Class Lecture (DSR)", category: "Mentoring", src: "/images/lecture-dsr.JPG", type: "image", action: "none" },
	{ id: 14, title: "Hackathon Competitor 3", category: "Hackathon", src: "/images/uni-hackathon-3.JPG", type: "image", action: "none" },
	{ id: 4, title: "Hackathon Staff", category: "Hackathon", src: "/images/staff-hackathon-1.jpg", type: "image", action: "none" },
	{ id: 5, title: "TA KMITL", category: "Mentoring", src: "/images/tutor-kmitl.jpg", type: "image", action: "none" },
	{ id: 21, title: "Internal ERP Demo 2", category: "Professional Work", src: "/images/internal-erp-system-2.MOV", type: "video", action: "none" },
	{ id: 22, title: "Booking System 1", category: "Professional Work", src: "/images/booking-system-1.JPG", type: "image", action: "none" },
	{ id: 23, title: "Booking System 2", category: "Professional Work", src: "/images/booking-system-2.JPG", type: "image", action: "none" },
	{ id: 7, title: "Hackathon Competitor 2", category: "Hackathon", src: "/images/uni-hackathon-2.JPG", type: "image", action: "none" },
	{ id: 8, title: "FdF in Action 2", category: "42 School Project", src: "/images/fdf2-doing.MOV", type: "video", action: "none" },
	{
		id: 9,
		title: "Internal ERP System",
		category: "Professional Work",
		src: "/images/Internal-erp-system.png",
		type: "image",
		action: "request",
		link: "mailto:jirasitkarunwong@gmail.com?subject=ERP%20Demo%20Request",
	},
	{ id: 20, title: "Internal ERP Demo 1", category: "Professional Work", src: "/images/internal-erp-system-1.MOV", type: "video", action: "none" },
	{ id: 6, title: "Hackathon Competitor 1", category: "Hackathon", src: "/images/uni-hackathon-1.JPG", type: "image", action: "none" },
	{ id: 10, title: "Hackathon Vibe", category: "Hackathon", src: "/images/staff-hackathon-3.MOV", type: "video", action: "none" },
	{ id: 11, title: "Robotics Class 1", category: "Mentoring", src: "/images/lecture-student-about-robot-1.JPG", type: "image", action: "none" },
	{ id: 12, title: "Hackathon Staff 2", category: "Hackathon", src: "/images/staff-hackathon-2.jpg", type: "image", action: "none" },
	{ id: 13, title: "Teaching C", category: "Mentoring", src: "/images/teaching-friend-in-c.JPG", type: "image", action: "none" },
	{ id: 26, title: "Internship Life 1", category: "Internship", src: "/images/internship-1.JPG", type: "image", action: "none" },
	{ id: 32, title: "Internship Life 6", category: "Internship", src: "/images/internship-6.JPG", type: "image", action: "none" },
	{ id: 28, title: "Internship Life 2", category: "Internship", src: "/images/internship-2.JPG", type: "image", action: "none" },
	{ id: 29, title: "Internship Life 3", category: "Internship", src: "/images/internship-3.JPG", type: "image", action: "none" },
	{ id: 30, title: "Internship Life 4", category: "Internship", src: "/images/internship-4.JPG", type: "image", action: "none" },
	{ id: 31, title: "Internship Life 5", category: "Internship", src: "/images/internship-5.JPG", type: "image", action: "none" },
	{ id: 33, title: "Internship Life 7", category: "Internship", src: "/images/internship-7.JPG", type: "image", action: "none" },
	{ id: 34, title: "Internship Life 8", category: "Internship", src: "/images/internship-8.JPG", type: "image", action: "none" },
	{ id: 27, title: "Internship Outing 1", category: "Internship", src: "/images/internship-outing-1.JPG", type: "image", action: "none" },
	{ id: 35, title: "Internship Outing 2", category: "Internship", src: "/images/internship-outing-2.JPG", type: "image", action: "none" },
	{ id: 36, title: "Internship Outing 3", category: "Internship", src: "/images/internship-outing-3.JPG", type: "image", action: "none" },
	{ id: 37, title: "Internship Outing 4", category: "Internship", src: "/images/internship-outing-4.JPG", type: "image", action: "none" },
	{ id: 15, title: "Push Swap", category: "42 School Project", src: "/images/push-swap.png", type: "image", action: "github", link: "https://github.com/Tisarji/push-swap-42cursus" },
	{ id: 16, title: "Sati Landing Page", category: "Professional Work", src: "/images/landing-page-sati-01.png", type: "image", action: "view", link: "https://www.sati.co.th/" },
	{ id: 17, title: "Sati Landing Page 2", category: "Professional Work", src: "/images/landing-page-sati-02.png", type: "image", action: "view", link: "https://www.sati.co.th/" },
	{
		id: 43,
		title: "Songkran Online — AOT",
		category: "Professional Work",
		src: "/images/songkran-aot-scene.png",
		type: "image",
		action: "request",
		link: "mailto:jirasitkarunwong@gmail.com?subject=Songkran%20Online%20(AOT)%20Inquiry",
	},
	{ id: 18, title: "Hackathon Competitor 4", category: "Hackathon", src: "/images/uni-hackathon-4.JPG", type: "image", action: "none" },
	{ id: 19, title: "Robotics Class 2", category: "Mentoring", src: "/images/lecture-student-about-robot-2.JPG", type: "image", action: "none" },
	{ id: 39, title: "Robotics Class 3", category: "Mentoring", src: "/images/lecture-student-about-robot-3.JPG", type: "image", action: "none" },
	{ id: 40, title: "Robotics Class 4", category: "Mentoring", src: "/images/lecture-student-about-robot-4.JPG", type: "image", action: "none" },
	{ id: 41, title: "Robotics Class 5", category: "Mentoring", src: "/images/lecture-student-about-robot-5.JPG", type: "image", action: "none" },
	{ id: 42, title: "Activities Video", category: "Hackathon", src: "/images/video_591131406516879706-eln87HBG.MP4", type: "video", action: "none" },
];

const categories = [
	"All",
	"Professional Work",
	"42 School Project",
	"Hackathon",
	"Mentoring",
	"Internship",
] as const;

type Category = (typeof categories)[number];

function ActionBadge({ action }: { action: MediaAction }) {
	if (action === "none") return null;
	const icon =
		action === "github" ? (
			<GitHubIcon sx={{ fontSize: 14 }} />
		) : action === "request" ? (
			<EmailIcon sx={{ fontSize: 14 }} />
		) : (
			<LaunchIcon sx={{ fontSize: 14 }} />
		);
	const label =
		action === "github" ? "View code" : action === "request" ? "Request demo" : "Visit site";
	return (
		<div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-full shadow-lg">
			{icon}
			{label}
		</div>
	);
}

export default function Gallery() {
	const [activeCategory, setActiveCategory] = useState<Category>("All");
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const filteredItems = useMemo(
		() =>
			activeCategory === "All"
				? mediaItems
				: mediaItems.filter((i) => i.category === activeCategory),
		[activeCategory]
	);

	const handleItemClick = (item: MediaItem) => {
		if (item.link && item.action !== "none") {
			if (item.action === "request") window.location.href = item.link;
			else window.open(item.link, "_blank", "noopener,noreferrer");
		}
	};

	const categoryCount = (cat: Category) =>
		cat === "All" ? mediaItems.length : mediaItems.filter((i) => i.category === cat).length;

	return (
		<section id="gallery" className="py-20 md:py-28 px-6 md:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12 space-y-4">
					<p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 font-medium">
						Moments & Work
					</p>
					<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Gallery
					</h2>
					<div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white mx-auto" />
					<p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
						A visual tour of the projects, events, and people behind the code.
					</p>
				</div>

				{/* Category filters */}
				<div className="flex flex-wrap justify-center gap-2 mb-10">
					{categories.map((cat) => {
						const isActive = activeCategory === cat;
						return (
							<button
								key={cat}
								onClick={() => setActiveCategory(cat)}
								className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
									isActive
										? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md"
										: "bg-transparent text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white"
								}`}
							>
								<span>{cat}</span>
								<span
									className={`text-xs ${
										isActive
											? "text-white/70 dark:text-black/70"
											: "text-gray-400 dark:text-gray-600"
									}`}
								>
									{categoryCount(cat)}
								</span>
							</button>
						);
					})}
				</div>

				{/* Masonry grid */}
				<div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
					{filteredItems.map((item, index) => {
						const isHovered = hoveredIndex === index;
						const isClickable = item.action !== "none";
						return (
							<div
								key={item.id}
								className={`break-inside-avoid mb-4 relative group overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 shadow-sm hover:shadow-2xl transition-all duration-500 ${
									isClickable ? "cursor-pointer" : "cursor-default"
								}`}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
								onClick={() => handleItemClick(item)}
							>
								<div className="relative bg-black/5 dark:bg-white/5">
									{item.type === "video" ? (
										<>
											<video
												src={item.src}
												autoPlay
												loop
												muted
												playsInline
												className={`w-full h-auto object-cover transition-all duration-700 ${
													isHovered ? "scale-105 blur-sm" : "scale-100"
												}`}
											/>
											<div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white pointer-events-none">
												<PlayCircleOutlineIcon sx={{ fontSize: 18 }} />
											</div>
										</>
									) : (
										<Image
											src={item.src}
											alt={item.title}
											width={800}
											height={800}
											className={`w-full h-auto object-cover transition-all duration-700 ${
												isHovered ? "scale-105 blur-sm" : "scale-100"
											}`}
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
										/>
									)}
								</div>

								{/* Overlay on hover */}
								<div
									className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 flex flex-col justify-end p-5 transition-opacity duration-500 ${
										isHovered ? "opacity-100" : "opacity-0"
									}`}
								>
									<span className="text-[11px] font-semibold text-gray-300 tracking-widest uppercase mb-1.5">
										{item.category}
									</span>
									<h3 className="text-lg md:text-xl font-medium text-white mb-3 leading-tight">
										{item.title}
									</h3>
									{isClickable && <ActionBadge action={item.action} />}
								</div>
							</div>
						);
					})}
				</div>

				{filteredItems.length === 0 && (
					<p className="text-center text-gray-500 dark:text-gray-500 mt-12">
						No items in this category yet.
					</p>
				)}
			</div>
		</section>
	);
}
