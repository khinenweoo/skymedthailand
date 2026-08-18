import React from "react";
import { Layers, Layout, Briefcase } from "lucide-react";

export const ValuePropositionsSection: React.FC = () => {
	return (
		<section className='bg-white py-16 sm:py-24 border-t border-slate-100 overflow-hidden'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center'>
					{/* Left Column: Heading, Text, and 2 Feature Badges with Curved Backdrop */}
					<div className='lg:col-span-6 relative'>
						{/* Subtle background arc shape */}
						<div className='absolute -left-12 -top-12 w-96 h-96 bg-[#F3F5F9] rounded-full -z-10 blur-2xl opacity-80' />

						<h2 className='text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-[#1E293B] leading-tight mb-6'>
							We Provides All Facilities For Your Health Environment
						</h2>

						<p className='text-slate-600 text-base sm:text-lg leading-relaxed mb-8'>
							At The Skymed Thailand, we provide advanced medical transport and
							urgent care delivered safely, comfortably, and without delay, day
							or night. Clear communication keeps patients, families, and care
							teams informed throughout every critical journey.
						</p>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
							<div className='flex items-center gap-4'>
								<div className='w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0'>
									<Layers className='w-5 h-5' />
								</div>
								<span className='text-base font-bold text-slate-900'>
									Flexible Environment
								</span>
							</div>

							<div className='flex items-center gap-4'>
								<div className='w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0'>
									<Layout className='w-5 h-5' />
								</div>
								<span className='text-base font-bold text-slate-900'>
									Fully Custom Space
								</span>
							</div>
						</div>
					</div>

					{/* Right Column: Critical Care Crew Photo with Floating Royal Blue Card */}
					<div className='lg:col-span-6 relative'>
						<div className='rounded-[32px] overflow-hidden shadow-xl bg-slate-100 aspect-[4/3] border-4 border-white'>
							<img
								src='/images/clinic.png'
								alt='SkyMed critical care crew treating a patient beside an air ambulance'
								className='w-full h-full object-cover'
								referrerPolicy='no-referrer'
							/>
						</div>

						{/* Overlapping Floating Royal Blue Card */}
						<div className='relative lg:absolute -bottom-4 left-4 lg:-left-6 max-w-sm bg-[#3563E9] text-white p-6 rounded-2xl shadow-xl border-2 border-white mt-6 lg:mt-0'>
							<div className='w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3'>
								<Briefcase className='w-5 h-5 text-white' />
							</div>
							<h4 className='text-lg font-bold text-white mb-2'>
								Trusted Care
							</h4>
							<p className='text-xs sm:text-sm text-white/90 leading-relaxed'>
								Skymed responded with remarkable speed, compassion, and
								professionalism when our family needed urgent medical support.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
