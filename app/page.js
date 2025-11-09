"use client";

/**
 * MediBook — Feature-rich Landing Page (Single File)
 * - Modern premium Navbar (glass, blur, animated, dropdowns)
 * - Hero (interactive, animated, floating illustration, search)
 * - Doctors listing with search, filter, sort, and grid
 * - Appointment booking modal (form + simple date/time selection)
 * - Testimonials carousel
 * - Pricing cards
 * - FAQ accordion
 * - Newsletter + contact form
 * - Footer with links and social icons
 * - Dark mode toggle, back-to-top, toast notifications
 *
 * IMPORTANT: Requires Tailwind CSS and lucide-react (or replace icons)
 * Install icons: npm i lucide-react
 *
 * Put in app/page.jsx and run `npm run dev`
 */

import { useEffect, useState, useRef } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  Search,
  User,
  Calendar,
  Clock,
  MapPin,
  ChevronsUp,
  Play,
  ChevronsRight,
  Star,
} from "lucide-react";

// ---------- Helper: sample dataset ----------
const SAMPLE_DOCTORS = [
  {
    id: 1,
    name: "Dr. Grace Njeri",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 128,
    location: "Nairobi Clinic",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    price: 45,
    tags: ["heart", "adult"],
    nextAvailable: "2025-12-01",
  },
  {
    id: 2,
    name: "Dr. Kevin Otieno",
    specialty: "Dermatologist",
    rating: 4.7,
    reviews: 89,
    location: "Westside Health",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    price: 35,
    tags: ["skin", "cosmetic"],
    nextAvailable: "2025-11-12",
  },
  {
    id: 3,
    name: "Dr. Aisha Mwangi",
    specialty: "Pediatrician",
    rating: 4.95,
    reviews: 210,
    location: "Family Care Center",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    price: 30,
    tags: ["kids", "wellness"],
    nextAvailable: "2025-11-10",
  },
  {
    id: 4,
    name: "Dr. Paul Kamau",
    specialty: "Orthopedic",
    rating: 4.6,
    reviews: 74,
    location: "Orthocare",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    price: 55,
    tags: ["bones", "sports"],
    nextAvailable: "2025-11-16",
  },
  // add more sample doctors to make the grid feel real...
];

// ---------- Small utilities ----------
function formatDateISO(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString();
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

// ---------- Main Page ----------
export default function HomePage() {
  // Global states
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Search & filter states for doctors
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [minRating, setMinRating] = useState(4.5);
  const [sortBy, setSortBy] = useState("relevance"); // relevance | rating | price

  // doctors dataset and pagination
  const [doctors, setDoctors] = useState(SAMPLE_DOCTORS);
  const [page, setPage] = useState(1);
  const perPage = 6;

  // booking modal
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });

  // toast notifications
  const [toasts, setToasts] = useState([]);

  // video modal
  const [videoOpen, setVideoOpen] = useState(false);

  // back-to-top visibility
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // scroll handlers
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // dark mode class on html
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // filter & sort pipeline
  const filtered = doctors
    .filter((d) => {
      const matchesQuery =
        query.trim() === "" ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.specialty.toLowerCase().includes(query.toLowerCase()) ||
        d.location.toLowerCase().includes(query.toLowerCase());
      const matchesSpec = specialty === "All" || d.specialty === specialty;
      const matchesRating = d.rating >= minRating;
      return matchesQuery && matchesSpec && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.price - b.price;
      // relevance: keep as is
      return b.reviews - a.reviews;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageDoctors = filtered.slice((page - 1) * perPage, page * perPage);

  // derived specialties for filter dropdown
  const specialties = ["All", ...Array.from(new Set(SAMPLE_DOCTORS.map((d) => d.specialty)))];

  // booking handlers
  function openBooking(doctor) {
    setSelectedDoctor(doctor);
    setBookingData((bd) => ({ ...bd, date: doctor.nextAvailable || "" }));
    setBookingOpen(true);
  }
  function closeBooking() {
    setBookingOpen(false);
    setSelectedDoctor(null);
    setBookingData({ name: "", email: "", date: "", time: "", notes: "" });
  }

  function submitBooking(e) {
    e.preventDefault();
    // client-side validation
    if (!bookingData.name || !bookingData.email || !bookingData.date || !bookingData.time) {
      pushToast("Please fill name, email, date and time", "error");
      return;
    }
    // pretend to submit
    pushToast(`Appointment requested with ${selectedDoctor.name}`, "success");
    closeBooking();
  }

  function pushToast(message, type = "info") {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4500);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <SiteNavbar
        dark={dark}
        setDark={setDark}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        onCTA={() => {
          // quick CTA: scroll to doctors
          document.getElementById("doctors-section")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="pt-24">
        <HeroSection
          onSearch={(q) => {
            setQuery(q);
            setPage(1);
          }}
          onPlay={() => setVideoOpen(true)}
        />

        <FeaturesSection />

        <div id="doctors-section" className="container my-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Filters */}
            <aside className="w-full lg:w-72 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
              <h4 className="font-semibold text-lg mb-3">Find a Doctor</h4>

              <label className="text-sm text-gray-500">Search</label>
              <div className="flex items-center gap-2 mt-2">
                <Search className="text-gray-400" size={16} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent outline-none"
                  placeholder="Search by name, specialty, location..."
                />
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-500">Specialty</label>
                <select
                  value={specialty}
                  onChange={(e) => {
                    setSpecialty(e.target.value);
                    setPage(1);
                  }}
                  className="mt-2 w-full p-2 bg-white dark:bg-gray-900 border rounded-md"
                >
                  {specialties.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-500">Minimum rating</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm mt-1">{minRating.toFixed(1)}★ and up</div>
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-500">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mt-2 w-full p-2 bg-white dark:bg-gray-900 border rounded-md"
                >
                  <option value="relevance">Most Reviewed</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price">Lowest Price</option>
                </select>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {
                    setQuery("");
                    setSpecialty("All");
                    setMinRating(4.5);
                    setSortBy("relevance");
                    pushToast("Filters reset", "info");
                  }}
                  className="w-full btn-outline"
                >
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* Right: Doctors grid */}
            <section className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Available Doctors</h3>
                <div className="text-sm text-gray-500">
                  Showing {filtered.length} results — page {page} / {totalPages}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageDoctors.map((doc) => (
                  <DoctorCard
                    key={doc.id}
                    doctor={doc}
                    onBook={() => openBooking(doc)}
                    onView={() => pushToast(`Viewing ${doc.name}`, "info")}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPage((p) => clamp(p - 1, 1, totalPages))}
                    className="px-3 py-2 rounded-md border bg-white dark:bg-gray-800"
                    disabled={page <= 1}
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setPage((p) => clamp(p + 1, 1, totalPages))}
                    className="px-3 py-2 rounded-md border bg-white dark:bg-gray-800"
                    disabled={page >= totalPages}
                  >
                    Next
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  <span className="font-medium">{(page - 1) * perPage + 1}</span> -{" "}
                  <span className="font-medium">{Math.min(page * perPage, filtered.length)}</span>{" "}
                  of <span className="font-medium">{filtered.length}</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <Testimonials />

        <Pricing />

        <FAQ />

        <Newsletter />
      </main>

      <SiteFooter />

      {/* Booking Modal */}
      {bookingOpen && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          bookingData={bookingData}
          setBookingData={setBookingData}
          onClose={closeBooking}
          onSubmit={submitBooking}
        />
      )}

      {/* Video Modal */}
      {videoOpen && (
        <VideoModal
          onClose={() => setVideoOpen(false)}
          videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        />
      )}

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded-lg shadow-md  ${
              t.type === "success"
                ? "bg-green-600 text-white"
                : t.type === "error"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-6 bottom-6 p-3 rounded-full bg-blue-600 text-white shadow-lg z-40"
          aria-label="Back to top"
        >
          <ChevronsUp size={18} />
        </button>
      )}
    </div>
  );
}

/* ========================= SiteNavbar ========================= */
function SiteNavbar({ dark, setDark, menuOpen, setMenuOpen, scrolled, onCTA }) {
  const [showServices, setShowServices] = useState(false);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
              MB
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg">Medi<span className="text-blue-600">Book</span></span>
              <div className="text-xs text-gray-500">Smart healthcare booking</div>
            </div>
          </a>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-sm font-medium hover:text-blue-600">Home</a>

          <div className="relative">
            <button
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
              className="text-sm font-medium hover:text-blue-600 flex items-center gap-1"
            >
              Services
            </button>

            {showServices && (
              <div
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
                className="absolute left-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
              >
                <div className="grid grid-cols-1 gap-3">
                  <a href="#" className="p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3">
                    <StethoscopeIcon /> Consultations
                  </a>
                  <a href="#" className="p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3">
                    <CalendarIcon /> Scheduling
                  </a>
                  <a href="#" className="p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3">
                    <UsersIcon /> Telehealth
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onMouseEnter={() => setShowDoctorsDropdown(true)}
              onMouseLeave={() => setShowDoctorsDropdown(false)}
              className="text-sm font-medium hover:text-blue-600 flex items-center gap-1"
            >
              Doctors
            </button>

            {showDoctorsDropdown && (
              <div
                onMouseEnter={() => setShowDoctorsDropdown(true)}
                onMouseLeave={() => setShowDoctorsDropdown(false)}
                className="absolute left-0 mt-3 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
              >
                <h6 className="text-xs text-gray-500 mb-2">Popular specialties</h6>
                <div className="grid grid-cols-2 gap-2">
                  {["Cardiology", "Dermatology", "Pediatrics", "Orthopedic"].map((s) => (
                    <a key={s} href="#" className="p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="#about" className="text-sm font-medium hover:text-blue-600">About</a>
          <a href="#contact" className="text-sm font-medium hover:text-blue-600">Contact</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button onClick={onCTA} className="hidden md:inline btn-primary">
            Book Now
          </button>

          {/* mobile menu */}
          <button
            onClick={() => setMenuOpen((m) => !m)}
            className="md:hidden p-2 rounded-md bg-white dark:bg-gray-800"
            aria-label="Open menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile expanded menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="p-4 space-y-3">
            <a href="#home" className="block">Home</a>
            <a href="#services" className="block">Services</a>
            <a href="#doctors" className="block">Doctors</a>
            <a href="#about" className="block">About</a>
            <a href="#contact" className="block">Contact</a>
            <div className="pt-2">
              <button className="w-full btn-primary">Book Appointment</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Icons used inside navbar dropdown (inline simple components) */
function StethoscopeIcon() {
  return <div className="w-7 h-7 bg-blue-50 rounded p-1 text-blue-600"><Play size={14} /></div>;
}
function CalendarIcon() {
  return <div className="w-7 h-7 bg-green-50 rounded p-1 text-green-600"><Calendar size={14} /></div>;
}
function UsersIcon() {
  return <div className="w-7 h-7 bg-purple-50 rounded p-1 text-purple-600"><User size={14} /></div>;
}

/* ========================= Hero Section ========================= */
function HeroSection({ onSearch, onPlay }) {
  const [localQuery, setLocalQuery] = useState("");
  const [focus, setFocus] = useState(false);

  return (
    <section id="home" className="relative overflow-hidden pt-8">
      <div className="container grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-1 rounded-full text-sm text-blue-600">
            <strong>New</strong>
            <span>Online consultations available</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Book trusted doctors and manage appointments — <span className="text-blue-600">effortlessly</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 max-w-xl">
            MediBook helps you find top-rated doctors, book in seconds, and keep your health records all in one secure place.
          </p>

          {/* Search */}
          <div className={`flex gap-2 items-center bg-white dark:bg-gray-800 p-2 rounded-xl shadow ${focus ? "ring-2 ring-blue-300" : ""}`}>
            <input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="Search doctors, specialties, clinics..."
              className="flex-1 p-3 bg-transparent outline-none"
            />
            <button
              onClick={() => onSearch(localQuery)}
              className="btn-primary flex items-center gap-2"
              aria-label="Search"
            >
              <Search size={16} /> Search
            </button>
            <button onClick={onPlay} className="ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <Play size={18} />
            </button>
          </div>

          <div className="flex gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400" />{" "}
              <span><strong>4.9</strong> average rating</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon /> <span>Trusted by thousands</span>
            </div>
          </div>

        </div>

        <div className="relative">
          {/* Layered, floating illustration */}
          <div className="absolute -right-6 -top-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-3xl opacity-30 blur-3xl transform rotate-45" />
          <img
            src="https://images.unsplash.com/photo-1586773860416-6e7459a9f3d4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a7ef6f9bc3d7f3872b2c1c2f6b4a9ce"
            alt="Doctor & patient"
            className="w-full rounded-3xl shadow-2xl transform hover:-translate-y-3 transition"
          />

          {/* small features overlay */}
          <div className="absolute left-6 bottom-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg w-64">
            <div className="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="user" className="w-10 h-10 rounded-full" />
              <div>
                <div className="text-sm font-medium">Dr. Aisha Mwangi</div>
                <div className="text-xs text-gray-500">Pediatrician • Available today</div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-gray-600">Next slot</div>
              <div className="font-medium">Today • 3:30 PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================= Features Section ========================= */
function FeaturesSection() {
  const features = [
    {
      title: "Verified Doctors",
      desc: "Every doctor is verified and reviewed by patients.",
      icon: <StethoscopeIcon />,
    },
    {
      title: "Instant Booking",
      desc: "Choose a time slot and book in seconds with confirmations.",
      icon: <CalendarIcon />,
    },
    {
      title: "Telehealth",
      desc: "Secure online video consultations from home.",
      icon: <UsersIcon />,
    },
  ];

  return (
    <section id="services" className="container mt-12">
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
            <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-4">{f.icon}</div>
            <h4 className="font-semibold">{f.title}</h4>
            <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ========================= DoctorCard ========================= */
function DoctorCard({ doctor, onBook, onView }) {
  return (
    <article className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-2xl transition transform hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <img src={doctor.avatar} alt={doctor.name} className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <h5 className="font-semibold">{doctor.name}</h5>
          <div className="text-sm text-gray-500">{doctor.specialty} • {doctor.location}</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="text-sm text-yellow-400">{doctor.rating}★</div>
            <div className="text-xs text-gray-400">({doctor.reviews} reviews)</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">From</div>
          <div className="font-bold text-blue-600">${doctor.price}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={onBook} className="btn-primary flex-1">Book</button>
        <button onClick={onView} className="btn-outline">View</button>
      </div>
    </article>
  );
}

/* ========================= Booking Modal ========================= */
function BookingModal({ doctor, bookingData, setBookingData, onClose, onSubmit }) {
  // local times for the selected date
  const times = ["09:00", "10:00", "11:30", "13:00", "15:00"];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Book Appointment — {doctor.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">✕</button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Full name"
            value={bookingData.name}
            onChange={(e) => setBookingData((b) => ({ ...b, name: e.target.value }))}
            className="p-3 rounded-md bg-gray-50 dark:bg-gray-800"
            required
          />
          <input
            placeholder="Email address"
            type="email"
            value={bookingData.email}
            onChange={(e) => setBookingData((b) => ({ ...b, email: e.target.value }))}
            className="p-3 rounded-md bg-gray-50 dark:bg-gray-800"
            required
          />
          <div>
            <label className="text-sm text-gray-500">Date</label>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData((b) => ({ ...b, date: e.target.value }))}
              className="mt-2 p-3 rounded-md bg-gray-50 dark:bg-gray-800 w-full"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Time</label>
            <select
              value={bookingData.time}
              onChange={(e) => setBookingData((b) => ({ ...b, time: e.target.value }))}
              className="mt-2 p-3 rounded-md bg-gray-50 dark:bg-gray-800 w-full"
              required
            >
              <option value="">Select time</option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Notes (optional)"
            value={bookingData.notes}
            onChange={(e) => setBookingData((b) => ({ ...b, notes: e.target.value }))}
            className="p-3 rounded-md bg-gray-50 dark:bg-gray-800 md:col-span-2"
          />

          <div className="md:col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Confirm Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ========================= Testimonials ========================= */
function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      text: "Fast and reliable — booked a specialist in minutes!",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Sarah K.",
      text: "The online consultation was seamless and professional.",
      img: "https://randomuser.me/api/portraits/women/56.jpg",
    },
    {
      name: "Mike R.",
      text: "Great reminders, easy scheduling and friendly doctors.",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
    },
  ];

  // simple carousel
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="container mt-12">
      <h3 className="text-2xl font-bold mb-6">What patients say</h3>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`p-6 rounded-2xl shadow ${i === index ? "scale-100" : "opacity-60 scale-95"} transition`}>
              <div className="flex items-center gap-4 mb-3">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-gray-500">Verified patient</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t.text}</p>
            </div>
          ))}
        </div>

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <button onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)} className="p-2 bg-white dark:bg-gray-800 rounded-md shadow">‹</button>
          <button onClick={() => setIndex((i) => (i + 1) % testimonials.length)} className="p-2 bg-white dark:bg-gray-800 rounded-md shadow">›</button>
        </div>
      </div>
    </section>
  );
}

/* ========================= Pricing ========================= */
function Pricing() {
  const plans = [
    { id: "starter", title: "Starter", price: "$0", perks: ["Find doctors", "Book appointments", "Basic reminders"] },
    { id: "pro", title: "Pro", price: "$19/mo", perks: ["All starter", "Priority booking", "Telehealth sessions"] },
    { id: "enterprise", title: "Enterprise", price: "Contact", perks: ["Custom integrations", "Bulk scheduling", "Dedicated support"] },
  ];

  return (
    <section className="container mt-12">
      <h3 className="text-2xl font-bold mb-6">Plans for clinics & individuals</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">{p.title}</h4>
              <div className="text-2xl font-bold">{p.price}</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {p.perks.map((perk) => (
                <li key={perk}>• {perk}</li>
              ))}
            </ul>
            <div className="mt-6">
              <button className="btn-primary w-full">Choose</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ========================= FAQ ========================= */
function FAQ() {
  const faqs = [
    { q: "How do I book an appointment?", a: "Search doctors, pick a slot, and confirm booking. You’ll get email reminders." },
    { q: "Can I do telehealth consultations?", a: "Yes — many doctors offer secure video consultations." },
    { q: "How does payment work?", a: "Payments are processed securely via your chosen payment provider during checkout." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="about" className="container mt-12">
      <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((f, i) => (
          <div key={f.q} className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{f.q}</div>
                <div className="text-sm text-gray-500">{openIndex === i ? "Hide" : "Show answer"}</div>
              </div>
              <div className={`transform transition ${openIndex === i ? "rotate-180" : ""}`}>
                <ChevronsRight />
              </div>
            </button>
            {openIndex === i && <div className="mt-3 text-gray-600 dark:text-gray-300">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ========================= Newsletter ========================= */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="container mt-12">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 rounded-2xl text-white">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h4 className="text-2xl font-bold">Subscribe for updates</h4>
            <p className="mt-2 text-sm">Get medical tips, appointment reminders, and offers.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) return;
              setSent(true);
              setTimeout(() => {
                setEmail("");
                setSent(false);
              }, 2000);
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="p-3 rounded-md text-gray-900"
              required
            />
            <button type="submit" className="btn-primary">
              {sent ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ========================= Footer ========================= */
function SiteFooter() {
  return (
    <footer className="mt-12 bg-gray-900 text-gray-300">
      <div className="container py-12 grid md:grid-cols-4 gap-6">
        <div>
          <h5 className="text-white font-bold text-lg">MediBook</h5>
          <p className="mt-2 text-sm">Modern healthcare booking for everyone.</p>
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
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center">f</a>
            <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center">t</a>
            <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center">in</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 text-center text-sm">
        © {new Date().getFullYear()} MediBook. All rights reserved.
      </div>
    </footer>
  );
}

/* ========================= Video Modal ========================= */
function VideoModal({ videoUrl, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden w-full max-w-3xl">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">✕</button>
        </div>
        <div className="aspect-video">
          <iframe
            src={videoUrl}
            title="Demo"
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
