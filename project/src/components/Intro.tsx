"use client";

import BoltIcon from "@mui/icons-material/Bolt";
import ComputerIcon from "@mui/icons-material/Computer";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function Intro() {
	return (
		<section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden px-6 md:px-8">
			{/* Background layers */}
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute top-20 left-10 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl animate-float" />
				<div
					className="absolute bottom-20 right-10 w-48 h-48 bg-black/3 dark:bg-white/3 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "2s" }}
				/>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 rounded-full blur-3xl animate-spin-slow" />
				<div
					className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
					style={{
						backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
						backgroundSize: "50px 50px",
					}}
				/>
			</div>

			<div className="text-center max-w-5xl mx-auto relative space-y-10">
				{/* Availability chip */}
				<div
					className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full animate-fadeInUp"
				>
					<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
					<span className="text-xs font-medium text-green-700 dark:text-green-300 tracking-wide">
						Available for new opportunities
					</span>
				</div>

				{/* Name */}
				<div className="space-y-5">
					<h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-wider leading-[1.05] pb-2">
						<span className="block bg-gradient-to-r from-black via-gray-600 to-black dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent animate-fadeInUp">
							Jirasit
						</span>
						<span
							className="block font-light bg-gradient-to-l from-black via-gray-600 to-black dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent animate-slideInRight pb-2"
							style={{ animationDelay: "0.3s" }}
						>
							Karunwong
						</span>
					</h1>

					<div className="flex justify-center">
						<div className="relative w-40 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white overflow-hidden">
							<div
								className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-black animate-shimmer"
								style={{ backgroundSize: "200% 100%" }}
							/>
						</div>
					</div>
				</div>

				{/* Value prop */}
				<div
					className="space-y-4 animate-fadeInUp max-w-3xl mx-auto"
					style={{ animationDelay: "0.6s" }}
				>
					<p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-extralight tracking-wide">
						Full Stack Developer
					</p>
					<p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
						I build the websites and apps you use every day — from the polished screens
						on the front, to the quiet engines running behind them. Currently going deep
						on AI.
					</p>
				</div>

				{/* Quick highlights */}
				<div
					className="grid grid-cols-3 max-w-2xl mx-auto divide-x divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800 animate-fadeInUp"
					style={{ animationDelay: "0.9s" }}
				>
					<div className="py-5">
						<p className="text-2xl md:text-3xl font-light text-black dark:text-white">
							Full-Stack
						</p>
						<p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
							Frontend + Backend
						</p>
					</div>
					<div className="py-5">
						<p className="text-2xl md:text-3xl font-light text-black dark:text-white">2</p>
						<p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
							Engineering Schools
						</p>
					</div>
					<div className="py-5">
						<p className="text-2xl md:text-3xl font-light text-black dark:text-white">AI</p>
						<p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
							Current Focus
						</p>
					</div>
				</div>

				{/* CTAs */}
				<div
					className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
					style={{ animationDelay: "1.2s" }}
				>
					<a
						href="#projects"
						className="group relative px-10 py-4 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-500 font-medium tracking-wide shadow-lg hover:shadow-2xl"
					>
						<span className="relative z-10 flex items-center justify-center gap-3">
							See my work
							<svg
								className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</span>
					</a>
					<a
						href="#about"
						className="group relative px-10 py-4 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 font-medium tracking-wide"
					>
						<span className="relative z-10 flex items-center justify-center gap-3">
							About me
							<svg
								className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform duration-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 14l-7 7m0 0l-7-7m7 7V3"
								/>
							</svg>
						</span>
					</a>
				</div>

				{/* Floating decorative icons */}
				<div className="absolute -top-12 -left-12 opacity-10 animate-float">
					<BoltIcon sx={{ fontSize: 60 }} />
				</div>
				<div
					className="absolute -bottom-12 -right-12 opacity-10 animate-float"
					style={{ animationDelay: "1s" }}
				>
					<ComputerIcon sx={{ fontSize: 50 }} />
				</div>
				<div
					className="absolute top-1/4 -right-8 opacity-10 animate-bounce-gentle"
					style={{ animationDelay: "2s" }}
				>
					<RocketLaunchIcon sx={{ fontSize: 30 }} />
				</div>
				<div
					className="absolute bottom-1/4 -left-8 opacity-10 animate-bounce-gentle"
					style={{ animationDelay: "3s" }}
				>
					<AutoAwesomeIcon sx={{ fontSize: 40 }} />
				</div>
			</div>

			{/* Scroll hint */}
			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
				<div className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600">
					<span className="text-[10px] font-light tracking-[0.3em]">SCROLL</span>
					<div className="w-px h-6 bg-gradient-to-b from-gray-400 to-transparent dark:from-gray-600" />
				</div>
			</div>
		</section>
	);
}
