import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aegiscore AI — Autonomous Decision Intelligence",
  description:
    "Autonomous decision-support agent for high-stakes operations. Monitors incidents, analyzes context, recommends actions, and generates clear human-readable responses in real time.",
  keywords: [
    "autonomous agent",
    "decision intelligence",
    "incident response",
    "operations",
    "AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
