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
  Settings,
  LogOut,
  UserCircle,
  Shield,
  Heart,
  Calendar,
  Phone,
  MapPin,
  Zap,
  Star,
} from "lucide-react";

export default function Navbar() {
  // State management
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); // Start with null to show login/register

  // Refs for click outside detection
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Compact navigation data - Changed Dashboard to Home
  const navLinks = [
    { name: "Home", href: "#home", icon: User },
    {
      name: "Services",
      href: "#services",
      icon: Stethoscope,
      submenu: [
        { name: "Book Appointment", href: "#booking", icon: Calendar, premium: true },
        { name: "Virtual Consult", href: "#consult", icon: Phone, premium: true },
        { name: "Pharmacy", href: "#pharmacy", icon: Heart },
        { name: "Diagnostics", href: "#diagnostics", icon: Shield },
        { name: "Emergency Care", href: "#emergency", icon: Zap, emergency: true },
      ],
    },
    {
      name: "Specialists",
      href: "#doctors",
      icon: UserCircle,
      submenu: [
        { name: "All Doctors", href: "#all-doctors", icon: User },
        { name: "Cardiologists", href: "#cardiologists", icon: Heart },
        { name: "Neurologists", href: "#neurologists", icon: Shield },
        { name: "Nearby Clinics", href: "#nearby-clinics", icon: MapPin },
      ],
    },
    { name: "About", href: "#about", icon: BookOpen },
    {
      name: "Support",
      href: "#support",
      icon: Shield,
      submenu: [
        { name: "Help Center", href: "#help", icon: Shield },
        { name: "Contact", href: "#contact", icon: Phone },
        { name: "Emergency", href: "#emergency-line", icon: Zap, emergency: true },
      ],
    },
  ];

  // Notifications
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      message: "Your consultation with Dr. Smith is confirmed", 
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
  ]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
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

  // Auth handlers
  const handleLogin = () => {
    setUser({
      name: "Sarah Johnson",
      email: "sarah@medicare.com",
      role: "Premium Member"
    });
  };

  const handleLogout = () => {
    setUser(null);
    setProfileOpen(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-blue-900/95 backdrop-blur-xl shadow-2xl border-b border-blue-700/50" 
        : "bg-blue-900 backdrop-blur-lg shadow-lg"
    }`}>
      {/* Ultra Compact Container */}
      <div className="mx-auto flex justify-between items-center py-2 px-3 sm:px-4 md:px-6">
        {/* Compact Logo */}
        <motion.div 
          className="flex items-center gap-2 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Stethoscope className="text-white w-3 h-3 sm:w-4 sm:h-4" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base sm:text-lg font-bold text-white">MediCare</h1>
            <p className="text-[10px] sm:text-xs text-blue-300 font-medium">Pro</p>
          </div>
        </motion.div>

        {/* Desktop Navigation - Ultra Compact */}
        <nav className="hidden lg:flex items-center gap-0">
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
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-800 transition-all duration-200 font-medium group"
                whileHover={{ y: -1 }}
              >
                <link.icon className="w-3 h-3" />
                <span className="text-xs sm:text-sm">{link.name}</span>
                {link.submenu && (
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                )}
              </motion.a>

              {/* Compact Dropdown Menu */}
              <AnimatePresence>
                {link.submenu && openDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full left-0 mt-1 w-48 sm:w-56 bg-blue-800 shadow-2xl rounded-xl border border-blue-700 overflow-hidden z-50"
                  >
                    <div className="p-1">
                      {link.submenu.map((item) => (
                        <motion.a
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 group"
                          whileHover={{ x: 2 }}
                        >
                          <item.icon className="w-3 h-3 text-blue-300" />
                          <span className="text-xs sm:text-sm text-white font-medium">
                            {item.name}
                          </span>
                          {item.premium && (
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-auto" />
                          )}
                          {item.emergency && (
                            <Zap className="w-3 h-3 text-red-400 ml-auto" />
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

        {/* Right Side Actions - Ultra Compact */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Desktop Auth Buttons - Show when user is not logged in */}
          {!user && (
            <div className="hidden md:flex items-center gap-2">
              <motion.button
                onClick={handleLogin}
                className="px-2 sm:px-3 py-1 sm:py-2 text-blue-200 hover:text-white text-xs sm:text-sm font-medium hover:bg-blue-800 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={handleLogin}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-blue-500 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </div>
          )}

          {/* Compact Notifications */}
          <div ref={notificationsRef} className="relative">
            <motion.button
              className="relative p-1 sm:p-2 rounded-lg hover:bg-blue-800 transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="w-4 h-4 text-blue-200 group-hover:text-white transition-colors" />
              {unreadCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-1 w-72 bg-blue-800 shadow-2xl rounded-xl border border-blue-700 overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-blue-700">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-white text-sm">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-semibold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          className={`p-3 border-b border-blue-700/50 hover:bg-blue-700/50 transition-all duration-200 ${
                            !notification.read ? 'bg-blue-700/30' : ''
                          }`}
                          whileHover={{ x: 2 }}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1">
                              <p className="text-xs font-medium text-white mb-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-blue-300">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-500 transition-colors"
                              >
                                Read
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-blue-300">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">No notifications</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Compact User Profile - Show when user is logged in */}
          {user ? (
            <div ref={profileRef} className="relative">
              <motion.button
                className="flex items-center gap-1 sm:gap-2 p-1 rounded-lg hover:bg-blue-800 transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow">
                  <User className="w-3 h-3 text-white" />
                </div>
                <ChevronDown className="w-3 h-3 text-blue-300 transition-transform group-hover:rotate-180" />
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-1 w-48 sm:w-56 bg-blue-800 shadow-2xl rounded-xl border border-blue-700 overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-blue-700 bg-blue-700/50">
                      <p className="font-semibold text-white text-sm">{user.name}</p>
                      <p className="text-xs text-blue-300">{user.role}</p>
                    </div>
                    <div className="p-1">
                      {[
                        { name: "Profile", icon: UserCircle },
                        { name: "Appointments", icon: Calendar },
                        { name: "Medical Records", icon: Shield },
                        { name: "Settings", icon: Settings },
                      ].map((item) => (
                        <button
                          key={item.name}
                          className="flex items-center gap-2 w-full px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-blue-100 text-xs sm:text-sm font-medium"
                        >
                          <item.icon className="w-3 h-3" />
                          {item.name}
                        </button>
                      ))}
                      <div className="border-t border-blue-700 mt-1 pt-1">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-red-600/20 transition-colors text-red-400 text-xs sm:text-sm font-medium"
                        >
                          <LogOut className="w-3 h-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Mobile Auth Buttons - Show when user is not logged in (mobile only)
            <div className="md:hidden flex items-center gap-1">
              <motion.button
                onClick={handleLogin}
                className="px-2 py-1 text-blue-200 hover:text-white text-xs font-medium hover:bg-blue-800 rounded transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </div>
          )}

          {/* Mobile Menu Button - Ultra Compact */}
          <motion.button
            className="lg:hidden p-1 sm:p-2 rounded-lg hover:bg-blue-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-4 h-4 text-blue-200" />
            ) : (
              <Menu className="w-4 h-4 text-blue-200" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Compact Mobile Menu */}
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
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-blue-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <Stethoscope className="text-white w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">MediCare</h2>
                      <p className="text-xs text-blue-300">Pro</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <X className="w-4 h-4 text-blue-200" />
                  </button>
                </div>

                {/* User Info Mobile - Show when logged in */}
                {user && (
                  <div className="bg-blue-800 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <User className="text-white w-3 h-3" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{user.name}</p>
                        <p className="text-xs text-blue-300">{user.role}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation */}
                <nav className="flex-1 space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.name} className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-blue-800 transition-all duration-200 text-blue-100 font-medium text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <link.icon className="w-3 h-3" />
                          {link.name}
                        </div>
                        {link.submenu && (
                          <ChevronDown 
                            className={`w-3 h-3 transition-transform ${
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
                            <div className="ml-4 pl-3 border-l-2 border-blue-700 space-y-1 my-1">
                              {link.submenu.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-800 transition-all duration-200 text-blue-300 text-sm"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <item.icon className="w-3 h-3" />
                                  {item.name}
                                  {item.premium && (
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-auto" />
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
                <div className="mt-4 pt-4 border-t border-blue-700">
                  {!user ? (
                    <div className="flex flex-col gap-2">
                      <motion.button
                        onClick={() => {
                          handleLogin();
                          setMobileOpen(false);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-center text-sm hover:bg-blue-500 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign In
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          handleLogin();
                          setMobileOpen(false);
                        }}
                        className="px-4 py-2 border border-blue-500 text-blue-300 rounded-lg font-medium text-center text-sm hover:bg-blue-800 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Create Account
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-red-600/20 text-red-400 rounded-lg font-medium text-center text-sm hover:bg-red-600/30 transition-colors"
                      >
                        Sign Out
                      </button>
                      <div className="text-center text-blue-400 text-xs">
                        Premium Member • MediCare Pro
                      </div>
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