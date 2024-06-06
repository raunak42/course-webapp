import type { Metadata } from "next";
import { Amiko } from "next/font/google";
import "./globals.css";
import RecoilWrapper from "../providers/RecoilWrapper/RecoilWrapper";
import Footer from "@/components/Footer/Footer";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Haze } from "@/components/Haze/Haze";
import { DbErrorWrapper } from "@/components/DbErrorWrapper/DbErrorWrapper";
import { Modal } from "@/components/Modal/Modal";
import { Navbar } from "@/components/Navbar/Navbar";

const amiko = Amiko({ subsets: ["latin"], weight: "400", display:"swap" });

export const metadata: Metadata = {
  title: "Skillcraft admin",
  description: "Generated by create next app",
  assets: "/logo-no-background.png",
  icons: ["/rocket.svg"],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={amiko.className}>
        <RecoilWrapper>
          <DbErrorWrapper>
            <div>
              <div className="w-full fixed top-0 z-10 bg-[#ffffff]">
                <Navbar />
              </div>
              <Sidebar />
              <div className="pt-[80px]">{children}</div>
              <div className="mt-[120px]">
                <Footer />
              </div>
              <Modal />
              <Haze />
            </div>
          </DbErrorWrapper>
        </RecoilWrapper>
      </body>
    </html>
  );
}