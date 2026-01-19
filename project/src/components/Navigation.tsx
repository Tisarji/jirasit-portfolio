"use client";

import { useState, useEffect } from "react";

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const navItems = [
		{ name: "About", href: "#about" },
		{ name: "Skills", href: "#skills" },
		{ name: "Career", href: "#career" },
		{ name: "Projects", href: "#projects" },
		{ name: "Contact", href: "#contact" }
	];

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
			scrolled 
				? 'bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-white/5' 
				: 'bg-white/80 dark:bg-black/80 backdrop-blur-md'
		} border-b border-gray-200/60 dark:border-gray-800/60`}>
			<div className="max-w-6xl mx-auto px-6 md:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Enhanced Logo */}
					<a 
						href="#" 
						className="group relative text-2xl font-extralight tracking-wider hover:scale-105 transition-all duration-300"
					>
						<span className="relative z-10 bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
							JK
						</span>
						<div className="absolute -inset-2 bg-gradient-to-r from-black/5 to-transparent dark:from-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
					</a>

					{/* Enhanced Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-1">
						{navItems.map((item, index) => (
							<a
								key={item.name}
								href={item.href}
								className="group relative px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50"
								style={{animationDelay: `${index * 0.1}s`}}
							>
								<span className="relative z-10 font-medium tracking-wide">
									{item.name}
								</span>
								<div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-black dark:bg-white transform -translate-x-1/2 group-hover:w-8 transition-all duration-300"></div>
							</a>
						))}
					</div>

					{/* Enhanced Mobile menu button */}
					<div className="md:hidden flex items-center">
						<button
							className="group relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors duration-300"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label="Toggle menu"
						>
							<div className="w-6 h-6 flex flex-col justify-center items-center">
								<span className={`bg-black dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-full ${
									isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
								}`}></span>
								<span className={`bg-black dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 my-0.5 rounded-full ${
									isMenuOpen ? 'opacity-0' : 'opacity-100'
								}`}></span>
								<span className={`bg-black dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-full ${
									isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
								}`}></span>
							</div>
						</button>
					</div>
				</div>

				{/* Enhanced Mobile Navigation */}
				<div className={`md:hidden transition-all duration-500 ease-in-out ${
					isMenuOpen 
						? 'max-h-80 opacity-100 visible' 
						: 'max-h-0 opacity-0 invisible'
				} overflow-hidden`}>
					<div className="py-6 space-y-2 border-t border-gray-200/60 dark:border-gray-800/60 mt-4">
						{navItems.map((item, index) => (
							<a
								key={item.name}
								href={item.href}
								className={`group block px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all duration-300 rounded-lg transform ${
									isMenuOpen 
										? 'translate-x-0 opacity-100' 
										: 'translate-x-4 opacity-0'
								}`}
								style={{
									transitionDelay: isMenuOpen ? `${index * 0.1}s` : '0s'
								}}
								onClick={() => setIsMenuOpen(false)}
							>
								<span className="flex items-center justify-between">
									<span className="font-medium tracking-wide">{item.name}</span>
									<svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</span>
							</a>
						))}
						
						{/* Mobile Contact Info */}
						<div className="pt-4 mt-4 border-t border-gray-200/60 dark:border-gray-800/60">
							<div className="px-4 py-2">
								<p className="text-sm text-gray-500 dark:text-gray-500 font-medium mb-2">Get in touch</p>
								<a 
									href="mailto:jirasit.dev@gmail.com"
									className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
								>
									jirasit.dev@gmail.com
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
