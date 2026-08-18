import React from "react";
import {
	ArrowRight,
	ShieldCheck,
	Clock,
	HeartPulse,
	Activity,
	PhoneCall,
} from "lucide-react";

interface HeroSectionProps {
	onOpenBooking: () => void;
	onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
	onOpenBooking,
	onExploreServices,
}) => {
	return (
		<section className='relative bg-slate-50/70 overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100'>
			{/* Decorative Modern Background Shapes */}
			{/* 1. Gradient Ambient Glows */}
			<div className='absolute top-0 right-0 -mt-12 -mr-12 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-transparent rounded-full blur-3xl pointer-events-none' />
			<div className='absolute bottom-0 left-0 -mb-16 -ml-16 w-[500px] h-[500px] bg-gradient-to-tr from-sky-300/20 via-blue-200/10 to-transparent rounded-full blur-3xl pointer-events-none' />

			{/* 2. Abstract Grid Overlay */}
			<div
				className='absolute inset-0 opacity-[0.03] pointer-events-none'
				style={{
					backgroundImage: `radial-gradient(#1E293B 1px, transparent 1px)`,
					backgroundSize: "24px 24px",
				}}
			/>

			{/* 3. Curved Modern Backdrop Shape behind right column */}
			<div className='absolute top-1/2 -translate-y-1/2 right-0 w-1/2 h-[85%] bg-gradient-to-l from-blue-50/80 via-indigo-50/40 to-transparent rounded-l-[100px] -z-10 hidden lg:block' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center'>
					{/* Left Column: Copy, CTAs, and Stats */}
					<div className='lg:col-span-7 space-y-6'>
						{/* Main Headline */}
						<h1 className='text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] font-sans'>
							Your Life & Health, <br />
							<span className='bg-gradient-to-r from-[#2563EB] via-indigo-600 to-sky-600 bg-clip-text text-transparent'>
								Our Priority
							</span>{" "}
							<br />
							At SKYMED
						</h1>

						{/* Subtext Paragraph */}
						<p className='text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal'>
							When seconds count, SkyMed Thailand delivers rapid helicopter
							rescue, airborne intensive care, and expert physician dispatch
							across Thailand and Southeast Asia with calm, unyielding
							precision.
						</p>

						{/* Action Buttons */}
						<div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2'>
							{/* <button
								onClick={onOpenBooking}
								className='inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white border border-[#2563EB] px-7 py-3 rounded-full text-base font-semibold shadow-md transition-all active:scale-95'
							>
								<span>Request Air Emergency</span>
								<ArrowRight className='w-5 h-5' />
							</button> */}

							<button
								onClick={onExploreServices}
								className='inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#2563EB] border border-[#2563EB] px-7 py-3 rounded-full text-base font-semibold transition-all active:scale-95'
							>
								<span>Emergency Information</span>
								<ArrowRight className='w-5 h-5' />
							</button>
						</div>
					</div>

					{/* Right Column: Dynamic Image Composition with Floating Badges */}
					<div className='lg:col-span-5 relative mt-4 lg:mt-0'>
						{/* Background Decorative Frame Ring */}
						<div className='absolute -inset-3 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-[40px] opacity-20 blur-xl -z-10' />

						{/* Main Image Frame */}
						<div className='relative rounded-[16px] overflow-hidden border border-white shadow-2xl bg-slate-900 aspect-[4/3] sm:aspect-[1.1/1]'>
							<img
								src='/images/hero.jpg'
								alt='SkyMed air ambulance helicopter on a hospital rooftop helipad at sunset'
								className='w-full h-full object-cover'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent' />
						</div>

						{/* Top-Right Floating Badge: ICU Doctors */}
						<div className='absolute -top-4 -right-2 hidden sm:-right-4 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3'></div>

						{/* Bottom-Left Floating Badge: GPS Dispatch */}
						<div className='absolute -bottom-5 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[260px]'>
							<div className='w-10 h-10 rounded-xl bg-white text-[#2563EB] flex items-center justify-center shrink-0 shadow-md shadow-blue-200'>
								<PhoneCall className='w-5 h-5' />
							</div>
							<div>
								<p className='text-xs font-bold text-slate-900'>
									Direct Helipad Dispatch
								</p>
								<p className='text-[11px] text-slate-500 font-medium'>
									Real-time GPS satellite triage link
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
