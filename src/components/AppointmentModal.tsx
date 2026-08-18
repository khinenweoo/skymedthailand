import React, { useState } from "react";
import {
	X,
	User,
	Phone,
	Mail,
	AlertTriangle,
	CheckCircle2,
} from "lucide-react";
import { User as UserType } from "../types";

interface AppointmentModalProps {
	isOpen: boolean;
	onClose: () => void;
	user: UserType | null;
	onSuccess: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
	isOpen,
	onClose,
	user,
	onSuccess,
}) => {
	const [formData, setFormData] = useState({
		patientName: user?.name || "",
		patientEmail: user?.email || "",
		patientPhone: user?.phone || "",
		serviceType: "General Information",
		notes: "",
	});

	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);

		try {
			const res = await fetch("/api/appointments", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: user?.id,
					emergencyLevel: "normal",
					...formData,
				}),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Failed to send inquiry");
			}

			setSubmitted(true);
			setTimeout(() => {
				onSuccess();
				setSubmitted(false);
				onClose();
			}, 2000);
		} catch (err: any) {
			setError(err.message || "An error occurred while sending your inquiry");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className='fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4'>
			<div className='bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col relative shadow-2xl overflow-hidden'>
				{/* Modal Header */}
				<div className='p-6 sm:p-8 pb-4 border-b border-slate-100 relative shrink-0'>
					<button
						onClick={onClose}
						type='button'
						aria-label='Close inquiry form'
						className='absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10'
					>
						<X className='w-5 h-5' />
					</button>

					<h2 className='text-2xl font-bold text-slate-900 mt-2'>
						Send Us an Inquiry
					</h2>
					{/* <p className='text-xs text-slate-500 mt-1'>
						Tell us how to reach you and what you'd like to know — our team
						replies within 24 hours.
					</p> */}
				</div>

				{/* Modal Body (Scrollable) */}
				<div className='p-6 sm:p-8 overflow-y-auto flex-1'>
					{submitted ? (
						<div className='text-center py-10'>
							<div className='w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4'>
								<CheckCircle2 className='w-10 h-10' />
							</div>
							<h3 className='text-2xl font-bold text-slate-900 mb-2'>
								Inquiry Sent!
							</h3>
							<p className='text-sm text-slate-600'>
								Thank you — the SkyMed team has received your inquiry and a
								coordinator will get back to you shortly.
							</p>
						</div>
					) : (
						<form
							id='inquiry-form'
							onSubmit={handleSubmit}
							className='space-y-4'
						>
							{error && (
								<div className='p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium flex items-center gap-2'>
									<AlertTriangle className='w-4 h-4 shrink-0' />
									<span>{error}</span>
								</div>
							)}

							{/* Inquiry Topic */}
							<div>
								<label className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1'>
									What is your inquiry about?
								</label>
								<select
									value={formData.serviceType}
									onChange={(e) =>
										setFormData({ ...formData, serviceType: e.target.value })
									}
									className='w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white text-slate-800'
								>
									<option value='General Information'>
										General information about SkyMed
									</option>
									<option value='Air Ambulance & Helicopter Rescue'>
										Air ambulance & helicopter rescue
									</option>
									<option value='Specialist ICU Patient Transport'>
										Specialist ICU patient transport
									</option>
									<option value='International Repatriation'>
										International repatriation / getting home
									</option>
									<option value='Costs & Quotation'>
										Costs & requesting a quotation
									</option>
									<option value='Membership & Coverage Plans'>
										Membership & coverage plans
									</option>
									<option value='Partnership & Media'>
										Partnership, careers & media
									</option>
									<option value='Other'>Something else</option>
								</select>
							</div>

							{/* Contact Info */}
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
								<div>
									<label className='block text-xs font-semibold text-slate-700 mb-1'>
										Full Name
									</label>
									<div className='relative'>
										<User className='w-4 h-4 text-slate-400 absolute left-3 top-3' />
										<input
											type='text'
											required
											placeholder='e.g. John Doe'
											value={formData.patientName}
											onChange={(e) =>
												setFormData({
													...formData,
													patientName: e.target.value,
												})
											}
											className='w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]'
										/>
									</div>
								</div>

								<div>
									<label className='block text-xs font-semibold text-slate-700 mb-1'>
										Phone Number
									</label>
									<div className='relative'>
										<Phone className='w-4 h-4 text-slate-400 absolute left-3 top-3' />
										<input
											type='tel'
											required
											placeholder='+66 2 206 7153'
											value={formData.patientPhone}
											onChange={(e) =>
												setFormData({
													...formData,
													patientPhone: e.target.value,
												})
											}
											className='w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]'
										/>
									</div>
								</div>
							</div>

							<div>
								<label className='block text-xs font-semibold text-slate-700 mb-1'>
									Email Address
								</label>
								<div className='relative'>
									<Mail className='w-4 h-4 text-slate-400 absolute left-3 top-3' />
									<input
										type='email'
										required
										placeholder='you@example.com'
										value={formData.patientEmail}
										onChange={(e) =>
											setFormData({ ...formData, patientEmail: e.target.value })
										}
										className='w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]'
									/>
								</div>
							</div>

							{/* Message */}
							<div>
								<label className='block text-xs font-semibold text-slate-700 mb-1'>
									Your Message
								</label>
								<textarea
									rows={4}
									placeholder='Tell us a little more about your inquiry so we can point you to the right person...'
									value={formData.notes}
									onChange={(e) =>
										setFormData({ ...formData, notes: e.target.value })
									}
									className='w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]'
								/>
							</div>

							<p className='text-[11px] text-slate-500 leading-relaxed'>
								This form is for general inquiries only. If you are facing a
								medical emergency right now, please call{" "}
								<a
									href='tel:+6622067153'
									className='font-bold text-[#2563EB] hover:underline'
								>
									+66 2 206 7153
								</a>{" "}
								instead.
							</p>
						</form>
					)}
				</div>

				{/* Modal Footer with Explicit Cancel & Submit Buttons */}
				{!submitted && (
					<div className='p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0'>
						<button
							type='button'
							onClick={onClose}
							className='px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-colors'
						>
							Cancel
						</button>
						<button
							type='submit'
							form='inquiry-form'
							disabled={submitting}
							className='px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-md shadow-blue-200 disabled:opacity-50'
						>
							{submitting ? "Sending..." : "Send Inquiry"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
