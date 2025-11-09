"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  Stethoscope,
  User,
  BookOpen,
  Calendar,
  Phone,
  Heart,
  Shield,
  MapPin,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  // State management
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); // Simulate user state

  // Refs for click outside detection
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Premium navigation data
  const navLinks = [
    { name: "Home", href: "#home", icon: User },
    {
      name: "Services",
      href: "#services",
      icon: Stethoscope,
      submenu: [
        { name: "Book Appointment", href: "#booking", icon: Calendar, premium: true },
        { name: "Virtual Consultation", href: "#consult", icon: Phone, premium: true },
        { name: "Pharmacy Delivery", href: "#pharmacy", icon: Heart },
        { name: "Health Diagnostics", href: "#diagnostics", icon: Shield },
        { name: "Vaccination Center", href: "#vaccinations", icon: Shield },
      ],
    },
    {
      name: "Specialists",
      href: "#doctors",
      icon: UserCircle,
      submenu: [
        { name: "All Specialists", href: "#all-doctors", icon: User },
        { name: "Cardiologists", href: "#cardiologists", icon: Heart },
        { name: "Neurologists", href: "#neurologists", icon: Shield },
        { name: "Find Nearby Clinics", href: "#nearby-clinics", icon: MapPin },
      ],
    },
    { name: "About", href: "#about", icon: BookOpen },
    {
      name: "Support",
      href: "#faq",
      icon: Shield,
      submenu: [
        { name: "Help Center", href: "#help", icon: Shield },
        { name: "Contact Support", href: "#contact", icon: Phone },
        { name: "Emergency", href: "#emergency", icon: Heart, emergency: true },
      ],
    },
  ];

  // Premium notifications
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      message: "Your premium consultation with Dr. Smith is confirmed", 
      time: "2m ago", 
      type: "premium",
      read: false,
    },
    { 
      id: 2, 
      message: "Health checkup results are ready", 
      time: "1h ago", 
      type: "results",
      read: false,
    },
    { 
      id: 3, 
      message: "Welcome to MediCare Premium", 
      time: "1d ago", 
      type: "welcome",
      read: true,
    },
  ]);

  // Scroll effect for premium appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Notification handlers
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100" 
        : "bg-white/90 backdrop-blur-lg shadow-lg"
    }`}>
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Premium Logo */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="text-white w-5 h-5" />
            </div>
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MediCare+
            </h1>
            <p className="text-xs text-gray-500 font-medium">Premium Healthcare</p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.name}
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setOpenDropdown(link.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <motion.a
                href={link.href}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold group relative overflow-hidden"
                whileHover={{ y: -2 }}
              >
                <link.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                {link.name}
                {link.submenu && (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                )}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              {/* Premium Dropdown Menu */}
              <AnimatePresence>
                {link.submenu && openDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute top-full left-0 mt-3 w-80 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-3">
                      {link.submenu.map((item) => (
                        <motion.a
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group relative"
                          whileHover={{ x: 8 }}
                        >
                          <div className={`p-2 rounded-lg ${
                            item.emergency 
                              ? 'bg-red-100 text-red-600' 
                              : item.premium 
                                ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                          }`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className={`font-semibold ${
                              item.emergency ? 'text-red-600' : 'text-gray-800'
                            }`}>
                              {item.name}
                            </span>
                          </div>
                          {item.premium && (
                            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full font-bold">
                              PREMIUM
                            </span>
                          )}
                          {item.emergency && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold animate-pulse">
                              URGENT
                            </span>
                          )}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Premium Notifications */}
          <div ref={notificationsRef} className="relative">
            <motion.button
              className="relative p-3 rounded-2xl hover:bg-blue-50 transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              {unreadCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-96 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full font-semibold">
                        {unreadCount} New
                      </span>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          className={`p-4 border-b border-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${
                            !notification.read ? 'bg-blue-50/50' : ''
                          }`}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900 mb-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                              >
                                Mark Read
                              </button>
                            )}
                          </div>
                          {notification.type === 'premium' && (
                            <span className="inline-block mt-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded font-bold">
                              PREMIUM SERVICE
                            </span>
                          )}
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="font-semibold">No notifications</p>
                        <p className="text-sm mt-1">You're all caught up!</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Premium User Profile */}
          <div ref={profileRef} className="relative">
            <motion.button
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-blue-50 transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden xl:block text-left">
                <p className="font-semibold text-gray-900 text-sm">Welcome Back</p>
                <p className="text-xs text-gray-500">Access your account</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 transition-transform group-hover:rotate-180" />
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-50"
                >
                  {user ? (
                    <>
                      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <User className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-lg">Dr. Sarah Johnson</p>
                            <p className="text-blue-100 text-sm">Premium Member</p>
                          </div>
                        </div>
                        <div className="mt-3 px-3 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          <p className="text-sm font-semibold">MediCare+ Platinum</p>
                        </div>
                      </div>
                      <div className="p-3">
                        {[
                          { name: "My Profile", icon: UserCircle },
                          { name: "Appointments", icon: Calendar },
                          { name: "Medical Records", icon: Shield },
                          { name: "Account Settings", icon: Settings },
                        ].map((item) => (
                          <button
                            key={item.name}
                            className="flex items-center gap-4 w-full px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 text-gray-700 font-semibold"
                          >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                          </button>
                        ))}
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button className="flex items-center gap-4 w-full px-4 py-4 rounded-xl hover:bg-red-50 transition-all duration-300 text-red-600 font-semibold">
                            <LogOut className="w-5 h-5" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Join MediCare+</h3>
                        <p className="text-gray-600 text-sm">Access premium healthcare services</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <motion.a
                          href="#login"
                          className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Sign In
                        </motion.a>
                        <motion.a
                          href="#register"
                          className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 text-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Create Account
                        </motion.a>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-3 rounded-2xl hover:bg-blue-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Stethoscope className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">MediCare+</h2>
                      <p className="text-xs text-gray-500">Premium Healthcare</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-3 rounded-2xl hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 space-y-2">
                  {navLinks.map((link) => (
                    <div key={link.name} className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className="flex items-center justify-between w-full px-4 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 text-gray-700 font-semibold"
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="w-5 h-5" />
                          {link.name}
                        </div>
                        {link.submenu && (
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform ${
                              openDropdown === link.name ? "rotate-180" : ""
                            }`} 
                          />
                        )}
                      </button>
                      
                      {/* Mobile Submenu */}
                      <AnimatePresence>
                        {link.submenu && openDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-8 pl-4 border-l-2 border-gray-200 space-y-2 my-3">
                              {link.submenu.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 text-gray-600"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <div className={`p-2 rounded-lg ${
                                    item.emergency 
                                      ? 'bg-red-100 text-red-600' 
                                      : item.premium 
                                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                                        : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    <item.icon className="w-4 h-4" />
                                  </div>
                                  {item.name}
                                  {item.premium && (
                                    <span className="ml-auto px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full font-bold">
                                      PREMIUM
                                    </span>
                                  )}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>

                {/* Mobile Auth Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  {!user ? (
                    <div className="flex flex-col gap-3">
                      <motion.a
                        href="#login"
                        className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-center hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMobileOpen(false)}
                      >
                        Sign In
                      </motion.a>
                      <motion.a
                        href="#register"
                        className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-center hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMobileOpen(false)}
                      >
                        Create Account
                      </motion.a>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 text-sm">
                      Premium Member • MediCare+
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}