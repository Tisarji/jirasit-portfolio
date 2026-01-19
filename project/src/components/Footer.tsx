"use client";

import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Footer() {
	const currentYear = new Date().getFullYear();
	
	const socialLinks = [
		{
			name: "GitHub",
			url: "https://github.com/Tisarji",
			icon: "→",
			description: "Code & Projects"
		},
		{
			name: "LinkedIn",
			url: "https://www.linkedin.com/in/jirasit-karunwong-b0b480260/",
			icon: "→",
			description: "Professional Network"
		},
		{
			name: "Email",
			url: "mailto:jirasitkarunwong@gmail.com",
			icon: "→",
			description: "Direct Contact"
		},
		{
			name: "Instagram",
			url: "https://www.instagram.com/tisarji/",
			icon: "→",
			description: "Personal Moments and Updates"
		}
	];

	const quickLinks = [
		{ name: "About", href: "#about" },
		{ name: "Skills", href: "#skills" },
		{ name: "Projects", href: "#projects" },
		{ name: "Contact", href: "#contact" }
	];

	return (
		<footer className="relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-gray-100/50 dark:via-gray-900/30 dark:to-gray-800/50"></div>
			<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
			
			{/* Floating Decorative Elements */}
			<div className="absolute top-12 left-12 w-2 h-2 bg-black dark:bg-white rounded-full opacity-20 animate-pulse"></div>
			<div className="absolute top-24 right-24 w-1 h-1 bg-black dark:bg-white rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
			<div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-black dark:bg-white rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>

			<div className="relative py-20 px-6 md:px-8">
				<div className="max-w-6xl mx-auto">
					{/* Main Content */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
						{/* Brand & Contact Info */}
						<div className="lg:col-span-1 space-y-8">
							<div className="space-y-4">
								<h3 className="text-3xl font-light tracking-tight">
									Let's Create
									<span className="block bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
										Something Amazing
									</span>
								</h3>
								<p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
									Always interested in new opportunities, collaborations, and meaningful conversations. 
									Let's build the future together.
								</p>
							</div>
							
							<div className="space-y-4">
								<div className="group flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-all duration-300">
									<div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
										<EmailIcon sx={{ fontSize: 16 }} className="text-white dark:text-black" />
									</div>
									<div>
										<p className="text-sm text-gray-500 dark:text-gray-500">Email</p>
										<p className="text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors">
											jirasitkarunwong@gmail.com
										</p>
									</div>
								</div>
								
								<div className="group flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-all duration-300">
									<div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
										<LocationOnIcon sx={{ fontSize: 16 }} className="text-white dark:text-black" />
									</div>
									<div>
										<p className="text-sm text-gray-500 dark:text-gray-500">Location</p>
										<p className="text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors">
											Bangkok, Thailand
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Social Links */}
						<div className="lg:col-span-1 space-y-8">
							<h3 className="text-2xl font-light">Connect</h3>
							<div className="space-y-3">
								{socialLinks.map((link, index) => (
									<a
										key={index}
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex items-center justify-between p-4 border border-gray-200/60 dark:border-gray-800/60 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-all duration-500 hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-gray-900/20"
									>
										<div className="flex-1">
											<div className="flex items-center gap-3">
												<span className="text-lg font-medium group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
													{link.name}
												</span>
											</div>
											<p className="text-sm text-gray-500 dark:text-gray-500 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-300">
												{link.description}
											</p>
										</div>
										<div className="w-8 h-8 border border-gray-300 dark:border-gray-700 group-hover:border-black dark:group-hover:border-white rounded-full flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-all duration-300">
											<span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white dark:group-hover:text-black transition-all duration-300">
												{link.icon}
											</span>
										</div>
									</a>
								))}
							</div>
						</div>

						{/* Quick Navigation */}
						<div className="lg:col-span-1 space-y-8">
							<h3 className="text-2xl font-light">Navigate</h3>
							<div className="grid grid-cols-2 gap-3">
								{quickLinks.map((link, index) => (
									<a
										key={index}
										href={link.href}
										className="group p-4 text-center border border-gray-200/60 dark:border-gray-800/60 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white rounded-lg transition-all duration-500 hover:shadow-lg"
									>
										<span className="text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black font-medium transition-colors duration-300">
											{link.name}
										</span>
									</a>
								))}
							</div>
							
							{/* Status Indicator */}
							<div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
								<div className="flex items-center gap-3">
									<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
									<div>
										<p className="text-sm font-medium text-green-800 dark:text-green-300">Available for Work</p>
										<p className="text-xs text-green-600 dark:text-green-400">Open to new opportunities</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom Section */}
					<div className="pt-12 border-t border-gray-200/60 dark:border-gray-800/60">
						<div className="flex flex-col md:flex-row justify-between items-center gap-6">
							<div className="flex flex-col md:flex-row items-center gap-4">
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									© {currentYear} Jirasit Karunwong
								</p>
								<div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
								<p className="text-gray-500 dark:text-gray-500 text-sm">
									Crafted with care in Bangkok
								</p>
							</div>
							
							<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
								<span>Built with</span>
								<div className="flex items-center gap-1">
									<span className="text-blue-600 dark:text-blue-400">Next.js</span>
									<span>&</span>
									<span className="text-cyan-600 dark:text-cyan-400">Tailwind</span>
								</div>
								<span className="text-red-500">♥</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
