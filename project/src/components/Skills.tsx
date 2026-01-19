"use client";

import PaletteIcon from '@mui/icons-material/Palette';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';

export default function Skills() {
	const skillCategories = [
		{
			title: "Frontend",
			skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
			icon: <PaletteIcon sx={{ fontSize: 48 }} />
		},
		{
			title: "Backend",
			skills: ["Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
			icon: <StorageIcon sx={{ fontSize: 48 }} />
		},
		{
			title: "Tools & Others",
			skills: ["Vscode, Vim","Git", "Docker", "Figma", "Linux", "Agile"],
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

			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Skills & Expertise
					</h2>
					<div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white mx-auto"></div>
					<p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
						Technologies and tools I use to bring ideas to life
					</p>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
										<div className="p-4 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 text-center relative overflow-hidden">
											<span className="relative z-10 text-gray-700 dark:text-gray-300 group-hover/skill:text-black dark:group-hover/skill:text-white transition-colors duration-300 font-medium">
												{skill}
											</span>
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
					<h3 className="text-2xl font-light mb-8 text-black dark:text-white">
						Always Learning
					</h3>
					<div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
						{["GraphQL", "Redis", "Kubernetes", "Machine Learning", "React Native", "Vue.js", "Prisma", "Supabase"].map((skill, index) => (
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
