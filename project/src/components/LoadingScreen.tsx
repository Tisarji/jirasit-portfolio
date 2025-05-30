"use client";

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
	const [isLoading, setIsLoading] = useState(true);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		// Simulate loading progress
		const timer = setInterval(() => {
			setProgress(prev => {
				if (prev >= 100) {
					clearInterval(timer);
					setTimeout(() => setIsLoading(false), 500);
					return 100;
				}
				return prev + Math.random() * 15;
			});
		}, 100);

		return () => clearInterval(timer);
	}, []);

	if (!isLoading) return null;

	return (
		<div className="fixed inset-0 bg-white dark:bg-black z-[100] flex items-center justify-center">
			{/* Background Pattern */}
			<div 
				className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
					backgroundSize: '20px 20px'
				}}
			></div>

			<div className="text-center space-y-8 relative z-10">
				{/* Logo Animation */}
				<div className="relative">
					<h1 className="text-6xl md:text-8xl font-extralight tracking-wider">
						<span className="bg-gradient-to-r from-black via-gray-600 to-black dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent animate-pulse">
							JK
						</span>
					</h1>
					
					{/* Spinning Ring */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-32 h-32 border-2 border-gray-200 dark:border-gray-800 rounded-full relative">
							<div className="absolute inset-0 border-2 border-transparent border-t-black dark:border-t-white rounded-full animate-spin"></div>
						</div>
					</div>
				</div>

				{/* Loading Text */}
				<div className="space-y-4">
					<p className="text-lg text-gray-600 dark:text-gray-400 font-light tracking-wide">
						Crafting Experience
					</p>
					
					{/* Progress Bar */}
					<div className="w-64 mx-auto">
						<div className="w-full bg-gray-200 dark:bg-gray-800 h-0.5 rounded-full overflow-hidden">
							<div 
								className="h-full bg-black dark:bg-white transition-all duration-300 ease-out"
								style={{ width: `${progress}%` }}
							></div>
						</div>
						<p className="text-sm text-gray-500 dark:text-gray-500 mt-2 font-light">
							{Math.round(progress)}%
						</p>
					</div>
				</div>

				{/* Floating Elements */}
				<div className="absolute -top-8 -left-8 w-2 h-2 bg-black dark:bg-white rounded-full opacity-30 animate-pulse"></div>
				<div 
					className="absolute -bottom-8 -right-8 w-1 h-1 bg-black dark:bg-white rounded-full opacity-40 animate-pulse"
					style={{animationDelay: '1s'}}
				></div>
				<div 
					className="absolute top-1/2 -right-12 w-1.5 h-1.5 bg-black dark:bg-white rounded-full opacity-20 animate-pulse"
					style={{animationDelay: '2s'}}
				></div>
			</div>
		</div>
	);
}
