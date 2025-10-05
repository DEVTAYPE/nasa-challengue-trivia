import {
  HeroSection,
  AboutSection,
  HistorySection,
} from "@/modules/home/components";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <HistorySection />
    </main>
  );
}
