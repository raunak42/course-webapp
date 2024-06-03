import type { Metadata } from "next";
import { Inter, Germania_One, Amiko } from "next/font/google";
import "./globals.css";
import { validateRequest } from "@/auth";
import RecoilWrapper from "../providers/RecoilWrapper/RecoilWrapper";
import Footer from "@/components/Footer/Footer";
import NoSessionNavbar from "@/components/Navbar/NoSessionNavbar";
import { SessionNavbarSSR } from "@/components/Navbar/SessionNavbarSSR";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Modal } from "@/components/Modal/Modal";
import { Haze } from "@/components/Haze/Haze";
import { DbErrorWrapper } from "@/providers/DbErrorWrapper/DbErrorWrapper";

const inter = Inter({ subsets: ["latin"] });
const germaniaOne = Germania_One({ subsets: ["latin"], weight: "400" });
const amiko = Amiko({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Skillcraft admin",
  description: "Generated by create next app",
  assets: "/logo-no-background.png",
  icons: ["/rocket.svg"],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { session, user } = await validateRequest();

  return (
    <html lang="en">
      <RecoilWrapper>
        <body className={`${amiko.className} "relative"`}>
          {/* <Sidebar /> */}
          <div className="w-full fixed top-0 z-10 bg-[#ffffff]">
            {!session && <NoSessionNavbar />}
            {session && <SessionNavbarSSR />}
          </div>
          <Sidebar />
          <DbErrorWrapper>
            y <div className="pt-[80px]">{children}</div>
          </DbErrorWrapper>
          <div className="mt-[120px]">
            <Footer />
          </div>
          <Modal session={session} user={user} />
          <Haze />
        </body>
      </RecoilWrapper>
    </html>
  );
}
