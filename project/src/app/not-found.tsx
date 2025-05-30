export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
			<div className="text-center space-y-8">
				<div className="space-y-4">
					<h1 className="text-8xl font-extralight text-gray-200 dark:text-gray-800">404</h1>
					<h2 className="text-3xl font-light text-black dark:text-white">Page Not Found</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-md">
						The page you're looking for doesn't exist or has been moved.
					</p>
				</div>
				<a 
					href="/"
					className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-medium"
				>
					← Back to Home
				</a>
			</div>
		</div>
	);
}
