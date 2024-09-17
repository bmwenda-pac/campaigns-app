import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextuiProvider } from "@/components/providers/nextui-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campaigns | Pacis Kenya",
  description: "Campaigns app for Pacis Kenya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextuiProvider>
          <main className="h-full">{children}</main>
          <Toaster />
        </NextuiProvider>
      </body>
    </html>
  );
}
