"use client";

import { useState, useEffect } from "react";
import { Stethoscope, HeartPulse, CalendarDays, Users, ChevronRight, Play } from "lucide-react";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  // Smooth fade-in animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fadeInUp");
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".fade-section").forEach((el) => observer.observe(el));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* ========================= HERO SECTION ========================= */}
      <section className="section flex flex-col-reverse lg:flex-row items-center justify-between gap-10 container">
        <div className="flex-1 space-y-6 fade-section">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Your Health, <span className="text-blue-600">Our Priority</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            MediBook helps you connect with top doctors, schedule appointments, and get personalized
            healthcare — all from one easy-to-use platform.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button className="btn-primary flex items-center gap-2">
              Book Appointment <CalendarDays size={18} />
            </button>
            <button
              onClick={() => setShowVideo(true)}
              className="btn-outline flex items-center gap-2"
            >
              <Play size={16} /> Watch Demo
            </button>
          </div>

          <div className="flex items-center gap-6 mt-8">
            <div>
              <h3 className="text-3xl font-bold text-blue-600">5k+</h3>
              <p className="text-sm text-gray-500">Appointments booked</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-500">1k+</h3>
              <p className="text-sm text-gray-500">Verified doctors</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-purple-600">24/7</h3>
              <p className="text-sm text-gray-500">Patient support</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center fade-section">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/31/20/51/doctor-1294908_960_720.png"
            alt="Doctor"
            className="w-[420px] drop-shadow-2xl rounded-2xl animate-float"
          />
        </div>
      </section>

      {/* ========================= FEATURES SECTION ========================= */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container text-center fade-section">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Why Choose <span className="text-blue-600">MediBook?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              {
                icon: <Stethoscope size={36} className="text-blue-600" />,
                title: "Expert Doctors",
                desc: "Access top-rated, verified healthcare professionals across specialties.",
              },
              {
                icon: <HeartPulse size={36} className="text-red-500" />,
                title: "Instant Consultations",
                desc: "Get quick online consultations without leaving your home.",
              },
              {
                icon: <CalendarDays size={36} className="text-green-500" />,
                title: "Smart Scheduling",
                desc: "Seamlessly manage and reschedule appointments with reminders.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= STATS SECTION ========================= */}
      <section className="section">
        <div className="container grid md:grid-cols-4 gap-8 text-center fade-section">
          {[
            { num: "50+", label: "Hospitals" },
            { num: "1,000+", label: "Doctors" },
            { num: "10,000+", label: "Patients" },
            { num: "4.9★", label: "App Rating" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105"
            >
              <h3 className="text-4xl font-bold text-blue-600">{stat.num}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= TESTIMONIALS ========================= */}
      <section className="section bg-blue-50 dark:bg-gray-800">
        <div className="container text-center fade-section">
          <h2 className="text-3xl font-bold mb-10">What Our Patients Say</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Patient",
                quote:
                  "MediBook made it so easy to find a doctor and book an appointment. The experience was seamless!",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Jane Smith",
                role: "Patient",
                quote:
                  "I love how fast I can get online consultations without the long waiting lines. Highly recommend!",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Michael Lee",
                role: "Patient",
                quote:
                  "The reminder system is amazing! I never miss my doctor’s appointments anymore. Great UX!",
                img: "https://randomuser.me/api/portraits/men/68.jpg",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2"
              >
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-blue-500"
                />
                <p className="italic text-gray-600 dark:text-gray-400 mb-4">“{t.quote}”</p>
                <h4 className="font-bold text-blue-600">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= CALL TO ACTION ========================= */}
      <section className="section bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center fade-section">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your First Appointment Today!</h2>
          <p className="text-lg mb-6 opacity-90">
            Sign up now and get 20% off your first consultation with a verified doctor.
          </p>
          <button className="btn-outline bg-white text-blue-600 font-semibold hover:bg-gray-100">
            Get Started <ChevronRight size={18} className="inline-block ml-2" />
          </button>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
        <div className="container grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-3 text-xl">MediBook</h3>
            <p className="text-sm text-gray-400">
              Revolutionizing healthcare management with modern technology and seamless UX.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">About</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms</a></li>
              <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Get in Touch</h4>
            <p>Email: support@medibook.com</p>
            <p>Phone: +1 800 555 123</p>
            <div className="flex gap-4 mt-4">
              {["facebook", "twitter", "instagram"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition"
                >
                  <img src={`https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${s}.svg`} alt={s} width={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} MediBook. All rights reserved.
        </p>
      </footer>

      {/* ========================= VIDEO MODAL ========================= */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl relative max-w-3xl w-full mx-4">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="MediBook Demo"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </main>
  );
}
