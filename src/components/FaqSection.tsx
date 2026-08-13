import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";

interface FaqItem {
	question: string;
	answer: string;
}

const FAQS: FaqItem[] = [
	{
		question:
			"How fast can a SkyMed medical helicopter dispatch after a request?",
		answer:
			"Our average airborne emergency dispatch time is under 8 minutes from the moment satellite triage confirms flight clearance and helipad authorization.",
	},
	{
		question: "What medical equipment and staff are on board during transport?",
		answer:
			"Every SkyMed flight is staffed by dual-certified ICU flight paramedics and flight surgeons. Our aircraft are equipped as airborne ICUs with mechanical ventilators, cardiac monitors, defibrillators, blood transfusion capabilities, and emergency resuscitation medication.",
	},
	{
		question:
			"How does insurance coverage and billing work for air medical rescue?",
		answer:
			"SkyMed collaborates directly with major international travel insurance providers, private health networks, and medevac insurance plans. Our dedicated patient advocacy team handles pre-authorizations and direct billing wherever applicable.",
	},
	{
		question: "Can a family member accompany the patient in the aircraft?",
		answer:
			"Yes, subject to total aircraft payload limits, weather clearance, and the patient's immediate clinical status. The lead flight surgeon makes the final determination to guarantee patient safety.",
	},
	{
		question: "What regions does SkyMed Thailand cover?",
		answer:
			"SkyMed operates 24/7 across all provinces of Thailand, coastal islands, and cross-border medical evacuation routes within Southeast Asia.",
	},
	{
		question: "How do I schedule a non-emergency inter-hospital air transfer?",
		answer:
			"Non-emergency inter-facility transfers can be requested through our online appointment portal or by calling our 24/7 dispatch line to coordinate receiving bed availability and doctor-to-doctor handover.",
	},
];

interface FaqSectionProps {
	onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
	const [openIdx, setOpenIdx] = useState<number | null>(0);

	const toggleFaq = (index: number) => {
		setOpenIdx(openIdx === index ? null : index);
	};

	return (
		<section
			className='py-20 md:py-28 bg-slate-50 border-t border-slate-200/60'
			id='faq'
		>
			<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] tracking-tight'>
						Frequently Asked Questions
					</h2>
					<p className='mt-4 text-base sm:text-lg text-slate-600'>
						Clear answers regarding emergency dispatch, flight safety, insurance
						coverage, and patient transfers.
					</p>
				</div>

				{/* Accordion Container */}
				<div className='space-y-4'>
					{FAQS.map((faq, idx) => {
						const isOpen = openIdx === idx;
						return (
							<div
								key={idx}
								className='bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-200'
							>
								<button
									onClick={() => toggleFaq(idx)}
									className='w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-lg hover:text-[#2563EB] transition-colors focus:outline-none'
								>
									<span className='text-slate-900'>{faq.question}</span>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? "bg-blue-50 text-[#2563EB] rotate-180" : "bg-slate-100 text-slate-500"}`}
									>
										<ChevronDown className='w-5 h-5' />
									</div>
								</button>

								{isOpen && (
									<div className='px-6 pb-6 pt-1 text-slate-600 text-base leading-relaxed border-t border-slate-100'>
										{faq.answer}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
