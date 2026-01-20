"use client";

import BoltIcon from '@mui/icons-material/Bolt';
import ComputerIcon from '@mui/icons-material/Computer';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Intro() {
	return (
		<section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden px-6 md:px-8">
			{/* Enhanced Background Elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-20 left-10 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl animate-float"></div>
				<div 
					className="absolute bottom-20 right-10 w-48 h-48 bg-black/3 dark:bg-white/3 rounded-full blur-3xl animate-float"
					style={{animationDelay: '2s'}}
				></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 rounded-full blur-3xl animate-spin-slow"></div>
				
				{/* Grid Pattern */}
				<div 
					className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
					style={{
						backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
						backgroundSize: '50px 50px'
					}}
				></div>
			</div>

			{/* Floating Decorative Elements */}
			<div className="absolute top-1/4 left-1/4 w-2 h-2 bg-black dark:bg-white rounded-full opacity-20 animate-bounce-gentle"></div>
			<div 
				className="absolute top-3/4 right-1/4 w-1 h-1 bg-black dark:bg-white rounded-full opacity-30 animate-bounce-gentle"
				style={{animationDelay: '1s'}}
			></div>
			<div 
				className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-black dark:bg-white rounded-full opacity-25 animate-bounce-gentle"
				style={{animationDelay: '2s'}}
			></div>

			<div className="text-center space-y-12 max-w-5xl mx-auto relative">
				{/* Main Title with Enhanced Styling */}
				<div className="space-y-6">
					<div className="relative">
						<h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-wider leading-tight pb-2">
							<span className="block bg-gradient-to-r from-black via-gray-600 to-black dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent animate-fadeInUp">
								Jirasit
							</span>
							<span 
								className="block font-light bg-gradient-to-l from-black via-gray-600 to-black dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent animate-slideInRight pb-2"
								style={{animationDelay: '0.3s'}}
							>
								Karunwong
							</span>
						</h1>
						
						{/* Animated Underline */}
						<div className="flex justify-center mt-6">
							<div className="relative w-40 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent dark:via-white overflow-hidden">
								<div 
									className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-black animate-shimmer"
									style={{
										backgroundSize: '200% 100%'
									}}
								></div>
							</div>
						</div>
					</div>
				</div>
				
				{/* Enhanced Description */}
				<div 
					className="space-y-6 animate-fadeInUp"
					style={{animationDelay: '0.6s'}}
				>
					<div className="relative inline-block">
						<p className="text-2xl md:text-4xl text-gray-600 dark:text-gray-400 font-extralight tracking-wide">
							Full Stack Developer
						</p>
						<div className="absolute -inset-2 bg-gradient-to-r from-transparent via-black/5 to-transparent dark:via-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					</div>
					
					<div className="max-w-3xl mx-auto space-y-4">
						<p className="text-lg md:text-xl text-gray-500 dark:text-gray-500 font-light leading-relaxed">
							Crafting digital experiences with passion and precision
						</p>
						<p className="text-base text-gray-400 dark:text-gray-600 font-light">
							Transforming ideas into elegant, functional solutions
						</p>
					</div>
				</div>
				
				{/* Enhanced Action Buttons */}
				<div 
					className="flex flex-col sm:flex-row gap-6 justify-center mt-16 pt-8 animate-fadeInUp"
					style={{animationDelay: '0.9s'}}
				>
					<a 
						href="#about" 
						className="group relative px-12 py-5 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700 font-medium tracking-wider overflow-hidden"
					>
						<span className="relative z-10 flex items-center justify-center gap-3">
							About Me
							<svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
							</svg>
						</span>
						<div className="absolute inset-0 bg-black dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
						<div className="absolute inset-0 border border-black dark:border-white transform scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700"></div>
					</a>
					
					<a 
						href="#projects" 
						className="group relative px-12 py-5 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-700 font-medium tracking-wider overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/20"
					>
						<span className="relative z-10 flex items-center justify-center gap-3">
							View Projects
							<svg className="w-5 h-5 transform group-hover:translate-x-1 group-hover:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</span>
						<div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black dark:from-gray-200 dark:to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right"></div>
						<div className="absolute -inset-1 bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white opacity-0 group-hover:opacity-50 blur transition-opacity duration-700"></div>
					</a>
				</div>

				{/* Status Indicator */}
				<div 
					className="flex justify-center mt-8 animate-fadeInUp"
					style={{animationDelay: '1.2s'}}
				>
					<div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
						<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
						<span className="text-sm text-green-700 dark:text-green-300 font-medium">Available for new opportunities</span>
					</div>
				</div>

				{/* Enhanced Floating Elements */}
				<div className="absolute -top-12 -left-12 opacity-10 animate-float"><BoltIcon sx={{ fontSize: 60 }} /></div>
				<div 
					className="absolute -bottom-12 -right-12 opacity-10 animate-float"
					style={{animationDelay: '1s'}}
				><ComputerIcon sx={{ fontSize: 50 }} /></div>
				<div 
					className="absolute top-1/4 -right-8 opacity-10 animate-bounce-gentle"
					style={{animationDelay: '2s'}}
				><RocketLaunchIcon sx={{ fontSize: 30 }} /></div>
				<div 
					className="absolute bottom-1/4 -left-8 opacity-10 animate-bounce-gentle"
					style={{animationDelay: '3s'}}
				><AutoAwesomeIcon sx={{ fontSize: 40 }} /></div>
			</div>

			{/* Scroll Indicator */}
			<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
				<div className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600">
					<span className="text-xs font-light tracking-wider">SCROLL</span>
					<div className="w-px h-6 bg-gradient-to-b from-gray-400 to-transparent dark:from-gray-600"></div>
				</div>
			</div>
		</section>
	);
}
