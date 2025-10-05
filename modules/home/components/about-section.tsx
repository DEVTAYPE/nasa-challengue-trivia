"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Game Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300">
            <div className="text-5xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              {t.about.gameTitle}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t.about.gameDescription}
            </p>
            <Link href="/game-entry">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                {t.common.startNow}
              </Button>
            </Link>
          </div>

          {/* Levels Card */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300">
            <div className="text-5xl mb-4">⛰️</div>
            <h3 className="text-2xl font-bold mb-4">{t.about.levelsTitle}</h3>
            <p className="mb-6 leading-relaxed opacity-90">
              {t.about.levelsDescription}
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm font-mono">
                <span>🌱</span>
                <span>{t.about.features.levels}</span>
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-2xl font-bold mb-4">{t.about.mapTitle}</h3>
            <p className="mb-6 leading-relaxed opacity-90">
              {t.about.mapDescription}
            </p>
            <Link href="/maps">
              <Button
                variant="secondary"
                className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                {t.common.learnMore}
              </Button>
            </Link>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-amber-300">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-amber-800 mb-4">
              {t.about.missionTitle}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t.about.missionDescription}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-green-100 rounded-xl p-6 text-center hover:bg-green-200 transition-colors">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-sm font-semibold text-green-800">
              {t.about.features.levels}
            </p>
          </div>
          <div className="bg-blue-100 rounded-xl p-6 text-center hover:bg-blue-200 transition-colors">
            <div className="text-3xl mb-2">❓</div>
            <p className="text-sm font-semibold text-blue-800">
              {t.about.features.questions}
            </p>
          </div>
          <div className="bg-amber-100 rounded-xl p-6 text-center hover:bg-amber-200 transition-colors">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-sm font-semibold text-amber-800">
              {t.about.features.difficulty}
            </p>
          </div>
          <div className="bg-purple-100 rounded-xl p-6 text-center hover:bg-purple-200 transition-colors">
            <div className="text-3xl mb-2">🌍</div>
            <p className="text-sm font-semibold text-purple-800">
              {t.about.features.exploration}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
