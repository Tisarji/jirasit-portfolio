import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TranslateIcon from "@mui/icons-material/Translate";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

export default function About() {
	const facts = [
		{ icon: <LocationOnIcon sx={{ fontSize: 18 }} />, label: "Based in", value: "Bangkok, Thailand" },
		{ icon: <WorkIcon sx={{ fontSize: 18 }} />, label: "Currently", value: "SWE @ Sati Co., Ltd." },
		{ icon: <SchoolIcon sx={{ fontSize: 18 }} />, label: "Studied at", value: "MUT · 42 Bangkok" },
		{ icon: <TranslateIcon sx={{ fontSize: 18 }} />, label: "Languages", value: "Thai · English" },
	];

	return (
		<section id="about" className="py-20 md:py-28 px-6 md:px-8">
			<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
				{/* Left: copy */}
				<div className="space-y-8 group order-2 lg:order-1">
					<div className="space-y-4">
						<p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 font-medium">
							Who I am
						</p>
						<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
							About Me
						</h2>
						<div className="w-24 h-0.5 bg-gradient-to-r from-black to-transparent dark:from-white dark:to-transparent transform group-hover:scale-x-110 transition-transform duration-500" />
					</div>

					<div className="space-y-5">
						<p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-light">
							I'm a <span className="font-medium text-black dark:text-white">full-stack developer</span>
							{" "}— meaning I build <em>both</em> the visible side of a website or app (the part
							you click) and the invisible engine behind it (where the data lives).
						</p>
						<p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
							My favorite kind of work is turning a messy, ambiguous problem into
							something <span className="font-medium text-black dark:text-white">clean, fast, and pleasant to use</span> —
							whether that's an internal business tool, a customer-facing website, or
							a low-level program written in C.
						</p>
						<p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
							Outside of shipping code, I teach, mentor, and help run hackathons. I
							care a lot about sharing what I know with the next batch of students.
						</p>
					</div>

					{/* Quick facts */}
					<dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
						{facts.map((f) => (
							<div
								key={f.label}
								className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors duration-300"
							>
								<div className="mt-0.5 text-black dark:text-white shrink-0">{f.icon}</div>
								<div className="min-w-0">
									<dt className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
										{f.label}
									</dt>
									<dd className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
										{f.value}
									</dd>
								</div>
							</div>
						))}
					</dl>

					<div className="flex flex-col sm:flex-row gap-3 pt-2">
						<a
							href="mailto:jirasitkarunwong@gmail.com"
							className="group/btn px-7 py-3.5 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-center font-medium"
						>
							Get in touch
						</a>
						<a
							href="/resume.pdf"
							target="_blank"
							download="Jirasit_Karunwong_Resume.pdf"
							className="group/btn px-7 py-3.5 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 text-center font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
						>
							Download Resume
							<svg
								className="w-4 h-4 transform group-hover/btn:translate-y-0.5 transition-transform duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</a>
					</div>
				</div>

				{/* Right: portrait */}
				<div className="relative group order-1 lg:order-2">
					<div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
					<div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-all duration-500 overflow-hidden">
						<div className="relative w-64 h-64 group-hover:scale-105 transition-transform duration-500">
							<div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
								<Image
									src="/images/profile.webp"
									alt="Jirasit Karunwong — Full Stack Developer"
									width={256}
									height={256}
									className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							</div>
							<div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
								<div className="bg-white dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg group-hover:shadow-xl transition-all duration-500">
									<p className="text-xs font-medium text-gray-600 dark:text-gray-400 tracking-wider uppercase">
										Developer
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="absolute -bottom-4 -right-4 w-8 h-8 bg-black dark:bg-white transform rotate-45 opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
				</div>
			</div>
		</section>
	);
}
