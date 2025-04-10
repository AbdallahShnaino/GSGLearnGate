import type { Metadata } from "next";
import { Oxygen } from "next/font/google";
import "./globals.css";

const oxygen = Oxygen({
  variable: "--font-oxygen",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Gaza Sky Geeks - Free Online Courses and Learning",
  description:
    "Gaza Sky Geeks offers free online courses to empower learners in Gaza with the skills they need for the tech industry.",
  keywords:
    "Gaza Sky Geeks, free courses, online learning, tech education, skills training, Gaza, technology, coding, software development",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  metadataBase: new URL("https://gsg-learn-gate.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "Gaza Sky Geeks - Empowering Learners with Free Online Courses",
    description:
      "Join Gaza Sky Geeks and access free courses designed to help you build a career in tech.",
    url: "https://gsg-learn-gate.vercel.app",
    type: "website",
    images: [
      {
        url: "https://gsg-learn-gate.vercel.app/public/img/gsgLogo.png",
        width: 1200,
        height: 630,
        alt: "Gaza Sky Geeks Free Courses",
      },
    ],
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Gaza Sky Geeks",
  description:
    "Gaza Sky Geeks offers free online tech courses to empower individuals in Gaza to pursue careers in the tech industry.",
  publisher: {
    "@type": "Organization",
    name: "Gaza Sky Geeks",
    logo: "https://gsg-learn-gate.vercel.app/public/img/gsgLogo.png",
  },
  image: "https://gsg-learn-gate.vercel.app/public/img/gsgLogo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oxygen.className} antialiased`}>{children}</body>
    </html>
  );
}
