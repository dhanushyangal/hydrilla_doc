import type { Metadata } from "next";
import "./globals.css";
import { DocsLayoutWrapper } from "@/components/DocsLayoutWrapper";

export const metadata: Metadata = {
  title: "Hydrilla AI — Developer API Documentation",
  description:
    "Official developer documentation for Hydrilla AI: BlueFox 3D cascade pipeline, Text-to-3D, Image-to-3D, 2D concept generation, and multi-model APIs.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased selection:bg-indigo-500/20 selection:text-indigo-400">
        <DocsLayoutWrapper>{children}</DocsLayoutWrapper>
      </body>
    </html>
  );
}
