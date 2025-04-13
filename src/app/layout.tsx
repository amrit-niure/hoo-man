import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/common/theme-provider";

// const inter = Inter({ subsets: ["latin"] });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const signikaNegative = Ubuntu_Sans({
//   variable: "--font-signika-negative",
//   subsets: ["latin"],
// });
export const metadata: Metadata = {
  title: "HR & Payroll Management System",
  description: "A comprehensive HR and payroll management solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <main>
              {children}
            </main>
            <Toaster position="top-center"/>
        </ThemeProvider> 
      </body>
    </html>
  );
}
