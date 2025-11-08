"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#" },
    { label: "Doctors", href: "#" },
    { label: "Appointments", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-lg ${
        scrolled ? "bg-white/70 dark:bg-gray-900/70 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="text-2xl font-bold text-blue-600 group-hover:scale-105 transition-transform">
            MediBook
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 transition-colors group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {theme === "light" ? (
              <Moon size={18} className="text-gray-700" />
            ) : (
              <Sun size={18} className="text-yellow-400" />
            )}
          </button>

          <button className="hidden md:inline btn-primary">Book Now</button>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          <ul className="flex flex-col items-center py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <button className="btn-primary w-5/6">Book Now</button>
          </ul>
        </div>
      )}
    </nav>
  );
}
