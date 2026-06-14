import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Architecture } from "@/components/landing/Architecture";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Architecture />

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-zinc-800/40">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Ready to see it in action?
          </h2>
          <p className="text-sm text-zinc-400 mb-8 max-w-lg mx-auto">
            Explore the live operations dashboard with simulated incidents.
            Run the autonomous agent and watch it analyze, decide, and respond
            in real time.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/20"
          >
            Open Dashboard →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
