import React from 'react';
import {
  Plane,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  Radio,
  Globe2,
  Award,
  Target,
  Compass,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PageHero } from './PageHero';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

const STATS = [
  { value: '15+', label: 'Years of aviation care' },
  { value: '4,800+', label: 'Missions completed' },
  { value: '32', label: 'Partner hospitals' },
  { value: '24/7', label: 'Dispatch coverage' },
];

const PILLARS = [
  {
    icon: Target,
    title: 'Our Mission',
    body:
      'To make critical care independent of geography — reaching every patient in Thailand with hospital-grade intensive treatment, whatever the terrain or the hour.',
  },
  {
    icon: Compass,
    title: 'Our Vision',
    body:
      'A regional medevac network where a remote island transfer receives the same clinical standard as a metropolitan trauma centre admission.',
  },
  {
    icon: HeartPulse,
    title: 'Our Promise',
    body:
      'Always At Your Service. One call opens a coordinated chain of flight crew, physicians, receiving hospital and insurer — with the family kept informed throughout.',
  },
];

const CAPABILITIES = [
  {
    icon: Plane,
    title: 'Turbine Medevac Fleet',
    body: 'Rotary and fixed-wing aircraft configured as airborne intensive care units.',
  },
  {
    icon: Stethoscope,
    title: 'Flight ICU Physicians',
    body: 'Board-certified doctors for cardiac, trauma, neonatal and pediatric transfers.',
  },
  {
    icon: Radio,
    title: 'Live Dispatch Centre',
    body: 'A single coordinator owns your case from first call through hospital handover.',
  },
  {
    icon: Globe2,
    title: 'International Repatriation',
    body: 'Cross-border transfers with visa, escort and receiving-facility coordination.',
  },
  {
    icon: ShieldCheck,
    title: 'FAA & CAAT Certified',
    body: 'Maintenance, crew currency and clinical protocols audited to aviation standards.',
  },
  {
    icon: Award,
    title: 'Insurance Direct Billing',
    body: 'Guarantee-of-payment handled with major travel and health insurers on your behalf.',
  },
];

const TIMELINE = [
  {
    year: '2010',
    title: 'First air ambulance licence',
    body: 'SkyMed begins operations with a single rotary aircraft serving the Gulf coast.',
  },
  {
    year: '2014',
    title: 'Airborne ICU programme',
    body: 'Full life-support suites and flight physician rosters introduced across the fleet.',
  },
  {
    year: '2019',
    title: 'National hospital network',
    body: 'Direct helipad clearance agreements signed with partner trauma centres nationwide.',
  },
  {
    year: '2024',
    title: 'Regional repatriation desk',
    body: 'Dedicated team for international transfers and insurer-backed medical escorts.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenBooking,
  onNavigateHome,
  onNavigateContact,
}) => {
  return (
    <main className="bg-white">
      <PageHero
        eyebrow="About Us"
        title="Emergency Air Transport With Uncompromised Medical Precision"
        subtitle="SkyMed operates Thailand's premier network of air ambulances and airborne ICU units — staffed by flight surgeons, trauma paramedics and aviation crew who train together, every day."
        image="/images/hero2.jpg"
        onNavigateHome={onNavigateHome}
      />

      {/* Stats strip */}
      <section className="relative z-10 -mt-10 sm:-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/60 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100 overflow-hidden">
            {STATS.map((s) => (
              <div key={s.label} className="p-6 sm:p-8 text-center">
                <span className="block text-2xl sm:text-3xl font-black text-[#2563EB]">
                  {s.value}
                </span>
                <span className="mt-1 block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + collage */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-50 via-indigo-50 to-sky-50 rounded-[44px] -z-10 border border-blue-100/60" />
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-8 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/5]">
                  <img
                    src="/images/about-main.jpg"
                    alt="SkyMed emergency rescue helicopter on approach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-4 space-y-4">
                  <div className="rounded-[24px] overflow-hidden shadow-lg border-2 border-white bg-slate-100 aspect-square">
                    <img
                      src="/images/care.jpg"
                      alt="SkyMed flight medical crew treating a patient in transit"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-[24px] overflow-hidden shadow-lg border-2 border-white bg-slate-100 aspect-square">
                    <img
                      src="/images/about-secondary.jpg"
                      alt="SkyMed crew beside an air ambulance helicopter"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block bg-blue-50 text-[#2563EB] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Built for the hours that decide an outcome
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                SkyMed was founded on a simple conviction: distance should never
                decide who survives. What began as a single rotary aircraft on the
                Gulf coast is now a national medevac operation running scheduled
                readiness rosters, standing hospital agreements and a dispatch
                centre that never closes.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Every mission is flown by a crew that trains as one unit — pilot,
                flight physician and critical care paramedic — so the intensive care
                a patient receives at altitude is continuous with what waits for them
                on the ground.
              </p>

              <div className="space-y-2.5 pt-1">
                {[
                  'Direct hospital helipad clearance and pre-arrival trauma unit staging',
                  'Seamless insurance billing and international travel health coordination',
                  'Ground ambulance connection for genuine door-to-door transfers',
                  'Family liaison updates at every stage of the mission',
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Promise */}
      <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] tracking-tight">
              What Drives Every Dispatch
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Three commitments shape how we crew, equip and fly every mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] tracking-tight">
              Capabilities Behind The Call
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Aircraft, clinicians and coordination working as a single system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] tracking-tight">
              Our Journey
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Fifteen years of widening what an air ambulance can reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="inline-block text-2xl font-black text-[#2563EB] mb-3">
                  {item.year}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden">
        <img
          src="/images/helicopter.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2563EB]/80" />
        <div className="absolute inset-0 bg-slate-900/25" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center text-white">
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
            Always At Your Service
          </h3>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-blue-50">
            Whether you are planning a transfer or facing an emergency right now,
            our dispatch team is one call away — around the clock, every day.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+6622067153"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] hover:bg-blue-50 px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-md"
            >
              <span>Call +66 2 206 7153</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 border border-white/70 text-white hover:bg-white/10 px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateContact}
              className="inline-flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-bold underline underline-offset-8 decoration-2 decoration-white/50 hover:decoration-white transition-colors"
            >
              Contact the team
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
