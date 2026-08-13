import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  ArrowRight,
} from 'lucide-react';
import { User } from '../../types';
import { PageHero } from './PageHero';

interface ContactPageProps {
  user: User | null;
  onOpenBooking: () => void;
  onNavigateHome: () => void;
}

const ENQUIRY_TYPES = [
  'Air Ambulance & Helicopter Rescue',
  'International Repatriation',
  'Ground Critical Care Transfer',
  'Medical Standby & Events',
  'Insurance & Billing',
  'General Enquiry',
];

// TODO(skymed): confirm before launch — the phone number is taken from the
// existing site copy, but the email address and location line below are
// placeholders and have not been verified against the real business details.
const CHANNELS = [
  {
    icon: Phone,
    title: '24/7 Dispatch Line',
    lines: ['+66 2 206 7153'],
    href: 'tel:+6622067153',
    action: 'Call now',
    accent: true,
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@skymedthailand.com'],
    href: 'mailto:info@skymedthailand.com',
    action: 'Send an email',
  },
  {
    icon: MapPin,
    title: 'Operations Base',
    lines: ['Bangkok, Thailand'],
    action: 'Address on request',
  },
  {
    icon: Clock,
    title: 'Availability',
    lines: ['Dispatch: 24 hours, every day', 'Office: Mon–Fri, 09:00–18:00 ICT'],
    action: 'Emergencies never queue',
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({
  user,
  onOpenBooking,
  onNavigateHome,
}) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    subject: ENQUIRY_TYPES[0],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      // The backend exposes a single intake endpoint (/api/appointments); website
      // enquiries land there too. Both serviceType and notes carry an "Enquiry"
      // marker so staff can tell them apart from real bookings in the dashboard,
      // and urgency is always 'normal' — genuine emergencies are routed to the
      // phone line, never to a form.
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || '',
          patientName: form.name,
          patientEmail: form.email,
          patientPhone: form.phone,
          serviceType: `Enquiry — ${form.subject}`,
          emergencyLevel: 'normal',
          notes: `[Website enquiry, no date requested] ${form.message}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not send your message.');

      setStatus('sent');
      setForm((prev) => ({ ...prev, phone: '', message: '' }));
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const inputClass =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all';

  return (
    <main className="bg-white">
      <PageHero
        eyebrow="Contact"
        title="Talk To A Medical Coordinator, Not A Call Queue"
        subtitle="Whether it is a live emergency, a planned transfer or an insurance question, the fastest route is a direct line to our dispatch desk — open every hour of the year."
        image="/images/clinic.jpg"
        onNavigateHome={onNavigateHome}
      />

      {/* Emergency banner */}
      <section className="bg-[#1E2856]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
            <p className="text-sm font-semibold">
              In a life-threatening emergency, call us directly — do not wait for a
              form reply.
            </p>
          </div>
          <a
            href="tel:+6622067153"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] px-6 py-2.5 rounded-full text-sm font-bold transition-colors active:scale-95 shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>+66 2 206 7153</span>
          </a>
        </div>
      </section>

      {/* Channel cards */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHANNELS.map(({ icon: Icon, title, lines, href, action, accent }) => {
              const card = (
                <>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                      accent
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                  {lines.map((line) => (
                    <p key={line} className="text-sm text-slate-600 leading-relaxed">
                      {line}
                    </p>
                  ))}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB]">
                    {action}
                    {href && <ArrowRight className="w-3.5 h-3.5" />}
                  </span>
                </>
              );

              const shared =
                'group block bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300';

              return href ? (
                <a key={title} href={href} className={shared}>
                  {card}
                </a>
              ) : (
                <div key={title} className={shared}>
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + side panel */}
      <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 sm:p-10">
                <span className="inline-block bg-blue-50 text-[#2563EB] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100 mb-4">
                  Send an enquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Tell us what you need
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  A coordinator reviews every message and replies with next steps,
                  usually within one working hour.
                </p>

                {status === 'sent' ? (
                  <div className="mt-8 rounded-[24px] bg-blue-50 border border-blue-100 p-8 text-center">
                    <CheckCircle2 className="w-10 h-10 text-[#2563EB] mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-900">
                      Your enquiry has reached our team
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      We have logged your request and a coordinator will be in touch.
                      For anything urgent, please call{' '}
                      <a href="tel:+6622067153" className="font-bold text-[#2563EB]">
                        +66 2 206 7153
                      </a>
                      .
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] underline underline-offset-4"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Full name
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Phone
                        </label>
                        <input
                          required
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="+66 ..."
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Enquiry about
                        </label>
                        <select
                          value={form.subject}
                          onChange={(e) => update('subject', e.target.value)}
                          className={inputClass}
                        >
                          {ENQUIRY_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder="Patient condition, pickup location, destination hospital, timing, insurer…"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {status === 'error' && (
                      <p className="flex items-center gap-2 text-sm font-semibold text-red-600">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-md"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      This form is for non-urgent enquiries. For an active
                      emergency, call{' '}
                      <a href="tel:+6622067153" className="font-bold text-[#2563EB]">
                        +66 2 206 7153
                      </a>{' '}
                      — the line is answered day and night.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Side panel */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-[32px] overflow-hidden border border-slate-100 shadow-sm bg-slate-100 aspect-[4/3]">
                <img
                  src="/images/clinic.jpg"
                  alt="SkyMed operations and medical coordination base"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-[#1E2856] text-white rounded-[32px] p-8 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Prefer to book directly?</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  If you already know the service and date you need, the booking form
                  captures everything our dispatch desk requires to confirm.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-full text-sm font-bold transition-colors active:scale-95"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Follow SkyMed
                </h3>
                <div className="flex items-center gap-2">
                  {/* Same placeholder anchors the footer uses — swap in real profile URLs. */}
                  {[
                    { Icon: Facebook, href: '#facebook', label: 'Facebook' },
                    { Icon: Twitter, href: '#twitter', label: 'Twitter' },
                    { Icon: Youtube, href: '#youtube', label: 'YouTube' },
                    { Icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-[#2563EB] text-[#2563EB] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};
