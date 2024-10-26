import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const sfProDisplay = localFont({
  src: [
    {
      path: "./fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-display",
});

export const metadata: Metadata = {
  title: "Apple iPhone",
  description:
    "This is a project developed by Yassine Zaanouni using Next.js, Tailwind CSS, TypeScript, GSAP and Three.js.",
  // icons: {
  //   icon: [
  //     {
  //       url: "/assets/images/apple.svg",
  //       type: "image/svg+xml",
  //     },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          sfProDisplay.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
