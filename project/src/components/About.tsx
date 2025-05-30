export default function About() {
	return (
		<section id="about" className="min-h-screen flex items-center py-20">
			<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<div className="space-y-8 group">
					<div className="space-y-4">
						<h2 className="text-5xl md:text-6xl font-extralight tracking-wide bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
							About Me
						</h2>
						<div className="w-24 h-0.5 bg-gradient-to-r from-black to-transparent dark:from-white dark:to-transparent transform group-hover:scale-x-110 transition-transform duration-500"></div>
					</div>
					
					<div className="space-y-6">
						<p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
							I'm a passionate <span className="font-medium text-black dark:text-white">full-stack developer</span> with expertise in modern web technologies. 
							I love creating clean, efficient, and user-friendly applications that solve real-world problems.
						</p>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
							With a strong foundation in both frontend and backend development, I enjoy working 
							with technologies like <span className="font-medium text-black dark:text-white">React, Next.js, Node.js</span>, and various databases to build 
							scalable and maintainable solutions.
						</p>
						<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
							When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
							or sharing knowledge with the developer community.
						</p>
					</div>
					
					<div className="flex flex-col sm:flex-row gap-4 pt-6">
						<a 
							href="mailto:your.email@example.com" 
							className="group/btn px-8 py-4 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-center font-medium relative overflow-hidden"
						>
							<span className="relative z-10">Contact Me</span>
							<div className="absolute inset-0 bg-black dark:bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
						</a>
						<a 
							href="/resume.pdf" 
							target="_blank"
							className="group/btn px-8 py-4 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 text-center font-medium relative overflow-hidden shadow-lg hover:shadow-xl"
						>
							<span className="relative z-10 flex items-center justify-center gap-2">
								Download Resume
								<svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
							</span>
						</a>
					</div>
				</div>
				
				<div className="relative group">
					<div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
					<div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-all duration-500">
						<div className="text-center space-y-4">
							<div className="text-7xl animate-pulse">👨‍💻</div>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400 tracking-wide">DEVELOPER</p>
						</div>
					</div>
					<div className="absolute -bottom-4 -right-4 w-8 h-8 bg-black dark:bg-white transform rotate-45 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
				</div>
			</div>
		</section>
	);
}
