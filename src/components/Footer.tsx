import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E2856] text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: SKYMED Logo & Intro */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-sans font-black tracking-wider text-white">
                SKYMED
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Discover a medical rescue & transport network designed to deliver emergency care with speed, compassion, and precision.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-sans font-bold text-white uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Pricing & FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Partners */}
          <div>
            <h4 className="text-base font-sans font-bold text-white uppercase tracking-wider mb-6">
              Partners
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#terms" className="hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="#legal" className="hover:text-white transition-colors">Legal & FAA Certification</a></li>
              <li><a href="#business" className="hover:text-white transition-colors">Business & Insurance Sync</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">Hospital Partners Network</a></li>
            </ul>
          </div>

          {/* Column 4: Support & Emergency Assistance */}
          <div>
            <h4 className="text-base font-sans font-bold text-white uppercase tracking-wider mb-6">
              Support
            </h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Immediate Help
            </p>
            <p className="text-sm text-slate-200 mb-4">
              Call for medical or security assistance <br />
              <a href="tel:+6622067153" className="font-bold text-white hover:underline">+662 206 7153</a>
            </p>

            {/* Social Buttons in Royal Blue Squares */}
            <div className="flex items-center gap-2 pt-2">
              <a href="#facebook" className="w-9 h-9 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-9 h-9 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="w-9 h-9 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Bar at Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>Copyright © {new Date().getFullYear()} SKYMED. All rights reserved.</p>
          <p>Powered by SKYMED</p>
        </div>

      </div>
    </footer>
  );
};


