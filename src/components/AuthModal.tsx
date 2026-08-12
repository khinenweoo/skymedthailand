import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, AlertTriangle, ShieldCheck } from 'lucide-react';
import { User } from '../types';
import { auth, syncUserToFirestore, ADMIN_USER_ID } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        // Firebase Auth Sign In
        let firebaseUser = auth.currentUser;
        try {
          const userCred = await signInWithEmailAndPassword(auth, email, password);
          firebaseUser = userCred.user;
        } catch (fbErr: any) {
          console.warn('Firebase Auth sign in notice:', fbErr.code, fbErr.message);
        }

        // Call backend API to retrieve user metadata
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Authentication failed');
        }

        let authenticatedUser: User = data.user;
        if (
          email.toLowerCase() === 'alex@skymedthailand.com' || 
          (firebaseUser && firebaseUser.uid === ADMIN_USER_ID) ||
          authenticatedUser.id === ADMIN_USER_ID
        ) {
          authenticatedUser = {
            ...authenticatedUser,
            id: ADMIN_USER_ID,
            role: 'admin',
            email: 'alex@skymedthailand.com'
          };
        }

        // Sync user to Firestore
        await syncUserToFirestore(authenticatedUser);

        onAuthSuccess(authenticatedUser, data.token);
        onClose();

      } else {
        // Firebase Auth Sign Up
        let firebaseUser = null;
        try {
          const userCred = await createUserWithEmailAndPassword(auth, email, password);
          firebaseUser = userCred.user;
          if (name && firebaseUser) {
            await updateProfile(firebaseUser, { displayName: name });
          }
        } catch (fbErr: any) {
          console.warn('Firebase Auth sign up notice:', fbErr.code, fbErr.message);
          
          if (fbErr.code === 'auth/email-already-in-use') {
            // Email is already in Firebase Auth. Try signing in with provided credentials.
            try {
              const signInCred = await signInWithEmailAndPassword(auth, email, password);
              firebaseUser = signInCred.user;
            } catch (signInErr: any) {
              // Switch to login tab and prompt user
              setMode('login');
              setError('This email is already registered in Firebase. Switched to Sign In mode — please enter your password.');
              setLoading(false);
              return;
            }
          } else if (fbErr.code === 'auth/operation-not-allowed') {
            console.warn('Email/Password auth is disabled in Firebase Console.');
          }
        }

        // Register in backend
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name, phone, emergencyContact })
        });

        const data = await res.json();
        
        // If backend says account exists, attempt login endpoint
        if (!res.ok && data.error && data.error.includes('already exists')) {
          const loginRes = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const loginData = await loginRes.json();
          if (loginRes.ok) {
            onAuthSuccess(loginData.user, loginData.token);
            onClose();
            return;
          } else {
            setMode('login');
            throw new Error('This account already exists. Switched to Sign In mode — please check your password.');
          }
        }

        if (!res.ok) {
          throw new Error(data.error || 'Registration failed');
        }

        onAuthSuccess(data.user, data.token);
        onClose();
      }
    } catch (err: any) {
      console.error('Auth Error:', err);
      let friendlyMessage = err.message || 'An error occurred during authentication';
      if (err.code === 'auth/operation-not-allowed') {
        friendlyMessage = 'Email/Password sign-in is disabled in Firebase Console. Please enable Email/Password under Authentication > Sign-in method.';
      } else if (err.code === 'auth/email-already-in-use') {
        friendlyMessage = 'This email is already in use. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        friendlyMessage = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        friendlyMessage = 'Please enter a valid email address.';
      }
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl my-8">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {mode === 'login' ? 'Welcome Back to SkyMed' : 'Create Your SkyMed Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'login' ? 'Access your medical dashboard, upload files, and manage appointments.' : 'Sign up to manage emergency rescues, patient files, and blog updates.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-slate-100 p-1 mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Dr. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="name@skymed.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Contact / Hospital Ref</label>
                <input
                  type="text"
                  placeholder="Contact Name & Number"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-indigo-200 disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to SkyMed' : 'Create SkyMed Account'}
          </button>
        </form>

      </div>
    </div>
  );
};
