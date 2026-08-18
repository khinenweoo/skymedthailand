import React, { useState, useEffect } from 'react';
import { Appointment, User } from '../../types';
import { ADMIN_USER_ID } from '../../lib/firebase';
import { 
  Calendar, 
  Clock, 
  User as UserIcon, 
  Phone, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Clock3, 
  Trash2, 
  PlusCircle, 
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';

interface AppointmentsTabProps {
  user: User;
  onOpenBookingModal?: () => void;
}

export const AppointmentsTab: React.FC<AppointmentsTabProps> = ({ user, onOpenBookingModal }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const isAdmin = user.id === ADMIN_USER_ID || user.role === 'admin';

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const url = isAdmin
        ? '/api/appointments'
        : `/api/appointments?userId=${encodeURIComponent(user.id || user.email)}`;
      
      const res = await fetch(url);
      const data = await res.json();
      let list: Appointment[] = data.appointments || [];

      // If normal user, filter strictly to their own appointments by ID or email
      if (!isAdmin) {
        list = list.filter(a => 
          a.userId === user.id || 
          (user.email && a.patientEmail.toLowerCase() === user.email.toLowerCase())
        );
      }

      setAppointments(list);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (apptId: string, newStatus: 'confirmed' | 'completed' | 'cancelled' | 'pending') => {
    setUpdatingId(apptId);
    try {
      const res = await fetch(`/api/appointments/${apptId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setAppointments(prev => prev.map(a => a.id === apptId ? { ...a, status: newStatus } : a));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesSearch = 
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientPhone.includes(searchQuery);

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold px-3 py-1 rounded-full">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full">
            <Clock3 className="w-3.5 h-3.5" /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider ${
              isAdmin ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-700'
            }`}>
              {isAdmin ? 'Admin Dispatches Manager' : 'Personal Patient Portal'}
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            {isAdmin ? 'All Booked Appointments & Medical Requests' : 'My Booked Appointments'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isAdmin 
              ? 'Review and manage all incoming patient consultation and air ambulance booking requests.'
              : 'Track status and details of your booked air ambulance & consultation appointments.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onOpenBookingModal && (
            <button
              onClick={onOpenBookingModal}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-md shadow-indigo-200 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Inquiry</span>
            </button>
          )}

          <button
            onClick={fetchAppointments}
            disabled={loading}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Admin Filters & Search */}
      {isAdmin && (
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by patient name, email or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'pending' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('confirmed')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'confirmed' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'completed' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      )}

      {/* Appointments List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        
        {loading ? (
          <div className="text-center py-12 text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-indigo-500" />
            <p className="text-xs font-semibold">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-base font-bold text-slate-700">No appointments found</p>
            <p className="text-xs text-slate-400 mt-1">
              {isAdmin 
                ? 'No patient bookings match your current filter.'
                : 'You have not booked any medical appointments yet.'}
            </p>
            {onOpenBookingModal && !isAdmin && (
              <button
                onClick={onOpenBookingModal}
                className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-md transition-all hover:bg-indigo-700"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Send Your First Inquiry</span>
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredAppointments.map((appt) => (
              <div key={appt.id} className="py-6 first:pt-0 last:pb-0 space-y-4">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{appt.serviceType}</h4>
                      <div className="text-xs text-slate-500 mt-0.5 space-x-2">
                        <span>Patient: <strong className="text-slate-800">{appt.patientName}</strong></span>
                        <span>•</span>
                        <span>{appt.patientEmail}</span>
                        <span>•</span>
                        <span>{appt.patientPhone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start md:self-center">
                    {getStatusBadge(appt.status)}
                  </div>
                </div>

                {/* Details Box */}
                <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-600 grid grid-cols-1 md:grid-cols-3 gap-3 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span><strong>Date:</strong> {appt.preferredDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span><strong>Time:</strong> {appt.preferredTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span><strong>Phone:</strong> {appt.patientPhone}</span>
                  </div>
                  {appt.notes && (
                    <div className="md:col-span-3 text-slate-500 pt-1 border-t border-slate-200/60 mt-1">
                      <strong>Notes / Medical Location:</strong> {appt.notes}
                    </div>
                  )}
                </div>

                {/* Admin Action Controls */}
                {isAdmin && (
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 mr-2">Admin Status Action:</span>
                    <button
                      onClick={() => handleUpdateStatus(appt.id, 'confirmed')}
                      disabled={updatingId === appt.id || appt.status === 'confirmed'}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-all disabled:opacity-40"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(appt.id, 'completed')}
                      disabled={updatingId === appt.id || appt.status === 'completed'}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200 transition-all disabled:opacity-40"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(appt.id, 'cancelled')}
                      disabled={updatingId === appt.id || appt.status === 'cancelled'}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 transition-all disabled:opacity-40"
                    >
                      Cancel
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
