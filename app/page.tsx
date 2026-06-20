import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Approach from "../components/Approach";
import Projects from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-gray-100 font-sans selection:bg-blue-500/30">
      {/* Noise texture overlay for premium feel */}
      <div 
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      />
      
      <Navbar />
      
      <div className="pt-24">
        <Hero />
        <Approach />
        <Projects />
        <About />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
