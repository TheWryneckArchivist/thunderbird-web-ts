import { Inter, Montserrat } from "next/font/google";
import { AssetLibrary } from "@/app/features/asset-library";
import { Footer, HeroHeadline, SiteHeader } from "@/app/features/site-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["900"], variable: "--font-montserrat" });

export default function RootDocumentLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <main className={`${inter.variable} ${montserrat.variable} font-sans selection:bg-red-500/30`}>
        <SiteHeader />
        <HeroHeadline />
        <AssetLibrary />
        <Footer />
      </main>
    </div>
  );
}
