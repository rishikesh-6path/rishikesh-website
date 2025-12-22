import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Work />

      {/* Placeholder for remaining sections */}
      <section id="ventures" className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-foreground-muted">
          <p>Ventures section coming in Phase 2</p>
        </div>
      </section>

      <section id="blog" className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-foreground-muted">
          <p>Blog section coming in Phase 2</p>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-foreground-muted">
          <p>Contact section coming in Phase 2</p>
        </div>
      </section>
    </main>
  );
}
