import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = new URL("https://victor-p28.github.io");
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: "Victor Sorgi Pedroso | Robotics Portfolio",
    description:
      "Robotics portfolio of Victor Sorgi Pedroso — Georgia Tech M.S. Robotics, graduating May 2027. State estimation, safety-critical control, and autonomous systems.",
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Victor Sorgi Pedroso | Robotics Portfolio",
      description: "Research and engineering projects in robotics, autonomous systems, controls, and estimation.",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Victor Sorgi Pedroso, Robotics, Autonomy, and Control" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Victor Sorgi Pedroso | Robotics Portfolio",
      description: "Research and engineering projects in robotics, autonomous systems, controls, and estimation.",
      images: [socialImage],
    },
  };
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Victor Sorgi Pedroso",
  jobTitle: "M.S. Robotics Student",
  email: "mailto:vpedroso3@gatech.edu",
  sameAs: ["https://www.linkedin.com/in/victorsorgipedroso", "https://github.com/victor-p28"],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Georgia Institute of Technology" },
    { "@type": "CollegeOrUniversity", name: "Emory University" },
  ],
  knowsAbout: [
    "Robotics",
    "State estimation",
    "Kalman filtering",
    "Control barrier functions",
    "ROS 2",
    "Autonomous vehicles",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
