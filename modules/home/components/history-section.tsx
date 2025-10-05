"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import Image from "next/image";

export const HistorySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t.history.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.history.subtitle}
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-700 leading-relaxed text-center bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-600">
            {t.history.intro}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Ancient Roots */}
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <div className="sticky top-24">
                  <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="text-6xl mb-4 text-center">🏛️</div>
                    <h3 className="text-2xl font-bold text-center">
                      {t.history.ancientTitle}
                    </h3>
                    <p className="text-center text-sm mt-2 opacity-90 font-mono">
                      600-1100 AD
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t.history.ancientText}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Wari Culture
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Terraces
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Irrigation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Agriculture */}
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3 md:order-2">
                <div className="sticky top-24">
                  <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="text-6xl mb-4 text-center">🌾</div>
                    <h3 className="text-2xl font-bold text-center">
                      {t.history.modernTitle}
                    </h3>
                    <p className="text-center text-sm mt-2 opacity-90 font-mono">
                      2025
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 md:order-1">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t.history.modernText}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                      <div className="text-2xl mb-2">🥔</div>
                      <p className="text-sm font-semibold text-green-800">
                        Native Potatoes
                      </p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                      <div className="text-2xl mb-2">🌾</div>
                      <p className="text-sm font-semibold text-amber-800">
                        Quinoa & Grains
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Inspiration */}
          <div className="relative mt-12">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-1 shadow-2xl">
              <div className="bg-white rounded-3xl p-8 md:p-12">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">💡</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {t.history.inspirationTitle}
                  </h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
                  {t.history.inspirationText}
                </p>

                {/* Quote */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-600 max-w-2xl mx-auto">
                  <svg
                    className="w-10 h-10 text-green-600 mb-4 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.7-.5 3.7-1.3L11 24h4l3-7.3C19.2 15.5 20 13.8 20 12c0-3.3-2.7-6-6-6H10zm12 0c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.7-.5 3.7-1.3L23 24h4l3-7.3c1.2-1.2 2-2.9 2-4.7 0-3.3-2.7-6-6-6h-4z" />
                  </svg>
                  <p className="text-xl italic text-gray-700 mb-4 leading-relaxed">
                    {t.history.quote}
                  </p>
                  <p className="text-sm font-semibold text-green-800">
                    — {t.history.quoteAuthor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NASA Partnership Badge */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gray-900 text-white rounded-full px-8 py-4 shadow-2xl">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🛰️</span>
              <div className="text-left">
                <p className="text-xs opacity-75">Powered by</p>
                <p className="font-bold text-lg">NASA Satellite Data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
