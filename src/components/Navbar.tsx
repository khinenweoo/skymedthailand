import React from 'react';
import { User as UserIcon, LogOut, LayoutDashboard, Calendar, ShieldAlert, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
  currentView: 'landing' | 'dashboard';
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onOpenBooking,
  onOpenDashboard,
  onLogout,
  currentView,
  onNavigateHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Left: Bold Clean Text */}
        <div 
          onClick={onNavigateHome}
          className="cursor-pointer group"
        >
          <span className="text-2xl font-black tracking-wider text-[#1E293B] font-sans">
            SKYMED
          </span>
        </div>

        {/* Primary Navigation Links Right-Aligned */}
        <nav className="flex items-center gap-6 sm:gap-8 text-sm font-semibold text-slate-700">
          <button 
            onClick={onNavigateHome} 
            className={`hover:text-[#2563EB] transition-colors ${currentView === 'landing' ? 'text-[#2563EB]' : ''}`}
          >
            Home
          </button>
          <a href="#about" onClick={onNavigateHome} className="hover:text-[#2563EB] transition-colors">
            About Us
          </a>
          <a href="#services" onClick={onNavigateHome} className="hover:text-[#2563EB] transition-colors">
            Services
          </a>
          <a href="#contact" onClick={onNavigateHome} className="hover:text-[#2563EB] transition-colors">
            Contact
          </a>
          <button 
            onClick={onOpenBooking} 
            className="inline-flex items-center gap-1.5 border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 shadow-sm"
          >
            <span>Appointment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* User Auth/Dashboard Links */}
          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <button
                onClick={onOpenDashboard}
                className="flex items-center gap-1.5 text-[#2563EB] hover:text-[#1D4ED8] font-bold"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{user.id === 'S3XGP2Q58rYulbHQQ1yPgLQraGI3' || user.role === 'admin' ? 'Admin Workspace' : 'Dashboard'}</span>
              </button>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-slate-600 hover:text-[#2563EB] transition-colors pl-2 border-l border-slate-200"
            >
              Login
            </button>
          )}
        </nav>

      </div>
    </header>
  );
};

