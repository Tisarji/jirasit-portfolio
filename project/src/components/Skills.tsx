"use client";

import PaletteIcon from "@mui/icons-material/Palette";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

type Skill = { name: string; level: 1 | 2 | 3 };

type Category = {
	title: string;
	plainExplanation: string;
	icon: React.ReactNode;
	skills: Skill[];
};

const skillCategories: Category[] = [
	{
		title: "Frontend & Mobile",
		plainExplanation:
			"Everything you actually see and click — websites, apps on your phone, the layouts and animations that make them feel alive.",
		icon: <PaletteIcon sx={{ fontSize: 40 }} />,
		skills: [
			{ name: "React · Next.js", level: 3 },
			{ name: "React Native · Expo", level: 2 },
			{ name: "Swift · iOS", level: 1 },
			{ name: "Tailwind CSS · Sass", level: 3 },
			{ name: "Ant Design · MUI", level: 3 },
			{ name: "Redux · Hooks", level: 3 },
			{ name: "React Lifecycle", level: 2 },
		],
	},
	{
		title: "Backend & Data",
		plainExplanation:
			"The engine room — where user accounts, databases, and business logic live. The part that makes buttons actually do something.",
		icon: <StorageIcon sx={{ fontSize: 40 }} />,
		skills: [
			{ name: "Node.js · Express", level: 3 },
			{ name: "NestJS · Go · Python", level: 3 },
			{ name: "PostgreSQL · MySQL", level: 2 },
			{ name: "Oracle · MSSQL", level: 2 },
			{ name: "Redis · Prisma", level: 2 },
			{ name: "REST API", level: 3 },
			{ name: "Microservices", level: 3 },
		],
	},
	{
		title: "Embedded & Systems",
		plainExplanation:
			"The deep stuff — talking directly to hardware, tiny devices, robots, and the low-level instructions computers actually run on.",
		icon: <PrecisionManufacturingIcon sx={{ fontSize: 40 }} />,
		skills: [
			{ name: "C · C++", level: 3 },
			{ name: "Embedded Systems", level: 3 },
			{ name: "Operating Systems", level: 3 },
			{ name: "Data Structures", level: 3 },
			{ name: "Robotics", level: 3 },
			{ name: "IoT Devices", level: 2 },
			{ name: "Hardware Integration", level: 2 },
		],
	},
	{
		title: "Tools & Workflow",
		plainExplanation:
			"The toolkit I use every day — design software, version control, cloud servers, and the habits that keep a team moving smoothly.",
		icon: <BuildIcon sx={{ fontSize: 40 }} />,
		skills: [
			{ name: "VS Code · Vim", level: 3 },
			{ name: "Draw.io · Figma", level: 3 },
			{ name: "Git CLI · Fork", level: 3 },
			{ name: "Navicat · DBeaver", level: 3 },
			{ name: "Agile · Waterfall", level: 3 },
			{ name: "Docker · AWS", level: 3 },
			{ name: "Notion · Obsidian", level: 3 },
		],
	},
];

const aiTopics = [
	"Large Language Models (LLMs)",
	"Retrieval-Augmented Generation (RAG)",
	"Machine Learning",
	"Deep Learning",
	"Generative AI",
	"Natural Language Processing",
	"Computer Vision",
	"Prompt Engineering",
];

function LevelDots({ level }: { level: 1 | 2 | 3 }) {
	const color = level === 3 ? "bg-green-500" : level === 2 ? "bg-yellow-500" : "bg-red-500";
	return (
		<div className="flex gap-1">
			{[1, 2, 3].map((i) => (
				<div
					key={i}
					className={`w-1.5 h-1.5 rounded-full ${
						i <= level ? color : "bg-gray-200 dark:bg-gray-800"
					}`}
				/>
			))}
		</div>
	);
}

export default function Skills() {
	return (
		<section id="skills" className="py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute top-10 left-1/4 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl" />
				<div className="absolute bottom-10 right-1/4 w-48 h-48 bg-black/3 dark:bg-white/3 rounded-full blur-3xl" />
			</div>

			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16 space-y-4">
					<p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 font-medium">
						What I can do
					</p>
					<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Skills
					</h2>
					<div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white mx-auto" />
					<p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
						Four areas of craft — each with a plain-English explanation of what
						it actually enables.
					</p>

					{/* Legend */}
					<div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-8 pt-2">
						<div className="flex items-center gap-2">
							<LevelDots level={1} />
							<span className="text-xs text-gray-500 uppercase tracking-wider">Familiar</span>
						</div>
						<div className="flex items-center gap-2">
							<LevelDots level={2} />
							<span className="text-xs text-gray-500 uppercase tracking-wider">Proficient</span>
						</div>
						<div className="flex items-center gap-2">
							<LevelDots level={3} />
							<span className="text-xs text-gray-500 uppercase tracking-wider">Expert</span>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{skillCategories.map((category) => (
						<div
							key={category.title}
							className="group flex flex-col p-6 md:p-7 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
						>
							<div className="space-y-4 mb-6">
								<div className="flex items-center gap-3">
									<div className="text-black dark:text-white opacity-80 group-hover:scale-110 transition-transform duration-300">
										{category.icon}
									</div>
									<h3 className="text-lg font-medium text-black dark:text-white">
										{category.title}
									</h3>
								</div>
								<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
									{category.plainExplanation}
								</p>
								<div className="w-10 h-0.5 bg-black dark:bg-white transform group-hover:scale-x-150 transition-transform duration-500 origin-left" />
							</div>

							<div className="space-y-2 flex-1">
								{category.skills.map((skill) => (
									<div
										key={skill.name}
										className="flex justify-between items-center py-2.5 px-3 border border-gray-200/70 dark:border-gray-800/70 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
									>
										<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
											{skill.name}
										</span>
										<LevelDots level={skill.level} />
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Currently learning */}
				<div className="mt-20 max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
						<AutoAwesomeIcon sx={{ fontSize: 14 }} className="text-black dark:text-white" />
						<span className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300 font-medium">
							Current focus
						</span>
					</div>
					<h3 className="text-2xl md:text-3xl font-light mb-4 text-black dark:text-white">
						Going deep on AI & Machine Learning
					</h3>
					<p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-8">
						Building smart apps that understand language, images, and context —
						from chatbots and search to automation and decision-making tools.
					</p>
					<div className="flex flex-wrap justify-center gap-2">
						{aiTopics.map((topic) => (
							<span
								key={topic}
								className="px-4 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-300 cursor-default"
							>
								{topic}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
