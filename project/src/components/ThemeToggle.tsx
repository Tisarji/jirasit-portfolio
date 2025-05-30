"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		
		// Check for saved theme preference or default to light mode
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		
		const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
		
		setIsDark(shouldBeDark);
		
		if (shouldBeDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = !isDark;
		setIsDark(newTheme);
		
		if (newTheme) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};

	// Prevent hydration mismatch
	if (!mounted) {
		return (
			<button
				className="p-2 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300"
				aria-label="Toggle theme"
				disabled
			>
				🌙
			</button>
		);
	}

	return (
		<button
			onClick={toggleTheme}
			className="p-2 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
			aria-label="Toggle theme"
		>
			<span className="text-lg transition-transform duration-300 hover:scale-110 block">
				{isDark ? "🌞" : "🌙"}
			</span>
		</button>
	);
}
