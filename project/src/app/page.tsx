import Navigation from "@/components/Navigation";
import Skills from "@/components/Skills";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Career from "@/components/Career";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";

export default function Home() {
	return (
		<>
			<Navigation />
			<main className="relative">
				{/* Subtle dot pattern */}
				<div className="fixed inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none -z-10">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
							backgroundSize: "20px 20px",
						}}
					/>
				</div>

				<Intro />
				<About />
				<Skills />
				<Career />
				<Projects />
				<Gallery />
				<Footer />
			</main>
		</>
	);
}
