"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// Check for saved theme preference or default to light mode
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		
		if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
			setIsDark(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleTheme = () => {
		if (isDark) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
			setIsDark(false);
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
			setIsDark(true);
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className="p-2 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300"
			aria-label="Toggle theme"
		>
			{isDark ? "🌞" : "🌙"}
		</button>
	);
}
