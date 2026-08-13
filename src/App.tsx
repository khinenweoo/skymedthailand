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
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ContactPage } from './components/pages/ContactPage';
import { View, pathToView, viewToPath } from './routes';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('skymed_token'));
  const [currentView, setCurrentView] = useState<View>(() =>
    pathToView(window.location.pathname)
  );

  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Client-side navigation: keeps the URL, history and view state in one place.
  const navigate = (view: View) => {
    const path = viewToPath(view);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Browser back / forward buttons.
  useEffect(() => {
    const onPopState = () => setCurrentView(pathToView(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

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
    navigate('landing');
  };

  const openBooking = () => setIsBookingOpen(true);

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

      {currentView === 'dashboard' && user ? (
        <DashboardView
          user={user}
          onLogout={handleLogout}
          onNavigateHome={() => navigate('landing')}
          onUpdateUser={(updated) => setUser(updated)}
          onOpenBookingModal={openBooking}
        />
      ) : (
        <>
          {/* Header Navigation (shared by every public page) */}
          <Navbar
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenBooking={openBooking}
            onOpenDashboard={() => navigate('dashboard')}
            onLogout={handleLogout}
            currentView={currentView}
            onNavigate={navigate}
          />

          {currentView === 'about' ? (
            <AboutPage
              onOpenBooking={openBooking}
              onNavigateHome={() => navigate('landing')}
              onNavigateContact={() => navigate('contact')}
            />
          ) : currentView === 'services' ? (
            <ServicesPage
              onOpenBooking={openBooking}
              onNavigateHome={() => navigate('landing')}
              onNavigateContact={() => navigate('contact')}
            />
          ) : currentView === 'contact' ? (
            <ContactPage
              user={user}
              onOpenBooking={openBooking}
              onNavigateHome={() => navigate('landing')}
            />
          ) : (
            /* Main Landing Sections */
            <main>
              {/* 2. Hero Section */}
              <HeroSection
                onOpenBooking={openBooking}
                onExploreServices={() => navigate('services')}
              />

              {/* 3. About Section (Navy band, 2-cell collage, back to top) */}
              <AboutSection
                onOpenBooking={openBooking}
              />

              {/* 4. Services (4-column grid with icon in lavender square) */}
              <ServicesSection
                onOpenBooking={openBooking}
              />

              {/* 5. Urgent Consultations (Muted indigo band, checklist with accent bullet dots) */}
              <UrgentConsultationsSection
                onOpenBooking={openBooking}
              />

              {/* 6. Testimonials (Pale lavender, serif heading, stacked testimonials) */}
              <TestimonialsSection />

              {/* 7. Unique Value Propositions (Serif heading, tall photo, numbered list 01, 02...) */}
              <ValuePropositionsSection />

              {/* 8. Frequently Asked Questions Section */}
              <FaqSection onOpenBooking={openBooking} />

              {/* Live Blog & Medical Articles Section */}
              <BlogLandingSection />
            </main>
          )}

          {/* 8. Footer (Deep navy, 4 columns, copyright bar) */}
          <Footer onNavigate={navigate} />
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
