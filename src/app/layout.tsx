import { Inter } from "next/font/google";
import "./globals.css";
import MySidebar from "@/components/organisms/MySidebar/MySidebar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "lesson-keeper",
  description: "Generated by Shadow",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div id="main-container" className="">
            {children}
          </div>
          <MySidebar />
        </body>
      </html>
    </ClerkProvider>
  );
}
