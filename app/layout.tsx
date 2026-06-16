import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Webmana — Your domains. One pane of glass.",
  description:
    "Self-hosted dashboard + MCP server that brings uptime, SSL, performance, security, and cost for all your projects into one place — and hands it to your AI.",
  metadataBase: new URL("https://webmana.dev"),
  openGraph: {
    title: "Webmana — Your domains. One pane of glass.",
    description:
      "Self-hosted dashboard + MCP server for solo founders running many domains.",
    url: "https://webmana.dev",
    siteName: "Webmana",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webmana — Your domains. One pane of glass.",
    description:
      "Self-hosted dashboard + MCP server that brings uptime, SSL, performance, security, and cost for every project into one place — and hands it to your AI.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        {children}
      </body>
    </html>
  );
}
