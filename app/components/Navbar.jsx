"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Doctors", href: "#doctors" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <span className="font-bold text-xl text-gray-800 dark:text-white">
            Medi<span className="text-blue-600">Book</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition font-medium"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions (CTA + Theme Toggle) */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="btn-outline">Book Now</button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700 dark:text-gray-300" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition font-medium text-lg"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <button className="btn-primary w-3/4">Book Now</button>
          </ul>
        </div>
      )}
    </nav>
  );
}
