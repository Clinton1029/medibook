"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  Stethoscope,
  User,
  BookOpen,
} from "lucide-react";

export default function Navbar() {
  // Mobile menu toggle
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dropdown toggles
  const [servicesOpen, setServicesOpen] = useState(false);
  const [doctorsOpen, setDoctorsOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#home" },
    {
      name: "Services",
      href: "#services",
      submenu: [
        { name: "Book Appointment", href: "#booking" },
        { name: "Consult Online", href: "#consult" },
        { name: "Pharmacy", href: "#pharmacy" },
        { name: "Diagnostics", href: "#diagnostics" },
        { name: "Vaccinations", href: "#vaccinations" },
      ],
    },
    {
      name: "Doctors",
      href: "#doctors",
      submenu: [
        { name: "All Doctors", href: "#all-doctors" },
        { name: "Specialists", href: "#specialists" },
        { name: "Nearby Clinics", href: "#nearby-clinics" },
      ],
    },
    { name: "About", href: "#about" },
    {
      name: "FAQ",
      href: "#faq",
      submenu: [
        { name: "Booking FAQ", href: "#booking-faq" },
        { name: "Payments FAQ", href: "#payments-faq" },
        { name: "Technical Support", href: "#support" },
      ],
    },
  ];

  // Example notifications
  const notifications = [
    { message: "New appointment request", time: "2m ago" },
    { message: "Doctor Dr. Smith confirmed", time: "1h ago" },
    { message: "Payment received for consultation", time: "3h ago" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-lg backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Stethoscope className="text-blue-600 w-6 h-6" />
          <h1 className="text-xl font-bold text-blue-600">MediBook</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => {
                if (link.name === "Services") setServicesOpen(true);
                if (link.name === "Doctors") setDoctorsOpen(true);
                if (link.name === "FAQ") setFaqOpen(true);
              }}
              onMouseLeave={() => {
                if (link.name === "Services") setServicesOpen(false);
                if (link.name === "Doctors") setDoctorsOpen(false);
                if (link.name === "FAQ") setFaqOpen(false);
              }}
            >
              <a
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1"
              >
                {link.name} {link.submenu && <ChevronDown className="w-4 h-4" />}
              </a>

              {/* Dropdown menus */}
              {link.submenu && (
                <AnimatePresence>
                  {(link.name === "Services" && servicesOpen) ||
                  (link.name === "Doctors" && doctorsOpen) ||
                  (link.name === "FAQ" && faqOpen) ? (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-4 px-2 z-50"
                    >
                      {link.submenu.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 rounded hover:bg-blue-50 transition font-medium text-gray-700"
                        >
                          {item.name}
                        </a>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* Notifications */}
          <div className="ml-4 relative">
            <button
              className="relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="w-5 h-5 text-gray-600 hover:text-blue-600 transition" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg py-2 px-2 z-50"
                >
                  {notifications.map((note, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 hover:bg-blue-50 rounded transition flex justify-between"
                    >
                      <span className="text-gray-700 text-sm">{note.message}</span>
                      <span className="text-gray-400 text-xs">{note.time}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop Login/Register */}
        <div className="hidden md:flex items-center gap-4 ml-4">
          <a
            href="#login"
            className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </a>
          <a
            href="#register"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden ml-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  <a
                    href={link.href}
                    className="block py-2 px-3 rounded hover:bg-gray-100 transition font-medium"
                  >
                    {link.name}
                  </a>
                  {link.submenu && (
                    <div className="pl-4 flex flex-col gap-1">
                      {link.submenu.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block py-1 px-3 rounded hover:bg-gray-100 transition text-gray-700"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 flex flex-col gap-2">
                <a
                  href="#login"
                  className="block text-center px-5 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition"
                >
                  Login
                </a>
                <a
                  href="#register"
                  className="block text-center px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Register
                </a>
              </div>

              {/* Mobile Notifications */}
              <div className="mt-4">
                <span className="font-medium text-gray-700">Notifications:</span>
                {notifications.map((note, i) => (
                  <div key={i} className="px-2 py-1 text-sm hover:bg-gray-100 rounded transition">
                    {note.message}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
