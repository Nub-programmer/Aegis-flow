import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-indigo-500/10 border border-indigo-500/20">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Aegiscore<span className="text-indigo-400"> AI</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <span>Autonomous Decision Intelligence</span>
            <span className="hidden md:inline">•</span>
            <span>Built for high-stakes operations</span>
          </div>

          <p className="text-xs text-zinc-600">
            © 2024 Aegiscore AI. Hackathon Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
