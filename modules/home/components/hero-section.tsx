"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/hero/hero-farm.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-accent/90 backdrop-blur-sm text-accent-foreground font-semibold text-sm shadow-lg">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Temporada 2025 - ¡Nuevas Cosechas Disponibles!
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground drop-shadow-2xl leading-tight">
              ¡Cultiva tu Futuro en{" "}
              <span className="block text-primary drop-shadow-[0_0_30px_rgba(76,175,80,0.5)]">
                FarmVille 2025!
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
              Planta, cosecha y construye tu imperio agrícola. Desde semillas
              hasta una granja próspera, ¡la aventura comienza ahora!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 font-bold"
                variant={"link"}
              >
                <Link href={"/game-entry"}>🌱 Empezar a Jugar Gratis</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-border">
                <div className="text-3xl font-bold text-primary">500K+</div>
                <div className="text-sm text-muted-foreground font-medium">
                  Granjeros Activos
                </div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-border">
                <div className="text-3xl font-bold text-accent">150+</div>
                <div className="text-sm text-muted-foreground font-medium">
                  Tipos de Cultivos
                </div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-border">
                <div className="text-3xl font-bold text-secondary">4.9★</div>
                <div className="text-sm text-muted-foreground font-medium">
                  Valoración
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
    </div>
  );
};
