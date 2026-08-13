import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  onNavigateHome: () => void;
}

/**
 * Shared banner used at the top of every standalone page so About, Services and
 * Contact open with the same rhythm as the landing hero (photo + brand-blue tint).
 */
export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  image,
  onNavigateHome,
}) => {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#2563EB]/80" />
      <div className="absolute inset-0 bg-slate-900/35" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 text-white">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-blue-100 mb-5">
          <button onClick={onNavigateHome} className="hover:text-white transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-blue-200/70" />
          <span className="text-white">{eyebrow}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] max-w-3xl">
          {title}
        </h1>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-blue-50 max-w-2xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
};
