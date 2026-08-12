import React from 'react';
import { Plane, Users, Stethoscope, ShieldCheck, CheckCircle2, Award, Headset, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="relative bg-white text-slate-900 py-16 lg:py-28 overflow-hidden border-t border-slate-100">
      
      {/* Decorative Modern Background Elements */}
      {/* 1. Subtle Radial Gradient Blobs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

      {/* 2. Abstract Dot Grid Matrix */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0F172A 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Visual Frame on Left, Text & Feature Matrix on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Column: Asymmetric Modern Photo Collage with Badge */}
          <div className="lg:col-span-6 relative">
            
            {/* Background Accent Backdrop Box */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-50 via-indigo-50 to-sky-50 rounded-[44px] -z-10 border border-blue-100/60" />

            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Primary Main Image */}
              <div className="col-span-8 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000"
                  alt="SkyMed Emergency Rescue Helicopter"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Secondary Stacked Image & Experience Badge */}
              <div className="col-span-4 space-y-4">
                <div className="rounded-[24px] overflow-hidden shadow-lg border-2 border-white bg-slate-100 aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600"
                    alt="Flight Doctor ICU Equipment"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Stat Box Badge */}
                <div className="bg-[#2563EB] text-white p-4 rounded-[24px] shadow-xl text-center border border-blue-400">
                  <Award className="w-6 h-6 mx-auto mb-1 text-blue-200" />
                  <span className="block text-xl font-black">15+ Yrs</span>
                  <span className="text-[10px] font-semibold tracking-wider text-blue-100 uppercase">Aviation Care</span>
                </div>
              </div>
            </div>

            {/* Overlapping Bottom Glass Card */}
            <div className="absolute -bottom-6 left-6 right-6 sm:left-10 sm:right-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">FAA & CAAT Medical Certified</h4>
                  <p className="text-[11px] text-slate-500">Highest Aviation & Healthcare Standards</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: About Narrative & Key Strengths */}
          <div className="lg:col-span-6 space-y-6 pt-6 lg:pt-0">

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Elevating Emergency Air Transport With Uncompromised Medical Precision
            </h2>

            {/* Main Narrative Paragraph */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Founded on the belief that distance should never compromise critical healthcare, SkyMed operates a premier network of air ambulances and airborne ICU units across Thailand. Our board-certified flight surgeons, trauma paramedics, and aviation crew work in seamless harmony to deliver hospital-grade intensive care from the moment of lift-off.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                  <Plane className="w-4 h-4 -rotate-45" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Turbine Medevac Fleet</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Helicopters equipped with full airborne ICU life-support suites.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Flight ICU Surgeons</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Senior doctors on board for cardiac, trauma, and pediatric care.</p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 pt-1">
              {[
                'Direct hospital helipad clearance & pre-arrival trauma unit staging',
                'Seamless insurance billing & international travel health coordination',
                'Comprehensive ground ambulance connection for door-to-door transfers'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Integrated 24/7 Dispatch Callout Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 text-white shadow-2xl overflow-hidden border border-slate-800">
          
          {/* Subtle Ambient Circle */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Headset className="w-3.5 h-3.5" />
                <span>24/7 AIR DISPATCH DESK</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Need Immediate Emergency Medevac Dispatch?
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                Our flight coordinators are available around the clock to initiate instant remote triage, verify helipad availability, and launch air transport teams.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <a
                href="tel:+6622067153"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 border border-white px-7 py-3 rounded-full text-sm font-semibold transition-all active:scale-95 shadow-md"
              >
                <span>Call +66 2 206 7153</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 border border-white/60 text-white hover:bg-white/10 px-7 py-3 rounded-full text-sm font-semibold transition-all active:scale-95"
                >
                  <span>Book Online Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
