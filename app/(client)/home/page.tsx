import type { Metadata } from "next";
import { TopBanner } from "@/components/client/TopBanner";
import { Header } from "@/components/client/Header";
import { Hero } from "@/components/client/Hero";
import { JerseySelection } from "@/components/client/JerseySelection";
import { WhyUs } from "@/components/client/WhyUs";
import { Footer } from "@/components/client/Footer";

export const metadata: Metadata = {
  title: "Museo.mg — Ex vintage jersey",
  description: "Ex vintage jerseys, curated as an archive.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBanner />
      <Header transparentOnTop />
      <main className="flex-1">
        <Hero />
        <JerseySelection />
        <WhyUs />
      </main>
      <Footer />
    </div>
  );
}