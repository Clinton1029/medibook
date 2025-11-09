"use client";



import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  Play,
  Star,
  Check,
  AlertCircle,
} from "lucide-react";

/* -------------------------
   Mock data (doctors, faqs)
   ------------------------- */
const MOCK_DOCTORS = [
  {
    id: 1,
    name: "Dr. Grace Njeri",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 128,
    clinic: "Nairobi Heart Center",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    fee: 55,
    nextAvailable: "2025-11-12",
    tags: ["heart", "adult"],
  },
  {
    id: 2,
    name: "Dr. Kevin Otieno",
    specialty: "Dermatology",
    rating: 4.7,
    reviews: 89,
    clinic: "Westside Skin Clinic",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    fee: 40,
    nextAvailable: "2025-11-17",
    tags: ["skin", "cosmetic"],
  },
  {
    id: 3,
    name: "Dr. Aisha Mwangi",
    specialty: "Pediatrics",
    rating: 4.95,
    reviews: 210,
    clinic: "Family Care Center",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    fee: 35,
    nextAvailable: "2025-11-10",
    tags: ["kids"],
  },
  {
    id: 4,
    name: "Dr. Paul Kamau",
    specialty: "Orthopedics",
    rating: 4.6,
    reviews: 74,
    clinic: "Orthocare",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    fee: 65,
    nextAvailable: "2025-11-16",
    tags: ["bones", "sports"],
  },
  {
    id: 5,
    name: "Dr. Maria Wanjiru",
    specialty: "General Practitioner",
    rating: 4.8,
    reviews: 300,
    clinic: "City Health",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    fee: 25,
    nextAvailable: "2025-11-11",
    tags: ["general"],
  },
  {
    id: 6,
    name: "Dr. John Mwangi",
    specialty: "ENT",
    rating: 4.5,
    reviews: 64,
    clinic: "ENT Specialists",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    fee: 45,
    nextAvailable: "2025-11-20",
    tags: ["ears", "nose"],
  },
  // Add more as needed for realistic grid
];

const FAQS = [
  {
    q: "How do I book an appointment on MediBook?",
    a: "Search for a doctor or clinic, choose an available slot, enter your details and confirm. You’ll receive email and SMS reminders.",
  },
  {
    q: "Can I do telehealth (online) consultations?",
    a: "Yes — many doctors offer secure video consultations. If available, you’ll see a 'Telehealth' option during booking.",
  },
  {
    q: "How do payments work?",
    a: "Payments are processed through trusted providers. You can also choose to pay at the clinic if supported.",
  },
];

/* -------------------------
   Animation variants
   ------------------------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

/* -------------------------
   Utility helpers
   ------------------------- */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const formatDateReadable = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
};

/* =========================
   Main Page (default export)
   ========================= */
export default function Page() {
  // Global UI state
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Doctors / search / filters
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance"); // relevance, rating, fee

  // booking modal
  const [booking, setBooking] = useState({ open: false, doctor: null });
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", date: "", time: "", notes: "" });

  // auth modals
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  // contact form
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  // toasts
  const [toasts, setToasts] = useState([]);

  // back to top
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowTop(window.scrollY > 700);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Filtering pipeline derived
  const filtered = doctors
    .filter((d) => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.clinic.toLowerCase().includes(q);
      const matchesSpec = specialty === "All" || d.specialty === specialty;
      const matchesRating = d.rating >= minRating;
      return matchesQ && matchesSpec && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "fee") return a.fee - b.fee;
      // relevance -> by reviews
      return b.reviews - a.reviews;
    });

  // derived specialties
  const specialties = ["All", ...Array.from(new Set(MOCK_DOCTORS.map((d) => d.specialty)))];

  /* -------------------------
     Toast helper
     ------------------------- */
  function pushToast(message, type = "info") {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4500);
  }

  /* -------------------------
     Booking handlers
     ------------------------- */
  function openBookingModal(doctor) {
    setBooking({ open: true, doctor });
    setBookingForm((b) => ({ ...b, date: doctor?.nextAvailable || "" }));
  }

  function closeBookingModal() {
    setBooking({ open: false, doctor: null });
    setBookingForm({ name: "", email: "", date: "", time: "", notes: "" });
  }

  function submitBooking(e) {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.date || !bookingForm.time) {
      pushToast("Please fill required booking fields", "error");
      return;
    }
    // simulate success
    pushToast(`Booking requested for ${booking.doctor.name}`, "success");
    closeBookingModal();
  }

  /* -------------------------
     Auth handlers (mock)
     ------------------------- */
  function submitLogin(e) {
    e.preventDefault();
    pushToast("Logged in (mock)", "success");
    setLoginOpen(false);
  }
  function submitRegister(e) {
    e.preventDefault();
    pushToast("Account created (mock)", "success");
    setRegisterOpen(false);
  }

  /* -------------------------
     Contact form (mock)
     ------------------------- */
  function submitContact(e) {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      pushToast("Please fill contact form", "error");
      return;
    }
    pushToast("Message sent — we will reply soon", "success");
    setContactForm({ name: "", email: "", message: "" });
  }

  /* -------------------------
     Small UI components inline
     ------------------------- */

  function IconStar({ className = "" }) {
    return <Star className={className} size={16} />;
  }

  /* -------------------------
     Render
     ------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* NAVBAR */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className={`fixed w-full z-50 top-0 left-0 transition-colors ${scrolled ? "backdrop-blur bg-white/80 dark:bg-gray-900/80 shadow-md" : "bg-transparent"}`}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">MB</div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg">Medi<span className="text-blue-600">Book</span></div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Smart healthcare booking</div>
              </div>
            </a>
          </div>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm font-medium hover:text-blue-600">Home</a>

            <div className="relative group">
              <button className="text-sm font-medium hover:text-blue-600">Services</button>
              <div className="absolute left-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                <a href="#services" className="block p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">Consultations</a>
                <a href="#appointments" className="block p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">Appointment Management</a>
                <a href="#contact" className="block p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">Telehealth</a>
              </div>
            </div>

            <a href="#doctors" className="text-sm font-medium hover:text-blue-600">Doctors</a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-600">Contact</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="toggle theme"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button onClick={() => setRegisterOpen(true)} className="hidden md:inline btn-outline">Sign up</button>
            <button onClick={() => setLoginOpen(true)} className="hidden md:inline btn-primary">Login</button>

            <button onClick={() => setMobileOpen((s) => !s)} className="md:hidden p-2 rounded-md bg-white dark:bg-gray-800">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="p-4 space-y-2">
                <a href="#home" className="block">Home</a>
                <a href="#services" className="block">Services</a>
                <a href="#doctors" className="block">Doctors</a>
                <a href="#appointments" className="block">Appointments</a>
                <a href="#contact" className="block">Contact</a>
                <div className="pt-2">
                  <button onClick={() => { setRegisterOpen(true); setMobileOpen(false); }} className="w-full btn-outline mb-2">Sign Up</button>
                  <button onClick={() => { setLoginOpen(true); setMobileOpen(false); }} className="w-full btn-primary">Login</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* MAIN */}
      <main className="pt-20">
        {/* HERO */}
        <section id="home" className="container grid lg:grid-cols-2 gap-8 items-center py-12">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-1 rounded-full text-sm text-blue-600">
              <strong>New</strong> Online consultations & Telehealth
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Book trusted doctors — <span className="text-blue-600">fast</span>, <span className="text-green-500">secure</span>, and simple.
            </h1>

            <p className="text-gray-600 dark:text-gray-300 max-w-xl">
              MediBook connects you with verified healthcare professionals, enables instant booking, reminders, and telehealth — all in one place.
            </p>

            {/* search bar */}
            <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md flex gap-3 items-center">
              <div className="flex items-center gap-2 px-2 border-r pr-3">
                <Search size={16} className="text-gray-400" />
                <input placeholder="Search doctors, specialties, clinics..." value={query} onChange={(e) => setQuery(e.target.value)} className="outline-none bg-transparent w-64" />
              </div>

              <div className="flex gap-2 items-center">
                <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="p-2 bg-white dark:bg-gray-900 rounded-md border">
                  {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 bg-white dark:bg-gray-900 rounded-md border">
                  <option value="relevance">Most reviewed</option>
                  <option value="rating">Highest rated</option>
                  <option value="fee">Lowest fee</option>
                </select>

                <button onClick={() => { /* keep search reactive */ pushToast("Search applied", "info"); }} className="btn-primary">Search</button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2"><Star className="text-yellow-400" size={16} /> <strong>4.9</strong> avg rating</div>
              <div className="hidden sm:flex items-center gap-2"><User size={16} /> Trusted by 10k+ patients</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1586773860416-6e7459a9f3d4?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a7ef6f9bc3d7f3872b2c1c2f6b4a9ce" alt="doctor" className="w-full h-[420px] object-cover" />
            </div>

            <div className="absolute left-6 bottom-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md w-72">
              <div className="flex items-center gap-3">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="doc" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="text-sm font-semibold">Dr. Aisha Mwangi</div>
                  <div className="text-xs text-gray-500">Pediatrician • Available today</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <div>Next slot</div>
                <div className="font-semibold">Today • 3:30 PM</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section id="services" className="container py-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-8">
            <h2 className="text-2xl font-bold">Why people choose MediBook</h2>
            <p className="text-gray-500 mt-2">Modern features designed around patients and clinics</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-4"><Calendar size={20} className="text-blue-600" /></div>
              <h4 className="font-semibold">Intelligent Scheduling</h4>
              <p className="text-sm text-gray-500 mt-2">Auto slot suggestions, rescheduling, and calendar sync (Google/Outlook).</p>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={1} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <div className="w-14 h-14 rounded-lg bg-green-50 flex items-center justify-center mb-4"><Clock size={20} className="text-green-600" /></div>
              <h4 className="font-semibold">Telehealth & Reminders</h4>
              <p className="text-sm text-gray-500 mt-2">Secure video visits and automated SMS/email reminders to reduce no-shows.</p>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={2} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <div className="w-14 h-14 rounded-lg bg-purple-50 flex items-center justify-center mb-4"><User size={20} className="text-purple-600" /></div>
              <h4 className="font-semibold">Verified Doctors</h4>
              <p className="text-sm text-gray-500 mt-2">All practitioners are credential-checked and reviewed by patients.</p>
            </motion.div>
          </div>
        </section>

        {/* DOCTORS GRID & FILTERS */}
        <section id="doctors" className="container py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-72 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
              <h4 className="font-semibold mb-3">Filters</h4>

              <label className="text-sm text-gray-500">Specialty</label>
              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full mt-2 p-2 rounded-md bg-white dark:bg-gray-900 border">
                {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>

              <label className="text-sm text-gray-500 mt-4">Min rating</label>
              <input type="range" min="0" max="5" step="0.1" value={minRating} onChange={(e) => setMinRating(parseFloat(e.target.value))} className="w-full mt-2" />
              <div className="text-sm mt-1">{minRating.toFixed(1)}★ and up</div>

              <label className="text-sm text-gray-500 mt-4">Sort</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full mt-2 p-2 rounded-md bg-white dark:bg-gray-900 border">
                <option value="relevance">Most reviewed</option>
                <option value="rating">Highest rated</option>
                <option value="fee">Lowest fee</option>
              </select>

              <div className="mt-4">
                <button onClick={() => { setQuery(""); setSpecialty("All"); setMinRating(0); setSortBy("relevance"); pushToast("Filters reset", "info"); }} className="w-full btn-outline">Reset</button>
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Available Doctors</h3>
                <div className="text-sm text-gray-500">{filtered.length} results</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((doc) => (
                  <motion.article key={doc.id} whileHover={{ y: -6 }} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                    <div className="flex items-start gap-3">
                      <img src={doc.avatar} alt={doc.name} className="w-16 h-16 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{doc.name}</h4>
                            <div className="text-xs text-gray-500">{doc.specialty} • {doc.clinic}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">From</div>
                            <div className="text-lg font-bold text-blue-600">${doc.fee}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex items-center gap-1 text-yellow-400 font-medium">{doc.rating} <Star size={14} /></div>
                          <div className="text-xs text-gray-400">({doc.reviews} reviews)</div>
                        </div>

                        <div className="mt-3 flex gap-2">
                          <button onClick={() => openBookingModal(doc)} className="btn-primary flex-1">Book</button>
                          <button onClick={() => pushToast(`Viewing ${doc.name}`, "info")} className="btn-outline">Details</button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* APPOINTMENTS SECTION - a quick booking hub */}
        <section id="appointments" className="container py-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold">Quick Appointment</h3>
              <p className="text-gray-600 mt-2">Select a doctor, pick a date and time, confirm — we’ll handle the rest.</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select className="p-3 rounded-md bg-white dark:bg-gray-800 border">
                  <option>Choose doctor (demo)</option>
                  {MOCK_DOCTORS.map((d) => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
                </select>
                <input type="date" className="p-3 rounded-md bg-white dark:bg-gray-800 border" />
                <select className="p-3 rounded-md bg-white dark:bg-gray-800 border">
                  <option>09:00</option>
                  <option>10:30</option>
                  <option>13:00</option>
                </select>
                <button className="btn-primary">Request Appointment</button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h4 className="font-semibold">Why schedule with MediBook?</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Real-time availability</li>
                <li>• Secure patient data</li>
                <li>• Integrated reminders</li>
                <li>• Easy rescheduling & cancellation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container py-10">
          <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {FAQS.map((f, i) => <FAQCard key={i} faq={f} />)}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="container py-12">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <h3 className="text-2xl font-bold">Get in touch</h3>
              <p className="text-gray-600 mt-2">Have questions? Our team is here to help.</p>

              <form onSubmit={submitContact} className="mt-6 space-y-3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <div className="grid md:grid-cols-2 gap-3">
                  <input className="p-3 rounded-md bg-gray-50 dark:bg-gray-900" placeholder="Full name" value={contactForm.name} onChange={(e) => setContactForm((s) => ({ ...s, name: e.target.value }))} />
                  <input className="p-3 rounded-md bg-gray-50 dark:bg-gray-900" placeholder="Email" value={contactForm.email} onChange={(e) => setContactForm((s) => ({ ...s, email: e.target.value }))} />
                </div>
                <textarea className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-900" rows="5" placeholder="How can we help?" value={contactForm.message} onChange={(e) => setContactForm((s) => ({ ...s, message: e.target.value }))} />
                <div className="flex items-center gap-3">
                  <button type="submit" className="btn-primary">Send Message</button>
                  <button type="button" className="btn-outline" onClick={() => { setContactForm({ name: "", email: "", message: "" }); pushToast("Contact cleared", "info"); }}>Clear</button>
                </div>
              </form>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <h4 className="font-semibold">Contact Details</h4>
                <p className="text-sm text-gray-500 mt-2">support@medibook.com</p>
                <p className="text-sm text-gray-500">+1 (800) 555-1234</p>

                <div className="mt-4">
                  <h5 className="font-medium">Office</h5>
                  <p className="text-sm text-gray-500">123 Health Ave, Nairobi</p>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium">Working Hours</h5>
                  <p className="text-sm text-gray-500">Mon-Fri 8:00 — 17:00</p>
                </div>
              </div>

              <div className="mt-4">
                <iframe title="map" src="https://maps.google.com/maps?q=nairobi&t=&z=13&ie=UTF8&iwloc=&output=embed" className="w-full h-56 rounded-2xl border-0" />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-300 mt-12">
          <div className="container py-12 grid md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">MB</div>
                <div>
                  <div className="font-bold text-white">MediBook</div>
                  <div className="text-sm text-gray-400">Smart healthcare booking</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">Trusted platform for doctors and clinics. Secure, reliable, and easy to use.</p>

              <div className="mt-4">
                <h6 className="text-sm font-semibold">Subscribe</h6>
                <div className="mt-2 flex gap-2">
                  <input placeholder="you@domain.com" className="p-2 rounded-md bg-gray-50 dark:bg-gray-800 flex-1" />
                  <button className="btn-primary">Subscribe</button>
                </div>
              </div>
            </div>

            <div>
              <h6 className="text-white font-semibold mb-2">Company</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h6 className="text-white font-semibold mb-2">Support</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>

            <div>
              <h6 className="text-white font-semibold mb-2">Contact</h6>
              <p className="text-sm">support@medibook.com</p>
              <p className="text-sm">+1 (800) 555-1234</p>
              <div className="flex gap-2 mt-4">
                <a className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">f</a>
                <a className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">t</a>
                <a className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">in</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 py-6 text-center text-sm">
            © {new Date().getFullYear()} MediBook. All rights reserved.
          </div>
        </footer>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {booking.open && booking.doctor && (
          <motion.div key="booking" variants={modalVariant} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Book with {booking.doctor.name}</h4>
                <button onClick={closeBookingModal} className="text-gray-500 hover:text-red-500">✕</button>
              </div>

              <form onSubmit={submitBooking} className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <input required placeholder="Full name" value={bookingForm.name} onChange={(e) => setBookingForm((s) => ({ ...s, name: e.target.value }))} className="p-3 rounded-md bg-gray-50 dark:bg-gray-800" />
                <input required placeholder="Email" type="email" value={bookingForm.email} onChange={(e) => setBookingForm((s) => ({ ...s, email: e.target.value }))} className="p-3 rounded-md bg-gray-50 dark:bg-gray-800" />
                <input required type="date" value={bookingForm.date} onChange={(e) => setBookingForm((s) => ({ ...s, date: e.target.value }))} className="p-3 rounded-md bg-gray-50 dark:bg-gray-800" />
                <select required value={bookingForm.time} onChange={(e) => setBookingForm((s) => ({ ...s, time: e.target.value }))} className="p-3 rounded-md bg-gray-50 dark:bg-gray-800">
                  <option value="">Select time</option>
                  <option>09:00</option>
                  <option>10:30</option>
                  <option>13:00</option>
                  <option>15:00</option>
                </select>

                <textarea placeholder="Notes (optional)" value={bookingForm.notes} onChange={(e) => setBookingForm((s) => ({ ...s, notes: e.target.value }))} className="p-3 rounded-md bg-gray-50 dark:bg-gray-800 md:col-span-2" rows={4} />

                <div className="md:col-span-2 flex justify-end gap-3">
                  <button type="button" onClick={closeBookingModal} className="btn-outline">Cancel</button>
                  <button type="submit" className="btn-primary">Confirm</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {loginOpen && (
          <motion.div key="login" variants={modalVariant} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Login</h4>
                <button onClick={() => setLoginOpen(false)} className="text-gray-500">✕</button>
              </div>

              <form onSubmit={submitLogin} className="mt-4 space-y-3">
                <input required placeholder="Email" type="email" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800" />
                <input required placeholder="Password" type="password" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800" />
                <div className="flex items-center justify-between">
                  <button type="submit" className="btn-primary">Login</button>
                  <button type="button" onClick={() => { setLoginOpen(false); setRegisterOpen(true); }} className="btn-outline">Create account</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {registerOpen && (
          <motion.div key="register" variants={modalVariant} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Create an account</h4>
                <button onClick={() => setRegisterOpen(false)} className="text-gray-500">✕</button>
              </div>

              <form onSubmit={submitRegister} className="mt-4 space-y-3">
                <input required placeholder="Full name" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800" />
                <input required placeholder="Email" type="email" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800" />
                <input required placeholder="Password" type="password" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800" />
                <div className="flex items-center justify-between">
                  <button type="submit" className="btn-primary">Create</button>
                  <button type="button" onClick={() => { setRegisterOpen(false); setLoginOpen(true); }} className="btn-outline">Already have an account?</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toasts */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <motion.div key={t.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className={`px-4 py-2 rounded-lg shadow-md ${t.type === "success" ? "bg-green-600 text-white" : t.type === "error" ? "bg-red-600 text-white" : "bg-gray-800 text-white"}`}>
            {t.message}
          </motion.div>
        ))}
      </div>

      {/* Back-to-top */}
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed right-6 bottom-6 p-3 rounded-full bg-blue-600 text-white shadow-lg z-40">
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================
   Small subcomponents below
   (FAQ card, etc.)
   ========================= */

function FAQCard({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left flex items-center justify-between">
        <div>
          <div className="font-semibold">{faq.q}</div>
          <div className="text-sm text-gray-500">{open ? "Hide answer" : "Show answer"}</div>
        </div>
        <div className={`transform transition ${open ? "rotate-180" : ""}`}>
          <ChevronUp size={18} />
        </div>
      </button>
      {open && <div className="mt-3 text-gray-600 dark:text-gray-300">{faq.a}</div>}
    </div>
  );
}
