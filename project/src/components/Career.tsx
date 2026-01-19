"use client";

import React from 'react';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

// Tech Stack Icons
const TechIcons: Record<string, React.ReactNode> = {
	"AWS": <CloudIcon sx={{ fontSize: 16 }} />,
	"PostgreSQL": <StorageIcon sx={{ fontSize: 16 }} />,
	"NestJS (TypeScript)": <CodeIcon sx={{ fontSize: 16 }} />,
	"NestJS": <CodeIcon sx={{ fontSize: 16 }} />,
	"React (TypeScript)": <CodeIcon sx={{ fontSize: 16 }} />,
	"React": <CodeIcon sx={{ fontSize: 16 }} />,
	"Ant Design": <DesignServicesIcon sx={{ fontSize: 16 }} />,
	"MUI": <DesignServicesIcon sx={{ fontSize: 16 }} />,
	"Figma": <DesignServicesIcon sx={{ fontSize: 16 }} />,
	"Fastify": <CodeIcon sx={{ fontSize: 16 }} />,
	"Python": <CodeIcon sx={{ fontSize: 16 }} />,
};

export default function Career() {
	const internship = {
		title: "Software Engineer Internship",
		company: "Sati Co., Ltd.",
		location: "Chiang Mai, Thailand",
		period: "Jun 2025 - Present · 8 months",
		type: "Internship · On-site",
		description: `Full Stack Developer responsible for developing an internal ERP system and collaborating on company projects. Covered the full software lifecycle: requirement gathering, system design, development, and maintenance.`,
		projects: [
			{
				name: "Internal ERP System",
				role: "Sole Developer",
				methodology: "Waterfall",
				techStack: ["AWS", "NestJS (TypeScript)", "PostgreSQL", "React (TypeScript)", "Ant Design", "Figma"],
				features: ["HRM", "System Monitoring", "KPI / OKR", "Employee Management", "Clock-in / Clock-out"],
				architecture: [
					"Clean Architecture on frontend and backend",
					"Single Source of Truth for security",
					"High flexibility and scalability"
				],
				aiAssisted: { frontend: "~40%", backend: "~20%" }
			},
			{
				name: "Company Projects",
				role: "Team Member",
				methodology: "Agile Scrum",
				techStack: ["AWS", "NestJS", "Fastify", "PostgreSQL", "Python", "React", "MUI"],
				responsibilities: ["Code reviews", "Bug fixing", "Feature development"]
			}
		],
		skills: ["Full Stack", "System Design", "Database Design", "ERP", "Project Management"],
		contactEmail: "jirasitkarunwong@gmail.com"
	};

	const education = [
		{
			institution: "Mahanakorn University of Technology",
			degree: "Bachelor's Degree, Computer Engineering",
			activities: "Basketball player representing the university. Staff member for campus events."
		},
		{
			institution: "42 Bangkok",
			focus: "Operating Systems & Leadership",
			courses: [
				{ title: "Operating Systems Coursework", description: "Intensive OS projects in C. Memory management, performance optimization." },
				{ title: "TA / Tutor – Web Dev (KMITL)", description: "Guided students in responsive design and JavaScript." },
				{ title: "Hackathon Staff", description: "Technical support and coordination." }
			]
		}
	];

	return (
		<section id="career" className="py-20 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-10 right-1/4 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 left-1/4 w-48 h-48 bg-black/3 dark:bg-white/3 rounded-full blur-3xl"></div>
			</div>

			<div className="max-w-6xl mx-auto">
				{/* Section Header */}
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Career Path
					</h2>
					<div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white mx-auto"></div>
					<p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
						My professional journey and experience in software development
					</p>
				</div>

				{/* Experience Section */}
				<div className="mb-20">
					<div className="flex items-center gap-3 mb-8">
						<WorkIcon sx={{ fontSize: 32 }} className="text-black dark:text-white" />
						<h3 className="text-3xl font-light text-black dark:text-white">Experience</h3>
					</div>

					<div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-xl">
						{/* Header with gradient accent */}
						<div className="p-8 border-b border-gray-200 dark:border-gray-800">
							<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
								<div>
									<div className="flex items-center gap-3 mb-2">
										<h4 className="text-2xl font-medium text-black dark:text-white">
											{internship.title}
										</h4>
										<span className="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-full">
											Current
										</span>
									</div>
									<p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-2">
										{internship.company}
									</p>
									<div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
										<span className="flex items-center gap-1">
											<CalendarTodayIcon sx={{ fontSize: 16 }} />
											{internship.period}
										</span>
										<span className="flex items-center gap-1">
											<LocationOnIcon sx={{ fontSize: 16 }} />
											{internship.location}
										</span>
									</div>
								</div>
								<span className="self-start px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-gray-700">
									{internship.type}
								</span>
							</div>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
								{internship.description}
							</p>
						</div>

						{/* Projects Grid */}
						<div className="p-8">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								{internship.projects.map((project, idx) => (
									<div 
										key={idx} 
										className="group/card relative p-6 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-500 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
									>
										{/* Project Header */}
										<div className="flex items-start justify-between mb-4">
											<h5 className="text-xl font-medium text-black dark:text-white">
												{project.name}
											</h5>
											<div className="flex gap-2">
												<span className="px-2 py-1 text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded">
													{project.methodology}
												</span>
											</div>
										</div>

										<p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{project.role}</p>

										{/* Tech Stack with Icons */}
										<div className="mb-4">
											<p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">Tech Stack</p>
											<div className="flex flex-wrap gap-2">
												{project.techStack.map((tech, i) => (
													<span 
														key={i} 
														className="group/tech inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
													>
														{TechIcons[tech] || <CodeIcon sx={{ fontSize: 14 }} />}
														{tech}
													</span>
												))}
											</div>
										</div>

										{/* Features or Responsibilities */}
										{project.features && (
											<div className="mb-4">
												<p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">Key Features</p>
												<div className="flex flex-wrap gap-1.5">
													{project.features.map((feature, i) => (
														<span key={i} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
															{feature}
														</span>
													))}
												</div>
											</div>
										)}

										{project.responsibilities && (
											<div className="mb-4">
												<p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">Responsibilities</p>
												<ul className="space-y-1">
													{project.responsibilities.map((item, i) => (
														<li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
															<span className="w-1 h-1 bg-black dark:bg-white rounded-full"></span>
															{item}
														</li>
													))}
												</ul>
											</div>
										)}

										{/* AI Assisted Badge */}
										{project.aiAssisted && (
											<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
												<div className="flex items-center gap-4">
													<div className="flex items-center gap-2">
														<span className="text-xs text-gray-500">AI-Assisted:</span>
														<span className="text-sm font-medium text-black dark:text-white">{project.aiAssisted.frontend} Frontend</span>
														<span className="text-gray-300 dark:text-gray-600">|</span>
														<span className="text-sm font-medium text-black dark:text-white">{project.aiAssisted.backend} Backend</span>
													</div>
												</div>
											</div>
										)}

										{/* Hover accent line */}
										<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left"></div>
									</div>
								))}
							</div>

							{/* Skills Row */}
							<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
								<div className="flex flex-wrap gap-3">
									{internship.skills.map((skill, i) => (
										<span 
											key={i} 
											className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-default"
										>
											{skill}
										</span>
									))}
								</div>
							</div>

							{/* CTA Button */}
							<div className="mt-8">
								<a 
									href={`mailto:${internship.contactEmail}?subject=ERP%20Demo%20Request&body=Hi%20Jirasit,%0A%0AI%20would%20like%20to%20request%20a%20demo%20of%20the%20ERP%20system.%0A%0AThank%20you!`}
									className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
								>
									Request ERP Demo
									<EmailIcon sx={{ fontSize: 18 }} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Education Section */}
				<div>
					<div className="flex items-center gap-3 mb-8">
						<SchoolIcon sx={{ fontSize: 32 }} className="text-black dark:text-white" />
						<h3 className="text-3xl font-light text-black dark:text-white">Education</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* University */}
						<div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 p-8 space-y-4">
							<div className="text-center space-y-4">
								<div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
									<SchoolIcon sx={{ fontSize: 32 }} />
								</div>
								<h4 className="text-xl font-medium text-black dark:text-white">
									{education[0].institution}
								</h4>
								<p className="text-gray-700 dark:text-gray-300">
									{education[0].degree}
								</p>
								<div className="w-16 h-0.5 bg-black dark:bg-white mx-auto"></div>
								<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
									{education[0].activities}
								</p>
							</div>
						</div>

						{/* 42 Bangkok */}
						<div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 p-8 space-y-4">
							<div className="text-center space-y-4">
								<div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
									<CodeIcon sx={{ fontSize: 32 }} />
								</div>
								<h4 className="text-xl font-medium text-black dark:text-white">
									{education[1].institution}
								</h4>
								<span className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded">
									{education[1].focus}
								</span>
							</div>
							
							<div className="space-y-3 pt-4">
								{education[1].courses?.map((course, i) => (
									<div key={i} className="p-3 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors duration-300 text-left">
										<h5 className="text-sm font-medium text-black dark:text-white mb-1">{course.title}</h5>
										<p className="text-xs text-gray-600 dark:text-gray-400">{course.description}</p>
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
