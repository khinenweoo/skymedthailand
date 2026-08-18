import React from "react";
import { ArrowRight } from "lucide-react";

interface UrgentConsultationsSectionProps {
	onOpenBooking?: () => void;
}

export const UrgentConsultationsSection: React.FC<
	UrgentConsultationsSectionProps
> = ({ onOpenBooking }) => {
	return (
		<section className='bg-white py-16 sm:py-24 border-t border-slate-100'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch'>
					{/* Left Column: Stacked Images Collage */}
					<div className='lg:col-span-6 relative flex items-center'>
						<div className='grid grid-cols-2 gap-4 w-full'>
							<div className='rounded-[28px] overflow-hidden shadow-lg aspect-square bg-slate-100'>
								<img
									src='/images/helicopter.jpg'
									alt='SkyMed Pilot'
									className='w-full h-full object-cover'
									referrerPolicy='no-referrer'
								/>
							</div>
							<div className='rounded-[28px] overflow-hidden shadow-lg aspect-square bg-slate-100 mt-6 sm:mt-8'>
								<img
									src='/images/care.jpg'
									alt='SkyMed Helicopter on tarmac'
									className='w-full h-full object-cover'
									referrerPolicy='no-referrer'
								/>
							</div>
						</div>
					</div>

					{/* Right Column: Solid Vibrant Royal Blue Banner Card */}
					<div className='lg:col-span-6 bg-[#3563E9] p-8 sm:p-12 rounded-[28px] text-white flex flex-col justify-center shadow-xl'>
						<h2 className='text-3xl sm:text-4xl font-black text-white mb-6'>
							Care Without Delay
						</h2>

						<p className='text-white/90 text-base sm:text-lg leading-relaxed mb-8'>
							Care Without Delay Skymed delivers calm, responsive medical care
							when every second matters, combining experienced professionals,
							thoughtful support, and elevated standards from first contact to
							recovery.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
