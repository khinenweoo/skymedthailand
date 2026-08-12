import { ServiceItem, Testimonial, ValueProp, Category, BlogPost } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    iconName: 'Ambulance',
    title: 'Air Ambulance & Helicopter Rescue',
    description: 'Rapid point-to-point emergency helivac transport with ICUs in the sky, equipped for critical trauma emergencies.',
    badge: '24/7 Priority'
  },
  {
    id: 's2',
    iconName: 'Stethoscope',
    title: 'Urgent Video & Phone Consultation',
    description: 'Immediate access to board-certified emergency medicine physicians and flight doctors within minutes.',
    badge: 'Instant Access'
  },
  {
    id: 's3',
    iconName: 'HeartPulse',
    title: 'Specialist ICU Patient Transport',
    description: 'Ground and airborne specialized critical transport for organ transport, pediatric ICU, and cardiac care.',
  },
  {
    id: 's4',
    iconName: 'ShieldAlert',
    title: 'Disaster Rescue & Remote Evacuation',
    description: 'Specialized search, rescue, and medical evacuation for off-grid locations, mountain trails, and coastal waters.',
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'MARCUS VANDERGRIFT',
    title: 'RECOVERED TRAUMA PATIENT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    quote: 'When my hiking group was stranded in remote terrain, SkyMed’s helicopter rescue team arrived in under 14 minutes. Their flight doctors stabilized me onboard. They literally saved my life.',
    location: 'Denver, Colorado'
  },
  {
    id: 't2',
    author: 'DR. ELENA ROSTOVA',
    title: 'CHIEF OF TRAUMA SURGERY',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    quote: 'SkyMed delivers ICU-level care before the patient even touches our hospital helipad. Their flight paramedics maintain flawless vital tracking throughout air transit.',
    location: 'Metropolitan Medical Center'
  },
  {
    id: 't3',
    author: 'SOPHIA CHEN',
    title: 'FAMILY CARE COORDINATOR',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    quote: 'The urgent consultation portal allowed us to connect with an air medevac specialist immediately. The team guided us smoothly through hospital transfer without stress.',
    location: 'Seattle, Washington'
  }
];

export const VALUE_PROPOSITIONS: ValueProp[] = [
  {
    number: '01',
    title: '12-Minute Target Air Response Time',
    description: 'Our strategically positioned helipads and pre-flighted rescue aircraft ensure immediate airborne response following emergency triage.'
  },
  {
    number: '02',
    title: 'Flying Intensive Care Units (ICU)',
    description: 'Every SkyMed rescue aircraft is outfitted with portable ventilators, cardiac monitors, blood transfusion systems, and full trauma resuscitation gear.'
  },
  {
    number: '03',
    title: 'Board-Certified Flight Physicians',
    description: 'We deploy dual-certified trauma doctors and flight paramedics on every critical air mission to administer emergency life support in-flight.'
  },
  {
    number: '04',
    title: 'Global Medevac & Insurance Coordination',
    description: 'Seamless integration with major healthcare providers and international travel insurance for hassle-free emergency coverage.'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Emergency Rescue', slug: 'emergency-rescue', description: 'Air ambulance and remote triage operational updates.' },
  { id: 'c2', name: 'Air Medevac', slug: 'air-medevac', description: 'Helicopter rescue technology and flight medical standards.' },
  { id: 'c3', name: 'Health & Safety', slug: 'health-safety', description: 'Trauma response tips and immediate first aid guides.' },
  { id: 'c4', name: 'Patient Stories', slug: 'patient-stories', description: 'Inspirational journeys of recovery and rescue.' }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'p1',
    title: 'How SkyMed Air Helicopters Reach Critical Patients in Under 15 Minutes',
    slug: 'how-skymed-helicopters-reach-critical-patients',
    categoryId: 'c1',
    categoryName: 'Emergency Rescue',
    excerpt: 'Explore the satellite positioning systems, pre-flight protocols, and urban helipad networks that make rapid air medical response possible.',
    content: 'When minutes mean the difference between life and death, SkyMed’s rapid dispatch network activates in seconds. Our state-of-the-art Eurocopter and AgustaWestland medical fleet stays staged at high-readiness helipads equipped with satellite telemetry.\n\nUpon receiving an emergency signal, our trauma dispatch team analyzes real-time weather, air space clearance, and hospital landing zones while the flight crew boards. Within 12 to 15 minutes, our flying ICU arrives at the scene to deliver life-saving resuscitation.',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    authorName: 'Capt. James Miller',
    authorRole: 'Head of Aviation Operations',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'p2',
    title: 'Inside the SkyMed Flying ICU: Advanced Life Support in the Clouds',
    slug: 'inside-the-skymed-flying-icu',
    categoryId: 'c2',
    categoryName: 'Air Medevac',
    excerpt: 'Take a virtual tour of our medical helicopters equipped with ECMO machines, ventilators, and real-time vital telemetry systems.',
    content: 'Transporting critical patients by air requires portable medical technology engineered for high-altitude stabilization. Each SkyMed aircraft functions as a complete ICU suite including blood gas analyzers, syringe pumps, invasive arterial monitoring, and portable ECMO circuits.\n\nOur onboard telemetry directly relays real-time cardiac graphs and blood chemistry directly to receiving trauma surgery centers before landing.',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    authorName: 'Dr. Sarah Lin',
    authorRole: 'Flight Medical Director',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'p3',
    title: 'Wilderness & Alpine Emergency Preparation: What to Do While Flight Arrives',
    slug: 'wilderness-alpine-emergency-prep',
    categoryId: 'c3',
    categoryName: 'Health & Safety',
    excerpt: 'Essential steps for outdoor enthusiasts to signal rescue aircraft, prepare landing clearings, and maintain thermal protection.',
    content: 'If an emergency occurs in remote alpine or off-grid environments, knowing how to communicate with air rescue teams is vital. Signal with high-contrast gear or strobe lights, identify wind direction, and keep clear of rotor zones until signaled by flight paramedics.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    authorName: 'Mark Sterling',
    authorRole: 'Senior Rescue Paramedic',
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 9).toISOString()
  }
];
