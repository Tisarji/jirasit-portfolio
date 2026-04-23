"use client";

import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PublicIcon from "@mui/icons-material/Public";

const calculateDuration = (startYear: number, startMonth: number): string => {
	const now = new Date();
	const start = new Date(startYear, startMonth - 1);
	const diffMonths =
		(now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
	return `${diffMonths} month${diffMonths !== 1 ? "s" : ""}`;
};

type Involvement = {
	name: string;
	summary: string;
	plainDescription: string;
	role: string;
	methodology: string;
	tech: string[];
	icon: React.ReactNode;
	action?: { label: string; href: string; type: "website" | "email" };
};

export default function Career() {
	const internshipDuration = calculateDuration(2025, 6);

	const involvements: Involvement[] = [
		{
			name: "Internal ERP System",
			summary: "The control panel for company operations",
			plainDescription:
				"A private web app where the company manages employees, tracks working hours, sets goals (KPIs), and monitors system health — all from one dashboard. I designed and built it end-to-end as the sole developer.",
			role: "Sole Developer",
			methodology: "Waterfall",
			tech: ["Next.js", "NestJS", "PostgreSQL", "AWS", "Ant Design"],
			icon: <DashboardIcon sx={{ fontSize: 28 }} />,
			action: {
				type: "email",
				label: "Request a demo",
				href: "mailto:jirasitkarunwong@gmail.com?subject=ERP%20Demo%20Request&body=Hi%20Jirasit,%0A%0AI%E2%80%99d%20love%20to%20see%20a%20demo%20of%20the%20ERP%20system.%0A%0AThanks!",
			},
		},
		{
			name: "Discharge Summary",
			summary: "Helping hospitals write patient reports faster",
			plainDescription:
				"A medical platform that streamlines the paperwork doctors write when a patient is discharged from the hospital. I joined as a team member — reviewing code, fixing bugs, and shipping new features alongside senior engineers.",
			role: "Team Member",
			methodology: "Agile Scrum",
			tech: ["NestJS", "React", "PostgreSQL", "Python", "MUI"],
			icon: <MedicalServicesIcon sx={{ fontSize: 28 }} />,
		},
		{
			name: "Company Landing Page",
			summary: "The public website visitors see first",
			plainDescription:
				"Sati's public-facing marketing site — showcasing their AI healthcare products. I translated the Figma design into a responsive, polished site that works seamlessly on any screen size.",
			role: "Developer",
			methodology: "Agile",
			tech: ["Next.js", "MUI", "Figma"],
			icon: <PublicIcon sx={{ fontSize: 28 }} />,
			action: {
				type: "website",
				label: "Visit website",
				href: "https://www.sati.co.th/",
			},
		},
	];

	const skills = ["Full-Stack", "System Design", "Database Design", "ERP", "Project Management"];

	const universityCoursework = [
		{
			title: "Database Systems",
			description:
				"Designed and managed databases using Oracle — wrote complex queries and optimized performance.",
			tech: ["Oracle", "SQL", "PL/SQL"],
		},
		{
			title: "Reserve Book Project",
			description:
				"An online reservation system with user accounts and calendar booking — like OpenTable for any venue.",
			tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
			github: "https://github.com/Tisarji/Reserve-Project",
		},
	];

	const bangkokCourses = [
		{
			title: "Operating Systems Coursework",
			description:
				"Intensive C programming projects — writing the low-level code that runs beneath every app: memory, performance, safety.",
		},
		{
			title: "Peer-to-Peer Code Defense",
			description:
				"Students review each other's code face-to-face. Sharpens both technical rigor and communication skills.",
		},
		{
			title: "TA / Tutor — Web Dev (KMITL)",
			description: "Guided students in responsive design and JavaScript fundamentals.",
		},
		{
			title: "Hackathon Staff",
			description: "Technical support and event coordination at university hackathons.",
		},
	];

	return (
		<section id="career" className="py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute top-10 right-1/4 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl" />
				<div className="absolute bottom-10 left-1/4 w-48 h-48 bg-black/3 dark:bg-white/3 rounded-full blur-3xl" />
			</div>

			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16 space-y-4">
					<p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 font-medium">
						Where I've been
					</p>
					<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Experience
					</h2>
					<div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white mx-auto" />
					<p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
						My path through real work and rigorous schooling.
					</p>
				</div>

				{/* Experience */}
				<div className="mb-24">
					<div className="flex items-center gap-3 mb-8">
						<WorkIcon sx={{ fontSize: 28 }} className="text-black dark:text-white" />
						<h3 className="text-2xl font-light text-black dark:text-white">Work Experience</h3>
					</div>

					<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-500">
						{/* Header */}
						<div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-800">
							<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
								<div className="space-y-2">
									<div className="flex flex-wrap items-center gap-3">
										<h4 className="text-2xl font-medium text-black dark:text-white">
											Software Engineer Intern
										</h4>
										<span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-full">
											<span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
											Current
										</span>
									</div>
									<p className="text-lg text-gray-800 dark:text-gray-200 font-medium">
										Sati Co., Ltd. <span className="text-gray-400 dark:text-gray-600">·</span> Healthcare AI
									</p>
									<div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500 dark:text-gray-500">
										<span className="inline-flex items-center gap-1.5">
											<CalendarTodayIcon sx={{ fontSize: 14 }} />
											Jun 2025 – Present · {internshipDuration}
										</span>
										<span className="inline-flex items-center gap-1.5">
											<LocationOnIcon sx={{ fontSize: 14 }} />
											Chiang Mai, Thailand
										</span>
										<span className="inline-flex items-center gap-1.5">
											<WorkIcon sx={{ fontSize: 14 }} />
											On-site
										</span>
									</div>
								</div>
							</div>

							{/* TL;DR for non-devs */}
							<div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 border-l-2 border-black dark:border-white">
								<p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1.5">
									In plain English
								</p>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									I build full-stack web applications for a healthcare-AI company — from the
									first idea on a whiteboard, through the design, all the way to a live product
									people use every day.
								</p>
							</div>
						</div>

						{/* Involvements */}
						<div className="p-6 md:p-8">
							<p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-5">
								What I've worked on
							</p>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
								{involvements.map((item) => (
									<div
										key={item.name}
										className="group relative p-5 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-500 hover:shadow-lg flex flex-col"
									>
										<div className="flex items-center gap-3 mb-3">
											<div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg text-black dark:text-white">
												{item.icon}
											</div>
											<h5 className="text-base font-medium text-black dark:text-white leading-tight">
												{item.name}
											</h5>
										</div>
										<p className="text-sm font-medium text-gray-700 dark:text-gray-300 italic mb-2">
											{item.summary}
										</p>
										<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
											{item.plainDescription}
										</p>
										<div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-800">
											<div className="flex items-center justify-between text-xs">
												<span className="text-gray-500 dark:text-gray-500">
													{item.role}
												</span>
												<span className="px-2 py-0.5 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded">
													{item.methodology}
												</span>
											</div>
											<div className="flex flex-wrap gap-1">
												{item.tech.map((t) => (
													<span
														key={t}
														className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-sm"
													>
														{t}
													</span>
												))}
											</div>
											{item.action && (
												<a
													href={item.action.href}
													target={item.action.type === "website" ? "_blank" : undefined}
													rel="noopener noreferrer"
													className="inline-flex items-center gap-1.5 text-sm font-medium text-black dark:text-white hover:underline underline-offset-4 mt-1"
												>
													{item.action.type === "website" ? (
														<LaunchIcon sx={{ fontSize: 14 }} />
													) : (
														<EmailIcon sx={{ fontSize: 14 }} />
													)}
													{item.action.label}
												</a>
											)}
										</div>
									</div>
								))}
							</div>

							{/* Skills gained */}
							<div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
								<p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-3">
									Skills gained
								</p>
								<div className="flex flex-wrap gap-2">
									{skills.map((s) => (
										<span
											key={s}
											className="px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
										>
											{s}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Education */}
				<div>
					<div className="flex items-center gap-3 mb-8">
						<SchoolIcon sx={{ fontSize: 28 }} className="text-black dark:text-white" />
						<h3 className="text-2xl font-light text-black dark:text-white">Education</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Mahanakorn University */}
						<div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-500 hover:shadow-xl p-6 md:p-7">
							<div className="flex items-start gap-4 mb-5">
								<div className="w-14 h-14 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
									<SchoolIcon sx={{ fontSize: 28 }} />
								</div>
								<div className="min-w-0">
									<h4 className="text-lg font-medium text-black dark:text-white leading-tight">
										Mahanakorn University of Technology
									</h4>
									<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
										Bachelor's Degree · Computer Engineering
									</p>
								</div>
							</div>

							<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
								Basketball player for the university team. Event staff for multiple campus initiatives.
							</p>

							<div className="flex flex-wrap gap-1.5 mb-5">
								{["Leadership", "Team Collaboration", "Event Coordination"].map((s) => (
									<span
										key={s}
										className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
									>
										{s}
									</span>
								))}
							</div>

							<div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
								<p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
									Highlighted coursework
								</p>
								{universityCoursework.map((c) => (
									<div
										key={c.title}
										className="p-4 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors duration-300 space-y-2"
									>
										<h5 className="text-sm font-medium text-black dark:text-white">
											{c.title}
										</h5>
										<p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
											{c.description}
										</p>
										<div className="flex flex-wrap gap-1 pt-1">
											{c.tech.map((t) => (
												<span
													key={t}
													className="px-2 py-0.5 text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-sm"
												>
													{t}
												</span>
											))}
										</div>
										{"github" in c && c.github && (
											<a
												href={c.github}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors"
											>
												<GitHubIcon sx={{ fontSize: 12 }} />
												View on GitHub
											</a>
										)}
									</div>
								))}
							</div>
						</div>

						{/* 42 Bangkok */}
						<div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-500 hover:shadow-xl p-6 md:p-7">
							<div className="flex items-start gap-4 mb-5">
								<div className="w-14 h-14 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
									<CodeIcon sx={{ fontSize: 28 }} />
								</div>
								<div className="min-w-0">
									<h4 className="text-lg font-medium text-black dark:text-white leading-tight">
										42 Bangkok
									</h4>
									<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
										Cadet · Computer Science
									</p>
								</div>
							</div>

							<div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-l-2 border-black dark:border-white mb-5">
								<p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1.5">
									What is 42?
								</p>
								<p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
									A programming school with no teachers, no tuition, and no lectures.
									Students learn by building hard projects and reviewing each other's code.
								</p>
							</div>

							<span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded mb-5">
								Focus: Operating Systems & Peer to Peer
							</span>

							<div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
								<p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
									Key activities
								</p>
								{bangkokCourses.map((c) => (
									<div
										key={c.title}
										className="p-4 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors duration-300 space-y-1.5"
									>
										<h5 className="text-sm font-medium text-black dark:text-white">
											{c.title}
										</h5>
										<p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
											{c.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
