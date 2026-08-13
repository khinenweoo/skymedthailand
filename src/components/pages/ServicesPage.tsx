import React from 'react';
import {
  Plane,
  Ambulance,
  HeartPulse,
  Baby,
  Globe2,
  UserCheck,
  Clock,
  Radio,
  ShieldCheck,
  Building2,
  PhoneCall,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PageHero } from './PageHero';

interface ServicesPageProps {
  onOpenBooking: () => void;
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

const CORE_SERVICES = [
  {
    icon: Plane,
    title: 'Helicopter Air Ambulance',
    body:
      'Rotary-wing medevac for scene response and inter-hospital transfer, with direct helipad access to partner trauma centres.',
    points: ['Scene-of-incident pickup', 'Airborne ICU life support', 'Sub-hour urban response'],
    featured: true,
  },
  {
    icon: Globe2,
    title: 'Fixed-Wing Repatriation',
    body:
      'Long-range transfers and international repatriation with a stretcher-configured cabin and medical escort throughout.',
    points: ['Cross-border clearance', 'Insurer coordination', 'Family seat available'],
  },
  {
    icon: Ambulance,
    title: 'Ground Critical Care',
    body:
      'Mobile ICU ambulances that close the gap between the aircraft and the ward, so care never pauses at the handover.',
    points: ['Door-to-door transfer', 'Airport apron pickup', 'Same clinical team'],
  },
  {
    icon: HeartPulse,
    title: 'Cardiac & Trauma Transfer',
    body:
      'Time-critical transport for STEMI, stroke and major trauma, staged with the receiving unit before wheels-up.',
    points: ['Pre-arrival unit staging', 'Onboard monitoring', 'Flight physician on board'],
  },
  {
    icon: Baby,
    title: 'Neonatal & Pediatric',
    body:
      'Transport incubator, paediatric airway kit and specialist crew for our smallest and most fragile patients.',
    points: ['Transport incubator', 'Paediatric-trained crew', 'Parent accompaniment'],
  },
  {
    icon: UserCheck,
    title: 'Medical Standby & Events',
    body:
      'Dedicated aircraft, clinicians and evacuation planning for expeditions, film shoots, offshore sites and major events.',
    points: ['On-site medical team', 'Evacuation planning', 'Contracted readiness'],
  },
];

const PROCESS = [
  {
    icon: PhoneCall,
    step: '01',
    title: 'One call to dispatch',
    body: 'A coordinator takes the clinical picture, location and insurer details in a single conversation.',
  },
  {
    icon: ClipboardList,
    step: '02',
    title: 'Clinical triage',
    body: 'Our flight physician determines aircraft type, crew configuration and the right receiving facility.',
  },
  {
    icon: Plane,
    step: '03',
    title: 'Launch & in-flight care',
    body: 'Crew lifts off with the ICU suite live, transmitting patient status ahead to the destination team.',
  },
  {
    icon: Building2,
    step: '04',
    title: 'Hospital handover',
    body: 'Direct helipad arrival, bedside handover to the waiting unit, and a written mission report to the family.',
  },
];

const INCLUDED = [
  'Flight physician and critical care paramedic on every mission',
  'Ventilator, defibrillator, infusion pumps and full monitoring suite',
  'Direct billing and guarantee-of-payment with major insurers',
  'Receiving hospital coordination and bed confirmation before departure',
  'Ground ambulance legs at both ends of the flight',
  'Continuous family updates from dispatch to handover',
];

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onNavigateHome,
  onNavigateContact,
}) => {
  return (
    <main className="bg-white">
      <PageHero
        eyebrow="Services"
        title="Air Ambulance Services Built Around Critical Time"
        subtitle="From scene response to international repatriation, every SkyMed service is flown with an airborne ICU, a senior flight physician and a receiving hospital already standing by."
        image="/images/helicopter.jpg"
        onNavigateHome={onNavigateHome}
      />

      {/* Quick assurance strip */}
      <section className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Clock, label: '24/7 dispatch', sub: 'Never closed, never queued' },
            { icon: Radio, label: 'Single coordinator', sub: 'One owner per mission' },
            { icon: ShieldCheck, label: 'FAA & CAAT certified', sub: 'Audited crew and aircraft' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{label}</h4>
                <p className="text-xs text-slate-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core services */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block bg-blue-50 text-[#2563EB] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100 mb-4">
              What We Fly
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] tracking-tight">
              Six Ways We Reach Your Patient
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Each service runs the same clinical standard — what changes is the
              aircraft, the crew configuration and the distance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SERVICES.map(({ icon: Icon, title, body, points, featured }) => (
              <article
                key={title}
                className={`group rounded-[32px] p-8 border transition-all duration-300 flex flex-col ${
                  featured
                    ? 'bg-[#1E2856] border-[#1E2856] text-white shadow-xl shadow-slate-300/50'
                    : 'bg-white border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                    featured
                      ? 'bg-white/10 text-blue-200'
                      : 'bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <h3
                  className={`text-xl font-bold mb-3 ${
                    featured ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    featured ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {body}
                </p>

                <ul className="space-y-2 mt-auto">
                  {points.map((p) => (
                    <li
                      key={p}
                      className={`flex items-center gap-2 text-xs font-semibold ${
                        featured ? 'text-blue-100' : 'text-slate-700'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          featured ? 'text-blue-300' : 'text-[#2563EB]'
                        }`}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] tracking-tight">
              How A Mission Runs
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Four stages, one coordinator, no handoff gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map(({ icon: Icon, step, title, body }) => (
              <div
                key={step}
                className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="absolute top-6 right-6 text-3xl font-black text-slate-100 select-none">
                  {step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-50 via-indigo-50 to-sky-50 rounded-[44px] -z-10 border border-blue-100/60" />
              <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/5]">
                <img
                  src="/images/care.jpg"
                  alt="SkyMed medical crew providing in-flight intensive care"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Every Mission Includes
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                There is no stripped-back tier. The clinical package below travels
                with every SkyMed transfer, whatever the distance or the aircraft.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INCLUDED.map((item) => (
                  <div
                    key={item}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-md"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onNavigateContact}
                  className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="relative isolate overflow-hidden">
        <img
          src="/images/hero2.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2563EB]/80" />
        <div className="absolute inset-0 bg-slate-900/25" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center text-white">
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
            Emergency? Skip The Form.
          </h3>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-blue-50">
            Our dispatch line is answered by a medical coordinator, not a queue.
            Call now and we will begin triage while you talk.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+6622067153"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] hover:bg-blue-50 px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+66 2 206 7153</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 border border-white/70 text-white hover:bg-white/10 px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95"
            >
              <span>Schedule Non-Urgent Transfer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
