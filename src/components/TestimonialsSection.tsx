import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../data/initialData';

export const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextTestimonial = () => {
    setActiveIdx((prev) => (prev + 1) % INITIAL_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIdx((prev) => (prev - 1 + INITIAL_TESTIMONIALS.length) % INITIAL_TESTIMONIALS.length);
  };

  return (
    <section className="bg-white py-20 md:py-28 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Large Serif Heading */}
          <div className="lg:col-span-5">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#2C344E] mb-3 bg-white px-3.5 py-1.5 rounded-full border border-slate-200">
              PATIENT TESTIMONIALS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#2C344E] leading-tight mb-6">
              Trusted by Thousands of Families in Critical Moments
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              Read real accounts from patients, trauma surgeons, and family care coordinators who experienced SkyMed’s rapid air rescue and clinical dedication.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {INITIAL_TESTIMONIALS.map((t, i) => (
                  <img
                    key={i}
                    src={t.avatar}
                    alt={t.author}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-[#2C344E] mt-1">4.98/5 Overall Rating across 1,200+ Reviews</p>
              </div>
            </div>
          </div>

          {/* Right Column: White Card with Stacked Testimonials */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 md:p-12 rounded-[32px] shadow-sm border border-gray-100 relative">
              
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#2C344E] flex items-center justify-center mb-6">
                <Quote className="w-6 h-6" />
              </div>

              {/* Quote Container in Soft Tinted Box */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-[20px] mb-8 min-h-[140px] flex items-center">
                <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed italic">
                  "{INITIAL_TESTIMONIALS[activeIdx].quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={INITIAL_TESTIMONIALS[activeIdx].avatar}
                    alt={INITIAL_TESTIMONIALS[activeIdx].author}
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    {/* AUTHOR NAME IN CAPS */}
                    <h4 className="text-sm font-bold text-[#2C344E] tracking-wider uppercase">
                      {INITIAL_TESTIMONIALS[activeIdx].author}
                    </h4>
                    <p className="text-xs font-semibold text-[#2C344E] uppercase tracking-wide">
                      {INITIAL_TESTIMONIALS[activeIdx].title} — <span className="text-gray-400 font-normal">{INITIAL_TESTIMONIALS[activeIdx].location}</span>
                    </p>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#2C344E] hover:text-white text-gray-600 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#2C344E] hover:text-white text-gray-600 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

