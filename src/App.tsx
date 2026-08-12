import React, { useState, useEffect } from 'react';
import { User } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { UrgentConsultationsSection } from './components/UrgentConsultationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ValuePropositionsSection } from './components/ValuePropositionsSection';
import { FaqSection } from './components/FaqSection';
import { BlogLandingSection } from './components/BlogLandingSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/Dashboard/DashboardView';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('skymed_token'));
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (token) {
      verifyUserToken(token);
    }
  }, [token]);

  const verifyUserToken = async (authToken: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        // Clear invalid token
        localStorage.removeItem('skymed_token');
        setToken(null);
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to verify session token:', err);
    }
  };

  const handleAuthSuccess = (loggedUser: User, newToken: string) => {
    setUser(loggedUser);
    setToken(newToken);
    localStorage.setItem('skymed_token', newToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('skymed_token');
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {currentView === 'dashboard' && user ? (
        <DashboardView
          user={user}
          onLogout={handleLogout}
          onNavigateHome={() => setCurrentView('landing')}
          onUpdateUser={(updated) => setUser(updated)}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
      ) : (
        <>
          {/* Header Navigation */}
          <Navbar
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenDashboard={() => setCurrentView('dashboard')}
            onLogout={handleLogout}
            currentView={currentView}
            onNavigateHome={() => setCurrentView('landing')}
          />

          {/* Main Landing Sections */}
          <main>
            {/* 2. Hero Section */}
            <HeroSection
              onOpenBooking={() => setIsBookingOpen(true)}
              onExploreServices={() => {
                const el = document.getElementById('services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 3. About Section (Navy band, 2-cell collage, back to top) */}
            <AboutSection
              onOpenBooking={() => setIsBookingOpen(true)}
            />

            {/* 4. Services (4-column grid with icon in lavender square) */}
            <ServicesSection
              onOpenBooking={() => setIsBookingOpen(true)}
            />

            {/* 5. Urgent Consultations (Muted indigo band, checklist with accent bullet dots) */}
            <UrgentConsultationsSection
              onOpenBooking={() => setIsBookingOpen(true)}
            />

            {/* 6. Testimonials (Pale lavender, serif heading, stacked testimonials) */}
            <TestimonialsSection />

            {/* 7. Unique Value Propositions (Serif heading, tall photo, numbered list 01, 02...) */}
            <ValuePropositionsSection />

            {/* 8. Frequently Asked Questions Section */}
            <FaqSection onOpenBooking={() => setIsBookingOpen(true)} />

            {/* Live Blog & Medical Articles Section */}
            <BlogLandingSection />
          </main>

          {/* 8. Footer (Deep navy, 4 columns, copyright bar) */}
          <Footer />
        </>
      )}

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        user={user}
        onSuccess={() => setIsBookingOpen(false)}
      />

      {/* User Auth Modal (Sign In / Sign Up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
