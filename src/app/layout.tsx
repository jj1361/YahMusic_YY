import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YermiYahu123 - New Album",
  description: "Purchase the latest album from YermiYahu123",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
