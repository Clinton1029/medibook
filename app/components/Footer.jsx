"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  HeartPulse,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-blue-100 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <HeartPulse className="text-white w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-white">MediBook</h2>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed">
              Your one-stop health companion. Book appointments, consult
              specialists, and manage your wellness—all in one place.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors"
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-3 border-b border-blue-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-blue-300 text-sm">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#services" className="hover:text-white">Our Services</a></li>
              <li><a href="#doctors" className="hover:text-white">Specialists</a></li>
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Support & Help */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-3 border-b border-blue-700 pb-2">
              Support
            </h3>
            <ul className="space-y-2 text-blue-300 text-sm">
              <li><a href="#faq" className="hover:text-white">FAQs</a></li>
              <li><a href="#help" className="hover:text-white">Help Center</a></li>
              <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-3 border-b border-blue-700 pb-2">
              Contact
            </h3>
            <ul className="space-y-3 text-blue-300 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" /> support@medibook.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" /> +1 (800) 555-0199
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" /> Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-800 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-blue-400">
          <p>© {new Date().getFullYear()} MediBook. All Rights Reserved.</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms</a>
            <a href="#cookies" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
