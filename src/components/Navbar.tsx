import React, { useState } from 'react';
import { LogOut, LayoutDashboard, ArrowRight, Menu, X } from 'lucide-react';
import { User } from '../types';
import { View, viewToPath } from '../routes';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
  currentView: View;
  onNavigate: (view: View) => void;
}

const PRIMARY_LINKS: { label: string; view: View }[] = [
  { label: 'Home', view: 'landing' },
  { label: 'About Us', view: 'about' },
  { label: 'Services', view: 'services' },
  { label: 'Contact', view: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onOpenBooking,
  onOpenDashboard,
  onLogout,
  currentView,
  onNavigate,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Real hrefs keep links shareable and middle-clickable; the handler keeps the
  // navigation client-side instead of triggering a full page reload.
  const linkProps = (view: View) => ({
    href: viewToPath(view),
    onClick: (e: React.MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      setIsMobileOpen(false);
      onNavigate(view);
    },
  });

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo Left: Bold Clean Text */}
        <a {...linkProps('landing')} className="cursor-pointer group">
          <span className="text-2xl font-black tracking-wider text-[#1E293B] font-sans">
            SKYMED
          </span>
        </a>

        {/* Primary Navigation Links Right-Aligned (desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
          {PRIMARY_LINKS.map(({ label, view }) => (
            <a
              key={view}
              {...linkProps(view)}
              className={`relative transition-colors hover:text-[#2563EB] ${
                currentView === view ? 'text-[#2563EB]' : ''
              }`}
            >
              {label}
              {currentView === view && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-[#2563EB]" />
              )}
            </a>
          ))}

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

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen((open) => !open)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
          className="lg:hidden w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] flex items-center justify-center transition-colors"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1 text-sm font-semibold text-slate-700">
            {PRIMARY_LINKS.map(({ label, view }) => (
              <a
                key={view}
                {...linkProps(view)}
                className={`px-3 py-2.5 rounded-xl transition-colors ${
                  currentView === view
                    ? 'bg-blue-50 text-[#2563EB]'
                    : 'hover:bg-slate-50'
                }`}
              >
                {label}
              </a>
            ))}

            <button
              onClick={() => {
                setIsMobileOpen(false);
                onOpenBooking();
              }}
              className="mt-2 inline-flex items-center justify-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {user ? (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    onOpenDashboard();
                  }}
                  className="flex items-center gap-1.5 text-[#2563EB] font-bold"
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
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenAuth();
                }}
                className="mt-3 pt-3 border-t border-slate-100 text-left px-3 text-slate-600 hover:text-[#2563EB] transition-colors"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
