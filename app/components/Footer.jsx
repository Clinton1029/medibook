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
  Search,
  Moon,
  Sun,
  Settings,
  LogOut,
  UserCircle,
  Shield,
  Heart,
  Calendar,
  Phone,
  MapPin,
} from "lucide-react";

export default function Navbar() {
  // State management
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); // Simulate user state

  // Refs for click outside detection
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Navigation data
  const navLinks = [
    { name: "Home", href: "#home", icon: User },
    {
      name: "Services",
      href: "#services",
      icon: Stethoscope,
      submenu: [
        { name: "Book Appointment", href: "#booking", icon: Calendar },
        { name: "Consult Online", href: "#consult", icon: Phone },
        { name: "Pharmacy", href: "#pharmacy", icon: Heart },
        { name: "Diagnostics", href: "#diagnostics", icon: Shield },
        { name: "Vaccinations", href: "#vaccinations", icon: Shield },
      ],
    },
    {
      name: "Doctors",
      href: "#doctors",
      icon: UserCircle,
      submenu: [
        { name: "All Doctors", href: "#all-doctors", icon: User },
        { name: "Specialists", href: "#specialists", icon: Shield },
        { name: "Nearby Clinics", href: "#nearby-clinics", icon: MapPin },
      ],
    },
    { name: "About", href: "#about", icon: BookOpen },
    {
      name: "FAQ",
      href: "#faq",
      icon: BookOpen,
      submenu: [
        { name: "Booking FAQ", href: "#booking-faq", icon: Calendar },
        { name: "Payments FAQ", href: "#payments-faq", icon: Shield },
        { name: "Technical Support", href: "#support", icon: Phone },
      ],
    },
  ];

  // Enhanced notifications with types and actions
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      message: "New appointment request from John Doe", 
      time: "2m ago", 
      type: "appointment",
      read: false,
      action: "Review"
    },
    { 
      id: 2, 
      message: "Dr. Smith confirmed your appointment", 
      time: "1h ago", 
      type: "confirmation",
      read: false,
      action: "View"
    },
    { 
      id: 3, 
      message: "Payment received for consultation", 
      time: "3h ago", 
      type: "payment",
      read: true,
      action: "Receipt"
    },
  ]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Notification handlers
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Dropdown handlers
  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50" 
        : "bg-white dark:bg-gray-900 backdrop-blur-md shadow-sm"
    }`}>
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-6">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <Stethoscope className="text-blue-600 dark:text-blue-400 w-7 h-7" />
            <motion.div 
              className="absolute inset-0 bg-blue-100 dark:bg-blue-900 rounded-full -z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            MediBook+
          </h1>
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
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium group"
                whileHover={{ y: -1 }}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
                {link.submenu && (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                )}
              </motion.a>

              {/* Enhanced Dropdown Menu */}
              <AnimatePresence>
                {link.submenu && openDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      {link.submenu.map((item) => (
                        <motion.a
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                          whileHover={{ x: 4 }}
                        >
                          <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {item.name}
                          </span>
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
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <motion.button
            ref={searchRef}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </motion.button>

          {/* Search Panel */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-96 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-4 z-50"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search doctors, services, medications..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                    autoFocus
                  />
                </div>
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Quick search: Doctors, Appointments, Pharmacy
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dark Mode Toggle */}
          <motion.button
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>

          {/* Notifications */}
          <div ref={notificationsRef} className="relative">
            <motion.button
              className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      {notifications.length > 0 && (
                        <button
                          onClick={clearAllNotifications}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="ml-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                Mark read
                              </button>
                            )}
                          </div>
                          <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors">
                            {notification.action}
                          </button>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div ref={profileRef} className="relative">
            <motion.button
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                  {user ? (
                    <>
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-gray-900 dark:text-white">John Doe</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
                      </div>
                      <div className="p-2">
                        {[
                          { name: "Profile", icon: UserCircle },
                          { name: "Appointments", icon: Calendar },
                          { name: "Medical Records", icon: Shield },
                          { name: "Settings", icon: Settings },
                        ].map((item) => (
                          <button
                            key={item.name}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                          </button>
                        ))}
                        <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4">
                      <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">Welcome to MediBook+</p>
                      <div className="flex flex-col gap-2">
                        <motion.a
                          href="#login"
                          className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Login
                        </motion.a>
                        <motion.a
                          href="#register"
                          className="px-4 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Register
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
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">MediBook+</h2>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navLinks.map((link) => (
                    <div key={link.name} className="relative">
                      <button
                        onClick={() => handleDropdownToggle(link.name)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 font-medium"
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="w-4 h-4" />
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
                            <div className="ml-8 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-1 my-2">
                              {link.submenu.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <item.icon className="w-4 h-4" />
                                  {item.name}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dark Mode</span>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors"
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow-lg absolute top-0.5"
                        animate={{ left: darkMode ? "1.5rem" : "0.125rem" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                  
                  {!user && (
                    <div className="flex gap-3">
                      <a
                        href="#login"
                        className="flex-1 text-center px-4 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Login
                      </a>
                      <a
                        href="#register"
                        className="flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Register
                      </a>
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