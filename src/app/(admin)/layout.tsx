import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import AdminNavbar from "./(components)/admin-navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body
        className={twMerge(
          "bg-background font-sans text-foreground",
          inter.variable,
        )}
      >
        <AdminNavbar />
        {children}
      </body>

    </html>

  );
}
