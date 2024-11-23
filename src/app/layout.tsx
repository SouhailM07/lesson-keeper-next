import "./globals.css";
import { Poppins } from "next/font/google";
import MySidebar from "@/components/organisms/MySidebar/MySidebar";
import { ClerkProvider } from "@clerk/nextjs";
import DontRenderWhen from "@/components/atoms/DontRenderWhen/DontRenderWhen";
import Navbar from "@/components/organisms/Navbar/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
export const metadata = {
  title: "lesson-keeper",
  description: "Generated by Shadow",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={poppins.className}>
          <div id="main-container">
            <DontRenderWhen route={["/signIn"]}>
              <Navbar />
            </DontRenderWhen>
            {children}
          </div>
          <DontRenderWhen route={["/signIn"]}>
            <MySidebar />
          </DontRenderWhen>
        </body>
      </html>
    </ClerkProvider>
  );
}
