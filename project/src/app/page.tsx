import Navigation from "@/components/Navigation";
import Skills from "@/components/Skills";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<>
			<Navigation />
			<main className="relative">
				{/* Background Pattern */}
				<div className="fixed inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
					<div className="absolute inset-0" style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
						backgroundSize: '20px 20px'
					}}></div>
				</div>
				
				{/* Page Sections */}
				<div className="relative z-10">
					<section className="min-h-screen">
						<Intro />
					</section>
					
					<section id="about" className="py-20">
						<div className="px-6 md:px-8">
							<About />
						</div>
					</section>
					
					<section id="skills" className="py-20">
						<div className="px-6 md:px-8">
							<Skills />
						</div>
					</section>
					
					<section id="projects" className="py-20">
						<div className="px-6 md:px-8">
							<Projects />
						</div>
					</section>
					
					<section id="contact" className="pt-20">
						<Footer />
					</section>
				</div>
			</main>
		</>
	);
}
