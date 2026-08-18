import React from "react";
import { Clock, UserCheck, HeartPulse } from "lucide-react";
import { AvailabilityDisclaimer } from "./AvailabilityDisclaimer";

interface ServicesSectionProps {
	onOpenBooking?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = () => {
	return (
		<section
			id='services'
			className='bg-white py-16 sm:py-24 border-t border-slate-100'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Centered Heading */}
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-[#1E293B] tracking-tight'>
						Experience Healthcare Beyond The Ordinary
					</h2>
					<p className='mt-4 text-base sm:text-lg text-slate-600'>
						Rapid emergency response from experienced medical teams, coordinated
						with calm precision when every second matters.
					</p>
				</div>

				{/* 3-Column Card Grid */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{/* Card 1: Fast Response */}
					<div className='bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow'>
						<div className='w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6'>
							<Clock className='w-5 h-5' />
						</div>
						<h3 className='text-xl font-bold text-slate-900 mb-3'>
							Fast Response
						</h3>
						<p className='text-sm text-slate-600 leading-relaxed'>
							With round-the-clock access, you can work anytime your creativity
							strikes.
						</p>
					</div>

					{/* Card 2: Trusted Care */}
					<div className='bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow'>
						<div className='w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6'>
							<UserCheck className='w-5 h-5' />
						</div>
						<h3 className='text-xl font-bold text-slate-900 mb-3'>
							Trusted Care
						</h3>
						<p className='text-sm text-slate-600 leading-relaxed'>
							Work with our medical teams, thoughtfully environment that boosts
							creativity.
						</p>
					</div>

					{/* Card 3: 24/7 Services */}
					<div className='bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow'>
						<div className='w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6'>
							<HeartPulse className='w-5 h-5' />
						</div>
						<h3 className='text-xl font-bold text-slate-900 mb-3'>
							24/7 Services
						</h3>
						<p className='text-sm text-slate-600 leading-relaxed'>
							We will care you around the clock and always ready.
						</p>

						{/* Short qualifier — the full note lives on the inner pages. */}
						<AvailabilityDisclaimer variant='short' className='mt-4' />
					</div>
				</div>
			</div>
		</section>
	);
};
