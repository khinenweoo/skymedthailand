import React, { useState } from 'react';
import { User } from '../../types';
import { ADMIN_USER_ID } from '../../lib/firebase';
import { AllUsersTab } from './AllUsersTab';
import { ImageStorageTab } from './ImageStorageTab';
import { CategoryManagementTab } from './CategoryManagementTab';
import { BlogManagementTab } from './BlogManagementTab';
import { UserProfileTab } from './UserProfileTab';
import { AppointmentsTab } from './AppointmentsTab';
import { 
  Users, 
  Image, 
  Tag, 
  BookOpen, 
  User as UserIcon, 
  Calendar, 
  LogOut, 
  ArrowLeft, 
  ShieldCheck,
  UserCheck,
  Search,
  Sun,
  Bell,
  Grid,
  Languages,
  Clock,
  LayoutGrid
} from 'lucide-react';

interface DashboardViewProps {
  user: User;
  onLogout: () => void;
  onNavigateHome: () => void;
  onUpdateUser: (updatedUser: User) => void;
  onOpenBookingModal?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onLogout,
  onNavigateHome,
  onUpdateUser,
  onOpenBookingModal,
}) => {
  const isAdmin = user.id === ADMIN_USER_ID || user.role === 'admin';

  // State for active menu item: defaults to 'crm' (Overview) for Admin, or 'appointments' for Patient
  const [activeTab, setActiveTab] = useState<string>(isAdmin ? 'crm' : 'appointments');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-[#F8F7FA] text-[#4B465C] font-sans flex flex-col antialiased selection:bg-[#7367F0]/20 selection:text-[#7367F0]">
      
      {/* Container holding Sidebar + Main Content Area */}
      <div className="flex flex-1 w-full min-h-screen">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-64 sm:w-72 bg-white border-r border-[#E6E5E8] flex flex-col shrink-0 min-h-screen sticky top-0 h-screen z-30 shadow-[0_2px_12px_0_rgba(67,54,121,0.05)] overflow-y-auto">
          
          {/* Brand Header */}
          <div className="p-5 flex items-center justify-between border-b border-[#F1F0F2]">
            <div className="cursor-pointer" onClick={() => setActiveTab(isAdmin ? 'crm' : 'appointments')}>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#7367F0] tracking-tight leading-none">SkyMed</span>
                <span className="text-[10px] font-extrabold bg-[#7367F0]/10 text-[#7367F0] px-2 py-0.5 rounded-md uppercase tracking-wider">ADMIN</span>
              </div>
              <span className="text-[10px] text-[#A5A3AE] font-semibold block mt-1">Medical Operations HQ</span>
            </div>

            <button 
              onClick={onNavigateHome}
              title="Return to main site"
              className="w-7 h-7 rounded-full bg-[#F1F0F2] hover:bg-[#7367F0] hover:text-white text-[#A5A3AE] flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items List (Flat Links, No Submenus) */}
          <div className="p-3 space-y-1.5 flex-1 text-xs font-semibold">
            
            {/* SECTION HEADER */}
            <div className="pt-2 pb-1.5 px-3">
              <span className="text-[11px] font-extrabold tracking-wider text-[#A5A3AE] uppercase">
                {isAdmin ? 'SYSTEM MANAGEMENT' : 'PATIENT PORTAL'}
              </span>
            </div>

            {/* Overview */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('crm')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                  activeTab === 'crm'
                    ? 'bg-[#7367F0] text-white shadow-[0_2px_6px_0_rgba(115,103,240,0.48)]'
                    : 'text-[#4B465C] hover:bg-[#F1F0F2]'
                }`}
              >
                <LayoutGrid className="w-4 h-4 shrink-0" />
                <span>Overview</span>
              </button>
            )}

            {/* Users */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                  activeTab === 'users'
                    ? 'bg-[#7367F0] text-white shadow-[0_2px_6px_0_rgba(115,103,240,0.48)]'
                    : 'text-[#4B465C] hover:bg-[#F1F0F2]'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Users</span>
              </button>
            )}

            {/* Appointments */}
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                activeTab === 'appointments'
                  ? 'bg-[#7367F0] text-white shadow-[0_2px_6px_0_rgba(115,103,240,0.48)]'
                  : 'text-[#4B465C] hover:bg-[#F1F0F2]'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{isAdmin ? 'Booked Appointments' : 'My Appointments'}</span>
            </button>

            {/* Image Storage */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('images')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                  activeTab === 'images'
                    ? 'bg-[#7367F0] text-white shadow-[0_2px_6px_0_rgba(115,103,240,0.48)]'
                    : 'text-[#4B465C] hover:bg-[#F1F0F2]'
                }`}
              >
                <Image className="w-4 h-4 shrink-0" />
                <span>Image Storage</span>
              </button>
            )}

            {/* Blog Posts */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                  activeTab === 'blog'
                    ? 'bg-[#7367F0] text-white shadow-[0_2px_6px_0_rgba(115,103,240,0.48)]'
                    : 'text-[#4B465C] hover:bg-[#F1F0F2]'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Blog Posts Manager</span>
              </button>
            )}

            {/* Categories */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('categories')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                  activeTab === 'categories'
                    ? 'bg-[#7367F0] text-white shadow-[0_2px_6px_0_rgba(115,103,240,0.48)]'
                    : 'text-[#4B465C] hover:bg-[#F1F0F2]'
                }`}
              >
                <Tag className="w-4 h-4 shrink-0" />
                <span>Category Manager</span>
              </button>
            )}

            {/* User Profile */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#7367F0] text-white shadow-[0_2px_6px_0_rgba(115,103,240,0.48)]'
                  : 'text-[#4B465C] hover:bg-[#F1F0F2]'
              }`}
            >
              <UserIcon className="w-4 h-4 shrink-0" />
              <span>Profile Settings</span>
            </button>

          </div>

          {/* User Footer Card in Sidebar */}
          <div className="p-3 border-t border-[#F1F0F2] bg-[#FAF9FB]">
            <div className="p-3 rounded-xl bg-white border border-[#E6E5E8] flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E6E5E8]"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#28C76F] border-2 border-white rounded-full" />
              </div>
              <div className="overflow-hidden flex-1">
                <h4 className="text-xs font-extrabold text-[#4B465C] truncate">{user.name}</h4>
                <p className="text-[10px] text-[#A5A3AE] truncate">{user.email}</p>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-1.5 text-[#EA5455] hover:bg-[#EA5455]/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

        </aside>

        {/* ================= RIGHT MAIN CONTENT AREA ================= */}
        <div className="flex-1 flex flex-col min-w-0 p-4 sm:p-6 lg:p-7 max-w-full overflow-x-hidden">
          
          {/* Top Floating Navigation Header Card */}
          <header className="bg-white rounded-xl border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] p-3.5 mb-6 flex items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="flex items-center gap-2.5 text-[#A5A3AE] flex-1 max-w-md">
              <Search className="w-4 h-4 shrink-0" />
              <input
                type="text"
                placeholder="Search medical records or staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-[#4B465C] placeholder-[#A5A3AE] w-full font-medium"
              />
            </div>

            {/* Quick Actions Header Toolbar */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              
              <button className="p-2 text-[#6F6B7D] hover:bg-[#F1F0F2] rounded-lg transition-colors" title="Translate">
                <Languages className="w-4 h-4" />
              </button>

              <button className="p-2 text-[#6F6B7D] hover:bg-[#F1F0F2] rounded-lg transition-colors" title="Toggle Theme">
                <Sun className="w-4 h-4" />
              </button>

              <button className="p-2 text-[#6F6B7D] hover:bg-[#F1F0F2] rounded-lg transition-colors" title="Apps Grid">
                <Grid className="w-4 h-4" />
              </button>

              <button className="p-2 text-[#6F6B7D] hover:bg-[#F1F0F2] rounded-lg transition-colors relative" title="Notifications">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EA5455] rounded-full ring-2 ring-white" />
              </button>

              <div className="h-5 w-px bg-[#E6E5E8] mx-1" />

              {/* User Avatar Circle */}
              <div 
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="relative">
                  <img
                    src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#E6E5E8]"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#28C76F] border-2 border-white rounded-full" />
                </div>
              </div>

            </div>

          </header>

          {/* MAIN TAB CONTENT */}
          <main className="flex-1 space-y-6">
            
            {/* ================= OVERVIEW TAB (SKYMED MEDICAL METRICS) ================= */}
            {activeTab === 'crm' && (
              <div className="space-y-6">
                
                {/* TOP 4 SKYMED STAT CARDS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Card 1: Active Flight Missions */}
                  <div className="bg-white rounded-xl p-5 border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#6F6B7D]">Active Missions</span>
                        <span className="text-xs font-bold text-[#28C76F]">(+12%)</span>
                      </div>
                      <div className="text-2xl font-extrabold text-[#4B465C] mt-1">18</div>
                      <div className="text-xs text-[#A5A3AE] font-medium mt-1">Flight evacuations en route</div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-[#7367F0]/10 text-[#7367F0] flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card 2: Total Consultations */}
                  <div className="bg-white rounded-xl p-5 border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#6F6B7D]">Consultations</span>
                        <span className="text-xs font-bold text-[#28C76F]">(+24%)</span>
                      </div>
                      <div className="text-2xl font-extrabold text-[#4B465C] mt-1">254</div>
                      <div className="text-xs text-[#A5A3AE] font-medium mt-1">Completed medical reviews</div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-[#28C76F]/10 text-[#28C76F] flex items-center justify-center shrink-0">
                      <UserCheck className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card 3: Flight Doctors */}
                  <div className="bg-white rounded-xl p-5 border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#6F6B7D]">Flight Doctors</span>
                        <span className="text-xs font-bold text-[#7367F0]">(Ready)</span>
                      </div>
                      <div className="text-2xl font-extrabold text-[#4B465C] mt-1">42</div>
                      <div className="text-xs text-[#A5A3AE] font-medium mt-1">On-call medical staff</div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-[#00CFDD]/10 text-[#00CFDD] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card 4: Pending Dispatches */}
                  <div className="bg-white rounded-xl p-5 border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#6F6B7D]">Pending Requests</span>
                        <span className="text-xs font-bold text-[#FF9F43]">(Urgent)</span>
                      </div>
                      <div className="text-2xl font-extrabold text-[#4B465C] mt-1">7</div>
                      <div className="text-xs text-[#A5A3AE] font-medium mt-1">Awaiting triage response</div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-[#FF9F43]/10 text-[#FF9F43] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>

                </div>

                {/* Direct Access Quick Shortcuts Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div 
                    onClick={() => setActiveTab('users')}
                    className="bg-white p-5 rounded-xl border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] hover:border-[#7367F0] cursor-pointer transition-all flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#7367F0]/10 text-[#7367F0] flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#4B465C] text-sm">All Registered Users</h4>
                      <p className="text-xs text-[#A5A3AE]">Manage patients, doctors & maintainers</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveTab('appointments')}
                    className="bg-white p-5 rounded-xl border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] hover:border-[#7367F0] cursor-pointer transition-all flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#28C76F]/10 text-[#28C76F] flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#4B465C] text-sm">Booked Appointments</h4>
                      <p className="text-xs text-[#A5A3AE]">Review medical requests & flight schedules</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveTab('images')}
                    className="bg-white p-5 rounded-xl border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] hover:border-[#7367F0] cursor-pointer transition-all flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FF9F43]/10 text-[#FF9F43] flex items-center justify-center shrink-0">
                      <Image className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#4B465C] text-sm">Medical Image Storage</h4>
                      <p className="text-xs text-[#A5A3AE]">Upload & manage medical media assets</p>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ================= ALL USERS TAB ================= */}
            {isAdmin && activeTab === 'users' && (
              <div className="bg-white rounded-xl border border-[#E6E5E8] p-6 shadow-[0_2px_6px_0_rgba(67,54,121,0.06)]">
                <AllUsersTab currentUser={user} />
              </div>
            )}

            {/* ================= IMAGE STORAGE TAB ================= */}
            {isAdmin && activeTab === 'images' && (
              <div className="bg-white rounded-xl border border-[#E6E5E8] p-6 shadow-[0_2px_6px_0_rgba(67,54,121,0.06)]">
                <ImageStorageTab user={user} />
              </div>
            )}

            {/* ================= BLOG POSTS TAB ================= */}
            {isAdmin && activeTab === 'blog' && (
              <div className="bg-white rounded-xl border border-[#E6E5E8] p-6 shadow-[0_2px_6px_0_rgba(67,54,121,0.06)]">
                <BlogManagementTab user={user} />
              </div>
            )}

            {/* ================= CATEGORIES TAB ================= */}
            {isAdmin && activeTab === 'categories' && (
              <div className="bg-white rounded-xl border border-[#E6E5E8] p-6 shadow-[0_2px_6px_0_rgba(67,54,121,0.06)]">
                <CategoryManagementTab />
              </div>
            )}

            {/* ================= APPOINTMENTS TAB ================= */}
            {activeTab === 'appointments' && (
              <div className="bg-white rounded-xl border border-[#E6E5E8] p-6 shadow-[0_2px_6px_0_rgba(67,54,121,0.06)]">
                <AppointmentsTab user={user} onOpenBookingModal={onOpenBookingModal} />
              </div>
            )}

            {/* ================= USER PROFILE TAB ================= */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl border border-[#E6E5E8] p-6 shadow-[0_2px_6px_0_rgba(67,54,121,0.06)]">
                <UserProfileTab user={user} onUpdateUser={onUpdateUser} />
              </div>
            )}

          </main>

        </div>

      </div>

    </div>
  );
};

