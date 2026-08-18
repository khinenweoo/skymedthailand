import React from 'react';
import { Info, CloudSun } from 'lucide-react';

interface AvailabilityDisclaimerProps {
  /**
   * 'full'  — the standalone note placed under a page's 24/7 messaging.
   * 'short' — a compact inline note that sits inside a card.
   */
  variant?: 'full' | 'short';
  /** Extra spacing/layout classes for the wrapper. */
  className?: string;
}

/**
 * Qualifies every 24/7 claim on the site.
 *
 * The distinction matters: the dispatch *line* really is answered around the
 * clock, but an actual *flight* depends on weather, clearance and whether an
 * aircraft and crew are free. Placed under each page's 24/7 messaging so the
 * two are never read as the same promise.
 */
export const AvailabilityDisclaimer: React.FC<AvailabilityDisclaimerProps> = ({
  variant = 'full',
  className = '',
}) => {
  if (variant === 'short') {
    return (
      <div
        className={`flex items-center gap-2 rounded-xl bg-blue-50/70 border border-blue-100 px-3 py-2 ${className}`}
      >
        <CloudSun className="w-4 h-4 text-[#2563EB] shrink-0" />
        <p className="text-[11px] font-medium text-slate-500 leading-snug">
          Weather &amp; aircraft availability permitting
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 px-4 py-3 ${className}`}
    >
      <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
        <strong className="font-semibold text-slate-600">Please note:</strong>{' '}
        our dispatch line is answered 24 hours a day, every day. Flight response
        itself is always subject to weather conditions, airspace and landing
        clearance, and aircraft and crew availability. Our coordinator will
        confirm what is possible for your case when you call.
      </p>
    </div>
  );
};
