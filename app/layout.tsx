import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Guillermo Vásquez",
  "jobTitle": "Ingeniero de Sistemas Aplicados",
  "description": "Transformo complejidad técnica en arquitecturas optimizadas para decisiones y procesos reales.",
  "url": "https://guillermovasquez.dev", // A la espera de dominio final oficial
  "sameAs": [
    "https://www.linkedin.com/in/guillermovasbendev",
    "https://github.com/guillermoSoftwareEngineer"
  ]
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Portafolio Técnico - Guillermo Vásquez",
  "url": "https://guillermovasquez.dev",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://guillermovasquez.dev/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const metadata: Metadata = {
  metadataBase: new URL("https://guillermovasquez.dev"),
  title: {
    template: "%s | Guillermo Vásquez",
    default: "Guillermo Vásquez | Ingeniero de Sistemas Aplicados",
  },
  description: "Transformo complejidad técnica en arquitecturas optimizadas para decisiones y procesos reales.",
  openGraph: {
    title: "Guillermo Vásquez | Ingeniero de Sistemas Aplicados",
    description: "Transformo complejidad técnica en arquitecturas optimizadas para decisiones y procesos reales.",
    url: "https://guillermovasquez.dev",
    siteName: "Guillermo Vásquez Portafolio",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Guillermo Vásquez — Ingeniero de Sistemas Aplicados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guillermo Vásquez | Ingeniero de Sistemas Aplicados",
    description: "Transformo complejidad técnica en arquitecturas optimizadas para decisiones y procesos reales.",
    creator: "@IngSistemasAplicados",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/images/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon.png", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
