"use client";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PsychologyIcon from '@mui/icons-material/Psychology';

export default function Projects() {
	const projects = [
		{
			title: "Reserve - Booking System",
			description: "A comprehensive booking system for managing reservations, featuring user authentication, calendar integration, and real-time notifications.",
			technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
			github: "https://github.com/Tisarji/Reserve-Project",
			demo: "https://your-ecommerce-demo.vercel.app",
			image: <CalendarMonthIcon sx={{ fontSize: 48 }} />
		},
		{
			title: "FDF - 42 School Project",
			description: "A simplified 3D graphic representation of a wireframe model. Points are connected by lines to create terrain visualization using computer graphics techniques.",
			technologies: ["C", "MiniLibX", "Graphics", "Makefile"],
			github: "https://github.com/Tisarji/fdf-42cursus",
			demo: "",
			image: <WorkIcon sx={{ fontSize: 48 }} />
		},
		{
			title: "Push Swap - 42 School Project",
			description: "An efficient sorting algorithm implementation using C, designed to handle large datasets with minimal memory usage.",
			technologies: ["C", "Algorithms", "Stack Operations", "Makefile"],
			github: "https://github.com/Tisarji/push-swap-42cursus",
			demo: "https://your-weather-app.vercel.app",
			image: <SwapHorizIcon sx={{ fontSize: 48 }} />
		},
		{
			title: "Philosopher - 42 School Project",
			description: "A collaborative platform for 42 School students to share and discuss philosophical topics, featuring user profiles, discussion threads, and a voting system.",
			technologies: ["C", "Threading", "Mutex", "Semaphores"],
			github: "https://github.com/Tisarji/philosopher-42cursus",
			demo: "https://your-task-manager.vercel.app",
			image: <PsychologyIcon sx={{ fontSize: 48 }} />
		}
	];

	return (
		<section id="projects" className="py-20 bg-gray-50/30 dark:bg-gray-900/30">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Featured Projects
					</h2>
					<div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white mx-auto"></div>
					<p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
						A collection of projects that showcase my skills and passion for creating innovative solutions
					</p>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{projects.map((project, index) => (
						<div 
							key={index} 
							className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
						>
							<div className="p-8 space-y-6">
								<div className="flex items-center gap-4">
									<div className="text-5xl group-hover:scale-110 transition-transform duration-300">
										{project.image}
									</div>
									<div className="flex-1">
										<h3 className="text-2xl font-light text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
											{project.title}
										</h3>
									</div>
								</div>
								
								<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
									{project.description}
								</p>
								
								<div className="flex flex-wrap gap-2">
									{project.technologies.map((tech, techIndex) => (
										<span 
											key={techIndex}
											className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors duration-300"
										>
											{tech}
										</span>
									))}
								</div>
								
								<div className="flex gap-4 pt-4">
									<a 
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="group/btn flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 text-sm font-medium"
									>
										<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
										</svg>
										Code
										<svg className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
									</a>
									<a 
										href={project.demo}
										target="_blank"
										rel="noopener noreferrer"
										className="group/btn flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl"
									>
										Live Demo
										<svg className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
									</a>
								</div>
							</div>
							
							{/* Hover effect overlay */}
							<div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
						</div>
					))}
				</div>
				
				<div className="text-center mt-16">
					<a 
						href="https://github.com/Tisarji"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-3 px-8 py-4 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 font-medium tracking-wide group"
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
						View All Projects on GitHub
						<svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}
