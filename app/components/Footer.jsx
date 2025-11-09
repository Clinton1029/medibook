"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Stethoscope } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    {
      name: "Services",
      href: "#services",
      submenu: [
        { name: "Book Appointment", href: "#booking" },
        { name: "Consult Online", href: "#consult" },
        { name: "Pharmacy", href: "#pharmacy" },
      ],
    },
    { name: "Doctors", href: "#doctors" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
    { name: "App Download", href: "#app" },
  ];

  return (
    <header className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Stethoscope className="text-blue-600 w-6 h-6" />
          <h1 className="text-xl font-bold text-blue-600">MediBook</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <a
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition font-medium"
                onMouseEnter={() => link.submenu && setServicesOpen(true)}
                onMouseLeave={() => link.submenu && setServicesOpen(false)}
              >
                {link.name} {link.submenu && <ChevronDown className="inline w-4 h-4" />}
              </a>

              {/* Mega menu */}
              {link.submenu && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-4 px-2 z-50"
                    >
                      {link.submenu.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                        >
                          {item.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#login"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </a>
          <a
            href="#register"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
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
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium"
                  >
                    {link.name}
                  </a>
                  {link.submenu && (
                    <div className="pl-4 flex flex-col gap-1">
                      {link.submenu.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block py-1 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-300"
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

              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
