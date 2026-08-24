import type { Metadata } from "next";
import "./globals.css";

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Guillermo Vásquez",
  "jobTitle": "Ingeniero de Sistemas Aplicados",
  "description": "Transformo complejidad técnica en arquitecturas optimizadas para decisiones y procesos reales.",
  "url": "https://guillermovasquez.dev",
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
  icons: {
    icon: "/architect_portfolio_2026/images/favicon.png",
    shortcut: "/architect_portfolio_2026/images/favicon.png",
    apple: "/architect_portfolio_2026/images/favicon.png",
  },
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
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
