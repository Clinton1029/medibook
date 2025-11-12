"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Stethoscope, 
  Shield, 
  Zap, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowUp,
  MessageCircle,
  Calendar,
  Video,
  Star,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function ModernFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const footerSections = [
    {
      title: "Medical Services",
      links: [
        { name: "Emergency Care", icon: Heart },
        { name: "Video Consultation", icon: Video },
        { name: "Specialist Booking", icon: Stethoscope },
        { name: "Health Checkups", icon: Shield },
        { name: "Mental Health", icon: Zap },
        { name: "Dental Care", icon: Tooth }
      ]
    },
    {
      title: "Quick Links",
      links: [
        { name: "Find a Doctor", icon: Stethoscope },
        { name: "Book Appointment", icon: Calendar },
        { name: "Health Plans", icon: Shield },
        { name: "Emergency Services", icon: Clock },
        { name: "Patient Portal", icon: Users },
        { name: "Careers", icon: Briefcase }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", icon: HelpCircle },
        { name: "Contact Us", icon: Phone },
        { name: "Live Chat", icon: MessageCircle },
        { name: "FAQ", icon: FileText },
        { name: "Privacy Policy", icon: Shield },
        { name: "Terms of Service", icon: FileText }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const awards = [
    { name: "Best Healthcare App 2024", provider: "Health Tech Awards" },
    { name: "Patient Choice Award", provider: "Medical Excellence" },
    { name: "Innovation in Telemedicine", provider: "Digital Health" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="relative z-10"
            >
              <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Ready to Experience Premium Healthcare?
              </h3>
              <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied patients who trust us with their health journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Your First Appointment
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Schedule Demo
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Brand & Newsletter Section */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">HealthCare Plus</h2>
                  <p className="text-blue-200 text-sm">Premium Medical Services</p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-blue-200 text-lg leading-relaxed max-w-md"
              >
                Transforming healthcare through technology and compassion. 
                Your trusted partner in health and wellness journey.
              </motion.p>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-blue-200">4.9/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-blue-200">HIPAA Compliant</span>
                </div>
              </motion.div>

              {/* Newsletter Subscription */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h4 className="font-semibold text-lg">Stay Updated</h4>
                <AnimatePresence>
                  {isSubscribed ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/20 border border-green-500 rounded-2xl p-4 text-green-400 text-center"
                    >
                      🎉 Thank you for subscribing!
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onSubmit={handleSubscribe}
                      className="flex gap-2"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 bg-white/10 border border-blue-500/30 rounded-2xl px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Subscribe
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
                <p className="text-blue-200 text-sm">
                  Get health tips, updates, and exclusive offers
                </p>
              </motion.div>
            </div>

            {/* Links Grid - Desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-8">
              {footerSections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <h4 className="font-bold text-lg text-white mb-4">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => {
                      const IconComponent = link.icon;
                      return (
                        <li key={linkIndex}>
                          <motion.a
                            href="#"
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors group"
                          >
                            <IconComponent className="w-4 h-4 text-blue-400 group-hover:text-cyan-400 transition-colors" />
                            <span>{link.name}</span>
                          </motion.a>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Mobile Accordion */}
            <div className="lg:hidden space-y-4">
              {footerSections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-blue-800/50"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex items-center justify-between w-full py-4 text-left font-semibold text-lg"
                  >
                    {section.title}
                    <ChevronRight 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        activeAccordion === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pb-4 space-y-3"
                      >
                        {section.links.map((link, linkIndex) => {
                          const IconComponent = link.icon;
                          return (
                            <a
                              key={linkIndex}
                              href="#"
                              className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors"
                            >
                              <IconComponent className="w-4 h-4 text-blue-400" />
                              {link.name}
                            </a>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="border-t border-blue-800/50 pt-8 mb-8"
          >
            <h4 className="text-center font-semibold text-blue-200 mb-6">Awards & Recognition</h4>
            <div className="flex flex-wrap justify-center gap-6">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3 border border-white/10"
                >
                  <Award className="w-5 h-5 text-yellow-400" />
                  <div className="text-sm">
                    <div className="font-semibold">{award.name}</div>
                    <div className="text-blue-300 text-xs">{award.provider}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="border-t border-blue-800/50 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>1-800-HEALTH</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>care@healthcareplus.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>24/7 Available</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -2 }}
                      className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Copyright & Back to Top */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-blue-800/30">
              <div className="text-blue-300 text-sm text-center lg:text-left">
                © 2024 HealthCare Plus. All rights reserved. 
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
              
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2"
              >
                <ArrowUp className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Top</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2 group"
        >
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-semibold">Emergency</span>
        </motion.button>
      </motion.div>
    </footer>
  );
}

// Add missing icon imports
const Tooth = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 2C13 2 15 4 15 6C15 8 13 10 12 10C11 10 9 8 9 6C9 4 11 2 12 2Z"/>
    <path d="M12 10C13 10 15 12 15 14C15 16 13 18 12 18C11 18 9 16 9 14C9 12 11 10 12 10Z"/>
  </svg>
);

const Users = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Briefcase = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const HelpCircle = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const FileText = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);