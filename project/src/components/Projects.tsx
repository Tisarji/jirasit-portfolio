"use client";

import Image from "next/image";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import TerrainIcon from "@mui/icons-material/Terrain";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PsychologyIcon from "@mui/icons-material/Psychology";

type ActionType = "github" | "website" | "email";

type Project = {
	title: string;
	tagline: string;
	plainDescription: string;
	role: string;
	image?: string;
	icon?: React.ReactNode;
	tech: string[];
	highlights?: string[];
	primaryAction?: { type: ActionType; label: string; href: string };
	secondaryAction?: { type: ActionType; label: string; href: string };
};

const professionalProjects: Project[] = [
	{
		title: "Songkran Online (AOT)",
		tagline: "A virtual Thai New Year festival you can join from anywhere",
		plainDescription:
			"A web app I built as a freelance project for Airports of Thailand (AOT) — so travelers and families can celebrate Songkran online. Users pick a character, splash water at picked locations, pay respects with Song Nam Phra, and send New Year blessings to friends. Sign-in with LINE, Google, or Facebook.",
		role: "Freelance · Full-Stack Developer",
		image: "/images/songkran-aot-scene.png",
		tech: ["Next.js 16", "React 19", "Tailwind CSS v4", "Express 5", "PostgreSQL", "Prisma"],
		highlights: [
			"Virtual water play & character customization",
			"Song Nam Phra (digital Buddha blessing)",
			"Blessing & photo sharing (LINE · Facebook)",
			"Social login (LINE · Google · Facebook)",
		],
		primaryAction: {
			type: "email",
			label: "Ask about this project",
			href: "mailto:jirasitkarunwong@gmail.com?subject=Songkran%20Online%20(AOT)%20Inquiry&body=Hi%20Jirasit,%0A%0AI%E2%80%99d%20like%20to%20know%20more%20about%20the%20Songkran%20Online%20project.%0A%0AThanks!",
		},
	},
	{
		title: "Internal ERP System",
		tagline: "Private tool that runs a company from one dashboard",
		plainDescription:
			"An all-in-one web app where a company tracks employees, working hours, KPIs, and system health. Think of it as the control room for daily operations — built end-to-end by me as the sole developer during my internship.",
		role: "Sole Developer · Sati Co., Ltd.",
		image: "/images/Internal-erp-system.png",
		tech: ["Next.js", "NestJS", "PostgreSQL", "AWS", "Ant Design"],
		highlights: ["HR Management", "KPI / OKR tracking", "Clock-in · Clock-out", "System Monitoring"],
		primaryAction: {
			type: "email",
			label: "Request a demo",
			href: "mailto:jirasitkarunwong@gmail.com?subject=ERP%20Demo%20Request&body=Hi%20Jirasit,%0A%0AI%E2%80%99d%20love%20to%20see%20a%20demo%20of%20the%20ERP%20system.%0A%0AThanks!",
		},
	},
	{
		title: "Reserve — Online Booking",
		tagline: "Book a time slot the way you'd book a restaurant",
		plainDescription:
			"A booking platform where users sign in, browse availability on a calendar, and reserve a time — with real-time confirmation. Designed to be flexible enough for any kind of venue or service.",
		role: "Solo Project",
		image: "/images/booking-system-1.JPG",
		tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
		highlights: ["User Authentication", "Calendar View", "Real-time Notifications"],
		primaryAction: {
			type: "github",
			label: "View code",
			href: "https://github.com/Tisarji/Reserve-Project",
		},
	},
	{
		title: "Sati Landing Page",
		tagline: "Public website for a healthcare-AI company",
		plainDescription:
			"The face of Sati Co., Ltd. — showcasing their AI products for hospitals (ChartSum, AI Pre-Audit, AI Claim). I turned a Figma design into a polished, responsive site that looks sharp on both desktop and phone.",
		role: "Developer",
		image: "/images/landing-page-sati-01.png",
		tech: ["Next.js", "MUI", "Figma"],
		highlights: ["Responsive Design", "Pixel-perfect from Figma", "SEO Ready"],
		primaryAction: {
			type: "website",
			label: "Visit website",
			href: "https://www.sati.co.th/",
		},
	},
];

const systemsProjects: Project[] = [
	{
		title: "FdF — 3D Wireframe Viewer",
		tagline: "Turns raw numbers into a rotatable 3D landscape",
		plainDescription:
			"A program written from scratch in C — no game engine, no libraries. It reads a file of terrain heights and renders it as a 3D wireframe you can rotate, zoom, and recolor. Teaches how graphics actually work under the hood.",
		role: "42 School Project",
		icon: <TerrainIcon sx={{ fontSize: 40 }} />,
		tech: ["C", "MiniLibX", "Graphics Math"],
		primaryAction: {
			type: "github",
			label: "View code",
			href: "https://github.com/Tisarji/fdf-42cursus",
		},
	},
	{
		title: "Push Swap — Sorting Puzzle",
		tagline: "Sort any list with just two stacks and a few moves",
		plainDescription:
			"A sorting challenge with a twist: you only get two stacks and a tiny move set. The goal is to finish with as few steps as possible. It's a lesson in thinking efficiently — the same way navigation apps plan shortest routes.",
		role: "42 School Project",
		icon: <SwapHorizIcon sx={{ fontSize: 40 }} />,
		tech: ["C", "Algorithms", "Optimization"],
		primaryAction: {
			type: "github",
			label: "View code",
			href: "https://github.com/Tisarji/push-swap-42cursus",
		},
	},
	{
		title: "Philosopher — Concurrency",
		tagline: "Five philosophers, five forks, no deadlock",
		plainDescription:
			"The classic computer-science puzzle: philosophers share forks while eating and thinking. Solving it teaches how computers juggle many tasks at once without getting stuck — the same logic that lets apps stream video while downloading files.",
		role: "42 School Project",
		icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
		tech: ["C", "Threads", "Mutex"],
		primaryAction: {
			type: "github",
			label: "View code",
			href: "https://github.com/Tisarji/philosopher-42cursus",
		},
	},
];

function ActionIcon({ type }: { type: ActionType }) {
	if (type === "github") return <GitHubIcon sx={{ fontSize: 16 }} />;
	if (type === "website") return <LaunchIcon sx={{ fontSize: 16 }} />;
	return <EmailIcon sx={{ fontSize: 16 }} />;
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
	return (
		<article
			className={`group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 flex flex-col ${
				featured ? "overflow-hidden" : ""
			}`}
		>
			{/* Image or Icon header */}
			{project.image ? (
				<div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
				</div>
			) : (
				<div className="relative h-32 w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-800">
					<div className="text-black dark:text-white opacity-80 group-hover:scale-110 transition-transform duration-500">
						{project.icon}
					</div>
				</div>
			)}

			<div className="p-6 md:p-7 space-y-4 flex-1 flex flex-col">
				<div className="space-y-2">
					<p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-500">
						{project.role}
					</p>
					<h3 className="text-xl md:text-2xl font-medium text-black dark:text-white leading-tight">
						{project.title}
					</h3>
					<p className="text-sm font-medium text-gray-700 dark:text-gray-300 italic">
						{project.tagline}
					</p>
				</div>

				<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
					{project.plainDescription}
				</p>

				{project.highlights && (
					<ul className="space-y-1.5 pt-1">
						{project.highlights.map((h) => (
							<li
								key={h}
								className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
							>
								<span className="mt-1.5 w-1 h-1 bg-black dark:bg-white rounded-full shrink-0" />
								{h}
							</li>
						))}
					</ul>
				)}

				<div className="flex flex-wrap gap-1.5 pt-1">
					{project.tech.map((t) => (
						<span
							key={t}
							className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors rounded-sm"
						>
							{t}
						</span>
					))}
				</div>

				{project.primaryAction && (
					<div className="flex flex-wrap gap-3 pt-3 mt-auto">
						<a
							href={project.primaryAction.href}
							target={project.primaryAction.type === "email" ? undefined : "_blank"}
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
						>
							<ActionIcon type={project.primaryAction.type} />
							{project.primaryAction.label}
						</a>
						{project.secondaryAction && (
							<a
								href={project.secondaryAction.href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors text-sm font-medium"
							>
								<ActionIcon type={project.secondaryAction.type} />
								{project.secondaryAction.label}
							</a>
						)}
					</div>
				)}
			</div>
		</article>
	);
}

export default function Projects() {
	return (
		<section id="projects" className="py-20 md:py-28 px-6 md:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16 space-y-4">
					<p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 font-medium">
						Selected Work
					</p>
					<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Projects
					</h2>
					<div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white mx-auto" />
					<p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
						Real things I've built — each explained in plain language so you
						don't need a tech background to follow along.
					</p>
				</div>

				{/* Professional Work */}
				<div className="mb-20">
					<div className="flex items-center gap-3 mb-8">
						<BusinessCenterIcon sx={{ fontSize: 24 }} className="text-black dark:text-white" />
						<h3 className="text-2xl font-light text-black dark:text-white">
							Professional Work
						</h3>
						<div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
						<span className="text-xs text-gray-500 dark:text-gray-500">
							Production apps & websites
						</span>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{professionalProjects.map((p) => (
							<ProjectCard key={p.title} project={p} featured />
						))}
					</div>
				</div>

				{/* Systems Programming */}
				<div>
					<div className="flex items-center gap-3 mb-8">
						<SchoolOutlinedIcon sx={{ fontSize: 24 }} className="text-black dark:text-white" />
						<h3 className="text-2xl font-light text-black dark:text-white">
							Systems & Algorithms
						</h3>
						<div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
						<span className="text-xs text-gray-500 dark:text-gray-500">
							42 School · low-level C
						</span>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{systemsProjects.map((p) => (
							<ProjectCard key={p.title} project={p} />
						))}
					</div>
				</div>

				<div className="text-center mt-16">
					<a
						href="https://github.com/Tisarji"
						target="_blank"
						rel="noopener noreferrer"
						className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 font-medium tracking-wide"
					>
						<GitHubIcon sx={{ fontSize: 20 }} />
						<span>Explore more on GitHub</span>
						<svg
							className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}

