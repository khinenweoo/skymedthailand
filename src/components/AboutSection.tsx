import React from "react";
import {
	Plane,
	Stethoscope,
	ShieldCheck,
	CheckCircle2,
	Award,
	ArrowRight,
} from "lucide-react";

interface AboutSectionProps {
	onOpenBooking?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
	onOpenBooking,
}) => {
	return (
		<section
			id='about'
			className='relative bg-white text-slate-900 pt-16 lg:pt-28 overflow-hidden border-t border-slate-100'
		>
			{/* Decorative Modern Background Elements */}
			{/* 1. Subtle Radial Gradient Blobs */}
			<div className='absolute top-1/3 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -translate-x-1/2' />
			<div className='absolute bottom-10 right-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none translate-x-1/3' />

			{/* 2. Abstract Dot Grid Matrix */}
			<div
				className='absolute inset-0 opacity-[0.025] pointer-events-none'
				style={{
					backgroundImage: `radial-gradient(#0F172A 1px, transparent 1px)`,
					backgroundSize: "28px 28px",
				}}
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				{/* Main Grid: Visual Frame on Left, Text & Feature Matrix on Right */}
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 lg:mb-24'>
					{/* Left Column: Asymmetric Modern Photo Collage with Badge */}
					<div className='lg:col-span-6 relative'>
						{/* Background Accent Backdrop Box */}
						<div className='absolute -inset-4 bg-gradient-to-tr from-blue-50 via-indigo-50 to-sky-50 rounded-[44px] -z-10 border border-blue-100/60' />

						<div className='grid grid-cols-12 gap-4 items-center'>
							{/* Primary Main Image */}
							<div className='col-span-8 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/5] relative'>
								<img
									src='/images/about-main.jpg'
									alt='SkyMed Emergency Rescue Helicopter'
									className='w-full h-full object-cover'
									referrerPolicy='no-referrer'
								/>
							</div>

							{/* Secondary Stacked Image & Experience Badge */}
							<div className='col-span-4 space-y-4'>
								<div className='rounded-[24px] overflow-hidden shadow-lg border-2 border-white bg-slate-100 aspect-square'>
									<img
										src='/images/about-secondary.jpg'
										alt='SkyMed flight medical crew standing beside an air ambulance helicopter'
										className='w-full h-full object-cover'
									/>
								</div>

								{/* Stat Box Badge */}
								<div className='bg-[#2563EB] text-white p-4 rounded-[24px] shadow-xl text-center border border-blue-400'>
									<Award className='w-6 h-6 mx-auto mb-1 text-blue-200' />
									<span className='block text-xl font-black'>15+ Yrs</span>
									<span className='text-[10px] font-semibold tracking-wider text-blue-100 uppercase'>
										Aviation Care
									</span>
								</div>
							</div>
						</div>

						{/* Overlapping Bottom Glass Card */}
						<div className='absolute -bottom-6 left-6 right-6 sm:left-10 sm:right-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0'>
									<ShieldCheck className='w-5 h-5' />
								</div>
								<div>
									<h4 className='text-xs font-bold text-slate-900'>
										FAA & CAAT Medical Certified
									</h4>
									<p className='text-[11px] text-slate-500'>
										Highest Aviation & Healthcare Standards
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column: About Narrative & Key Strengths */}
					<div className='lg:col-span-6 space-y-6 pt-6 lg:pt-0'>
						{/* Headline */}
						<h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]'>
							When Every Minute Counts, We're Already In The Air
						</h2>

						{/* Main Narrative Paragraph */}
						<p className='text-slate-600 text-base sm:text-lg leading-relaxed'>
							An emergency rarely happens somewhere convenient. It happens on an
							island, on a mountain road, hours from the nearest hospital.
							SkyMed exists for exactly those moments — a network of air
							ambulances and airborne ICU units across Thailand, crewed by
							emergency doctors, critical care paramedics and pilots who treat
							your family the way they would want their own treated.
						</p>

						{/* Feature Highlights Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2'>
							<div className='p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3'>
								<div className='w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5'>
									<Plane className='w-4 h-4 -rotate-45' />
								</div>
								<div>
									<h4 className='text-sm font-bold text-slate-900'>
										A Hospital That Flies
									</h4>
									<p className='text-xs text-slate-500 mt-0.5'>
										Helicopters fitted with full ICU life-support, so care never
										pauses.
									</p>
								</div>
							</div>

							<div className='p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3'>
								<div className='w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5'>
									<Stethoscope className='w-4 h-4' />
								</div>
								<div>
									<h4 className='text-sm font-bold text-slate-900'>
										A Doctor Beside You
									</h4>
									<p className='text-xs text-slate-500 mt-0.5'>
										Emergency physicians on board for cardiac, trauma and
										children's care.
									</p>
								</div>
							</div>
						</div>

						{/* Checklist */}
						<div className='space-y-2.5 pt-1'>
							{[
								"We land on the hospital helipad, with the trauma team already waiting",
								"We handle the insurance paperwork so your family doesn't have to",
								"Ground ambulances at both ends — we take it from door to door",
							].map((text, i) => (
								<div
									key={i}
									className='flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700'
								>
									<CheckCircle2 className='w-4 h-4 text-[#2563EB] shrink-0' />
									<span>{text}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* ===== Full-Width Banner 1: Always At Your Service ===== */}
			{/* Sits outside the max-w-7xl container so it bleeds edge to edge. */}
			<div className='relative z-10 isolate overflow-hidden'>
				<img
					src='/images/hero2.jpg'
					alt=''
					aria-hidden='true'
					className='absolute inset-0 w-full h-full object-cover'
				/>
				{/* Brand-blue tint, identical on both banners, plus a flat neutral
				    darkening layer so body text clears contrast over any photo. */}
				<div className='absolute inset-0 bg-[#2563EB]/80' />
				<div className='absolute inset-0 bg-slate-900/25' />

				<div className='relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 text-center text-white'>
					<h3 className='text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight'>
						Always At Your Service
					</h3>

					<a
						href='#services'
						className='mt-5 inline-block text-base sm:text-lg font-semibold underline underline-offset-8 decoration-2 decoration-white/60 hover:decoration-white transition-colors'
					>
						View Air Ambulance Services
					</a>

					<p className='mt-6 text-base sm:text-lg leading-relaxed'>
						In a world where emergencies can strike at any moment, certainty and
						trust matter more than anything. At{" "}
						<strong className='font-bold'>SKYMED</strong>, we live by the
						promise of being <em className='italic'>Always At Your Service</em>,
						a commitment that goes beyond words and defines everything we do.
					</p>

					<div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-4'>
						{/* <a
							href='tel:+6622067153'
							className='inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] hover:bg-blue-50 px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-md'
						>
							<span>Call +66 2 206 7153</span>
							<ArrowRight className='w-4 h-4' />
						</a> */}

						{onOpenBooking && (
							<button
								onClick={onOpenBooking}
								className='inline-flex items-center justify-center gap-2 border border-white/70 text-white hover:bg-white/10 px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95'
							>
								<span>Send an Inquiry</span>
								<ArrowRight className='w-4 h-4' />
							</button>
						)}
					</div>
				</div>
			</div>

			{/* ===== Full-Width Banner 2: Careers ===== */}
			<div className='relative z-10 isolate overflow-hidden'>
				<img
					src='/images/about-secondary.jpg'
					alt=''
					aria-hidden='true'
					className='absolute inset-0 w-full h-full object-cover'
				/>
				<div className='absolute inset-0 bg-[#2563EB]/80' />
				<div className='absolute inset-0 bg-slate-900/25' />
			</div>
		</section>
	);
};
