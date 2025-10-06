"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/hero/hero-farm.jpg')` }}
        >
          {/* Black overlay with 50% opacity */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-block animate-float">
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-accent/90 backdrop-blur-sm text-accent-foreground font-semibold text-sm shadow-lg">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                {t.hero.badge}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground drop-shadow-2xl leading-tight">
              ANDEAN SPACE
              {/* {t.hero.title} */}
              {/* <span className="block text-primary drop-shadow-[0_0_30px_rgba(76,175,80,0.5)]">
                {t.hero.titleHighlight}
              </span> */}
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href={"/maps"}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 font-bold"
                >
                  {t.hero.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
    </div>
  );
};
