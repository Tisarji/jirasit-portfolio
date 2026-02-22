"use client";

import PaletteIcon from '@mui/icons-material/Palette';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

export default function Skills() {
	const skillCategories = [
		{
			title: "Frontend & Mobile",
			skills: [
				{ name: "React, Next.js", level: 3 },
				{ name: "React Native, Expo", level: 2 },
				{ name: "Swift, iOS", level: 1 },
				{ name: "Tailwind CSS, Sass", level: 3 },
				{ name: "Ant Design, MUI", level: 3 },
				{ name: "Redux, Hooks", level: 3 },
				{ name: "React Lifecycle", level: 2 }
			],
			icon: <PaletteIcon sx={{ fontSize: 48 }} />
		},
		{
			title: "Backend",
			skills: [
				{ name: "Node.js, Express", level: 3 },
				{ name: "NestJS, Go, Python", level: 3 },
				{ name: "PostgreSQL, MySQL", level: 2 },
				{ name: "Oracle, MSSQL", level: 2 },
				{ name: "Redis, Prisma", level: 2 },
				{ name: "REST API", level: 3 },
				{ name: "Microservices Arch.", level: 3 }
			],
			icon: <StorageIcon sx={{ fontSize: 48 }} />
		},
		{
			title: "Embedded & OS",
			skills: [
				{ name: "C, C++", level: 3 },
				{ name: "Embedded Systems", level: 3 },
				{ name: "OS Concepts", level: 3 },
				{ name: "Data Structures", level: 3 },
				{ name: "Robotics", level: 3 },
				{ name: "IoT Devices", level: 2 },
				{ name: "Hardware Integration", level: 2 }
			],
			icon: <PrecisionManufacturingIcon sx={{ fontSize: 48 }} />
		},
		{
			title: "Tools & Others",
			skills: [
				{ name: "VSCode, Vim", level: 3 },
				{ name: "Draw.io, Figma", level: 3 },
				{ name: "Git CLI, Fork", level: 3 },
				{ name: "Navicat, DBeaver", level: 3 },
				{ name: "Agile, Waterfall", level: 3 },
				{ name: "Docker, AWS", level: 3 },
				{ name: "Notion, Obsidian", level: 3 }
			],
			icon: <BuildIcon sx={{ fontSize: 48 }} />
		}
	];

	return (
		<section className="py-20 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-10 left-1/4 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 right-1/4 w-48 h-48 bg-black/3 dark:bg-white/3 rounded-full blur-3xl"></div>
			</div>

			<div className="w-full px-4 md:px-8">
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Skills & Expertise
					</h2>
					<div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white mx-auto"></div>
					<p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
						Technologies and tools I use to bring ideas to life
					</p>
					
					{/* Legend for Skill Levels */}
					<div className="flex justify-center items-center gap-6 mt-8 pt-6">
						<div className="flex items-center gap-2">
							<div className="flex gap-1">
								<div className="w-2 h-2 rounded-full bg-red-500"></div>
								<div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-800"></div>
								<div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-800"></div>
							</div>
							<span className="text-xs text-gray-500 uppercase tracking-wider">Familiar</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="flex gap-1">
								<div className="w-2 h-2 rounded-full bg-yellow-500"></div>
								<div className="w-2 h-2 rounded-full bg-yellow-500"></div>
								<div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-800"></div>
							</div>
							<span className="text-xs text-gray-500 uppercase tracking-wider">Proficient</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="flex gap-1">
								<div className="w-2 h-2 rounded-full bg-green-500"></div>
								<div className="w-2 h-2 rounded-full bg-green-500"></div>
								<div className="w-2 h-2 rounded-full bg-green-500"></div>
							</div>
							<span className="text-xs text-gray-500 uppercase tracking-wider">Expert</span>
						</div>
					</div>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{skillCategories.map((category, index) => (
						<div key={index} className="group space-y-6 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
							<div className="text-center space-y-4">
								<div className="text-5xl group-hover:scale-110 transition-transform duration-300">
									{category.icon}
								</div>
								<h3 className="text-2xl font-light text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
									{category.title}
								</h3>
								<div className="w-16 h-0.5 bg-black dark:bg-white mx-auto transform group-hover:scale-x-125 transition-transform duration-500"></div>
							</div>
							
							<div className="space-y-3">
								{category.skills.map((skill, skillIndex) => (
									<div key={skillIndex} className="group/skill">
										<div className="p-4 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 flex justify-between items-center relative overflow-hidden">
											<span className="relative z-10 text-gray-700 dark:text-gray-300 group-hover/skill:text-black dark:group-hover/skill:text-white transition-colors duration-300 font-medium text-sm">
												{skill.name}
											</span>
											
											{/* Skill Level Indicator */}
											<div className="flex gap-1 relative z-10">
												{[1, 2, 3].map((levelIndicator) => {
													let dotColor = 'bg-gray-200 dark:bg-gray-800';
													if (levelIndicator <= skill.level) {
														if (skill.level === 3) dotColor = 'bg-green-500';
														else if (skill.level === 2) dotColor = 'bg-yellow-500';
														else if (skill.level === 1) dotColor = 'bg-red-500';
													}

													return (
														<div 
															key={levelIndicator} 
															className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${dotColor}`}
														></div>
													);
												})}
											</div>
											
											<div className="absolute inset-0 bg-gray-50 dark:bg-gray-800 transform scale-x-0 group-hover/skill:scale-x-100 transition-transform duration-300 origin-left"></div>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Additional Skills Section */}
				<div className="mt-20 text-center">
					<h3 className="text-2xl font-light mb-4 text-black dark:text-white">
						Always Learning
					</h3>
					<p className="text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-8">
						I am currently focusing my efforts heavily on Artificial Intelligence, expanding my expertise in smart applications, model integrations, and data-driven systems.
					</p>
					<div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
						{["Large Language Models (LLMs)", "Retrieval-Augmented Generation (RAG)", "Machine Learning", "Deep Learning", "Generative AI", "Natural Language Processing (NLP)", "Computer Vision", "Prompt Engineering"].map((skill, index) => (
							<span 
								key={index}
								className="px-6 py-3 text-sm font-medium bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-300 cursor-default"
							>
								{skill}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
