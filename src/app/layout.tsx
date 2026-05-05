import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "JATIN — Developer Portfolio",
  description:
    "Full Stack Engineer & AI Architect. Building at the intersection of intelligent systems and immersive interfaces.",
  keywords: [
    "developer",
    "portfolio",
    "full stack",
    "AI",
    "React",
    "Next.js",
    "Three.js",
  ],
  openGraph: {
    title: "JATIN — Developer Portfolio",
    description: "Full Stack Engineer & AI Architect",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-overlay">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
