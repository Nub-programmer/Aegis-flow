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
    <html lang="en">
      <body className="min-h-screen bg-[#f8f9fa] text-black antialiased">
        {children}
      </body>
    </html>
  );
}
