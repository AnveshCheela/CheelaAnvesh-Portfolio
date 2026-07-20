/**
 * Root Layout
 * 
 * App-wide providers and configuration:
 * - PostHog analytics
 * - Vercel analytics
 * - Theme provider
 * - Toast notifications
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial display face for headings/hero (opt-in via the .font-display
// utility). Newsreader is a real multi-weight serif: default heads paint at
// 400-500, with 600 reserved for restrained emphasis. Italic carries the
// editorial accent. Bound to --font-serif so it drives every .font-display
// / .editorial-* site across the OS.
const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anveshcheela.com'),
  title: {
    default: 'Anvesh Cheela | Full-Stack Web Developer',
    template: '%s | Anvesh Cheela'
  },
  description: 'Full-stack web developer specializing in MERN, Next.js, AWS, and Docker. Creator of GymRats, OpsGuardian, and VerifyFlow. B.Tech CSE, IIIT SriCity. India.',
  keywords: [
    'Anvesh Cheela',
    'full-stack web development',
    'MERN stack',
    'Next.js',
    'React',
    'Node.js',
    'AWS',
    'Docker',
    'software developer',
    'GymRats',
    'OpsGuardian',
    'VerifyFlow',
    'TypeScript',
    'MongoDB',
    'IIIT SriCity',
    'India software developer'
  ],
  authors: [{ name: 'Anvesh Cheela' }],
  creator: 'Anvesh Cheela',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anveshcheela.com',
    title: 'Anvesh Cheela | Full-Stack Web Developer',
    description: 'Full-stack web developer specializing in MERN, Next.js, AWS, and Docker. Creator of GymRats, OpsGuardian, and VerifyFlow.',
    siteName: 'Anvesh Cheela Portfolio',
    images: [{
      url: '/Anvesh-photo.png',
      width: 1200,
      height: 630,
      alt: 'Anvesh Cheela'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anvesh Cheela | Full-Stack Web Developer',
    description: 'Full-stack web developer specializing in MERN, Next.js, AWS, and Docker. Creator of GymRats, OpsGuardian, and VerifyFlow.',
    images: ['/Anvesh-photo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD structured data for SEO. A @graph links the Person to the products
// they built, and knowsAbout enumerates the exact topics search engines and
// AI search should associate with Anvesh (full-stack web development).
const PERSON_ID = 'https://anveshcheela.com/#Anvesh';
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Anvesh Cheela',
      jobTitle: 'Full-Stack Web Developer',
      url: 'https://anveshcheela.com',
      image: 'https://anveshcheela.com/Anvesh-photo.png',
      sameAs: [
        'https://www.linkedin.com/in/anvesh-cheela-063013292/',
        'https://github.com/AnveshCheela',
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'IIIT SriCity',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'SriCity',
        addressRegion: 'Andhra Pradesh',
        addressCountry: 'IN',
      },
      description:
        'Full-stack web developer specializing in MERN, Next.js, AWS, and Docker. Creator of GymRats, OpsGuardian, and VerifyFlow. B.Tech CSE at IIIT SriCity, India.',
      knowsAbout: [
        'Full-stack web development',
        'MERN stack',
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'MongoDB',
        'Express.js',
        'AWS',
        'Docker',
        'REST APIs',
        'CI/CD',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'GymRats',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Any',
      description:
        'A fitness tracking application built with the MERN stack for workout logging and progress tracking.',
      author: { '@id': PERSON_ID },
      keywords: 'fitness, workout tracker, MERN stack, full-stack web development',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'OpsGuardian',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      description:
        'A DevOps monitoring and operations management tool built with modern web technologies.',
      author: { '@id': PERSON_ID },
      keywords: 'DevOps, monitoring, operations, full-stack web development',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'VerifyFlow',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      description:
        'A verification and workflow automation application built with Next.js and AWS.',
      author: { '@id': PERSON_ID },
      keywords: 'verification, workflow, Next.js, AWS, full-stack web development',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="F3zO-86yLvebJBNNSRX5vrSEOmQrQVsvZ3Dx5NEJXkI" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}>
        <PostHogProvider>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </PostHogProvider>

        {/* Server-rendered semantic content for crawlers and AI search. The
            visible app is a client-rendered SPA, so this block is the indexable
            source of truth — keep it accurate and on-message. */}
        <div className="sr-only">
          <h1>Anvesh Cheela — Full-Stack Web Developer</h1>
          <p>
            I am a full-stack web developer specializing in the MERN stack, Next.js, AWS,
            and Docker. I created GymRats, a fitness tracking application; OpsGuardian,
            a DevOps monitoring tool; and VerifyFlow, a verification and workflow
            automation app. B.Tech CSE at IIIT SriCity (2027). Based in India.
            Open to software developer roles.
          </p>
          <h2>Projects</h2>
          <ul>
            <li>GymRats — a fitness tracking application built with the MERN stack</li>
            <li>OpsGuardian — a DevOps monitoring and operations management tool</li>
            <li>VerifyFlow — a verification and workflow automation application</li>
            <li>AnveshOS — this interactive desktop-style portfolio, built with Next.js 15 and React 19</li>
          </ul>
          <h2>Expertise</h2>
          <p>
            Full-stack web development, MERN stack, Next.js, React, TypeScript,
            Node.js, MongoDB, Express.js, AWS, Docker, REST APIs, CI/CD.
          </p>
          <h2>Contact</h2>
          <p>Email: cheelaanvesh@gmail.com</p>
          <p>Location: India</p>
          <p>GitHub: github.com/AnveshCheela</p>
          <p>LinkedIn: linkedin.com/in/anvesh-cheela-063013292/</p>
        </div>

        <Analytics />
      </body>
    </html>
  );
}
