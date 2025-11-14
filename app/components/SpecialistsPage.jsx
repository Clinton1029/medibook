"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  Calendar,
  Video,
  Phone,
  MessageCircle,
  Award,
  Shield,
  Zap,
  Users,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Stethoscope,
  ChevronDown,
  X,
  Navigation,
  PhoneCall,
  Mail,
  Globe,
  CheckCircle
} from 'lucide-react';

export default function SpecialistsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Sample data
  const specialties = [
    { id: "cardiology", name: "Cardiology", icon: Heart, count: 24 },
    { id: "neurology", name: "Neurology", icon: Brain, count: 18 },
    { id: "orthopedics", name: "Orthopedics", icon: Bone, count: 32 },
    { id: "ophthalmology", name: "Ophthalmology", icon: Eye, count: 15 },
    { id: "pediatrics", name: "Pediatrics", icon: Baby, count: 22 },
    { id: "dentistry", name: "Dentistry", icon: Bone, count: 28 }
  ];

  const locations = [
    "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", 
    "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA"
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Cardiology",
      specialtyId: "cardiology",
      image: "/api/placeholder/150/150",
      rating: 4.9,
      reviews: 284,
      experience: "15 years",
      education: "Harvard Medical School",
      languages: ["English", "Mandarin"],
      location: "New York, NY",
      availability: "Today",
      price: "$299",
      verified: true,
      featured: true,
      badges: ["Top Rated", "Heart Specialist"],
      services: ["Consultation", "Surgery", "Follow-up"],
      about: "Leading cardiologist with extensive experience in interventional procedures.",
      nextAvailable: "2:00 PM"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      specialty: "Neurology",
      specialtyId: "neurology",
      image: "/api/placeholder/150/150",
      rating: 4.8,
      reviews: 196,
      experience: "12 years",
      education: "Johns Hopkins University",
      languages: ["English", "Spanish"],
      location: "Los Angeles, CA",
      availability: "Tomorrow",
      price: "$399",
      verified: true,
      featured: false,
      badges: ["Research Lead"],
      services: ["Consultation", "Therapy", "Diagnostics"],
      about: "Specialized in neurological disorders and advanced brain mapping.",
      nextAvailable: "10:30 AM"
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      specialty: "Orthopedics",
      specialtyId: "orthopedics",
      image: "/api/placeholder/150/150",
      rating: 4.9,
      reviews: 312,
      experience: "18 years",
      education: "Mayo Medical School",
      languages: ["English", "French"],
      location: "Chicago, IL",
      availability: "Today",
      price: "$349",
      verified: true,
      featured: true,
      badges: ["Robotics Expert"],
      services: ["Surgery", "Rehabilitation", "Consultation"],
      about: "Pioneer in minimally invasive orthopedic surgeries.",
      nextAvailable: "3:15 PM"
    },
    {
      id: 4,
      name: "Dr. James Kim",
      specialty: "Ophthalmology",
      specialtyId: "ophthalmology",
      image: "/api/placeholder/150/150",
      rating: 4.9,
      reviews: 267,
      experience: "14 years",
      education: "Stanford University",
      languages: ["English", "Korean"],
      location: "Houston, TX",
      availability: "Tomorrow",
      price: "$499",
      verified: true,
      featured: false,
      badges: ["LASIK Specialist"],
      services: ["LASIK", "Cataract Surgery", "Consultation"],
      about: "Expert in laser vision correction and retinal diseases.",
      nextAvailable: "11:00 AM"
    },
    {
      id: 5,
      name: "Dr. Amanda Patel",
      specialty: "Pediatrics",
      specialtyId: "pediatrics",
      image: "/api/placeholder/150/150",
      rating: 4.8,
      reviews: 189,
      experience: "10 years",
      education: "Boston University",
      languages: ["English", "Hindi"],
      location: "Phoenix, AZ",
      availability: "Today",
      price: "$279",
      verified: true,
      featured: true,
      badges: ["Child Care Expert"],
      services: ["Check-ups", "Vaccinations", "Consultation"],
      about: "Dedicated to providing compassionate care for children of all ages.",
      nextAvailable: "1:45 PM"
    },
    {
      id: 6,
      name: "Dr. Robert Brown",
      specialty: "Cardiology",
      specialtyId: "cardiology",
      image: "/api/placeholder/150/150",
      rating: 4.7,
      reviews: 156,
      experience: "11 years",
      education: "Duke University",
      languages: ["English"],
      location: "San Diego, CA",
      availability: "Tomorrow",
      price: "$329",
      verified: true,
      featured: false,
      badges: ["Cardiac Rehab"],
      services: ["Consultation", "Rehabilitation", "Follow-up"],
      about: "Specialized in cardiac rehabilitation and preventive care.",
      nextAvailable: "9:30 AM"
    }
  ];

  const clinics = [
    {
      id: 1,
      name: "Manhattan Medical Center",
      type: "Multi-specialty",
      address: "123 Park Ave, New York, NY 10022",
      distance: "0.8 miles",
      rating: 4.8,
      open: true,
      hours: "8:00 AM - 8:00 PM",
      services: ["Emergency", "Surgery", "Imaging"],
      doctors: 45
    },
    {
      id: 2,
      name: "Downtown Health Clinic",
      type: "General Practice",
      address: "456 Broadway, New York, NY 10013",
      distance: "1.2 miles",
      rating: 4.6,
      open: true,
      hours: "9:00 AM - 6:00 PM",
      services: ["Primary Care", "Vaccinations", "Check-ups"],
      doctors: 12
    },
    {
      id: 3,
      name: "Westside Surgical Center",
      type: "Surgical",
      address: "789 5th Ave, New York, NY 10019",
      distance: "2.1 miles",
      rating: 4.9,
      open: false,
      hours: "7:00 AM - 5:00 PM",
      services: ["Surgery", "Recovery", "Consultation"],
      doctors: 28
    }
  ];

  // Filter doctors based on active filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = activeFilter === "all" || doctor.specialtyId === activeFilter;
    const matchesLocation = !selectedLocation || doctor.location === selectedLocation;
    const matchesSpecialtyFilter = !selectedSpecialty || doctor.specialtyId === selectedSpecialty;

    return matchesSearch && matchesSpecialty && matchesLocation && matchesSpecialtyFilter;
  });

  const filteredClinics = clinics.filter(clinic => 
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clinic.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  // Update filter when specialty is selected from dropdown
  useEffect(() => {
    if (selectedSpecialty) {
      setActiveFilter(selectedSpecialty);
    }
  }, [selectedSpecialty]);

  const DoctorCard = ({ doctor }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{doctor.name}</h3>
              <p className="text-blue-600 font-medium">{doctor.specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-gray-700 font-medium">{doctor.rating}</span>
                <span className="text-gray-500 text-sm">({doctor.reviews} reviews)</span>
              </div>
            </div>
          </div>
          {doctor.featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{doctor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Next: {doctor.nextAvailable}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Award className="w-4 h-4" />
            <span className="text-sm">{doctor.experience} experience</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {doctor.badges.map((badge, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {badge}
            </span>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doctor.about}</p>

        <div className="flex gap-2">
          <button
            onClick={() => handleBookAppointment(doctor)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
          >
            Book Appointment
          </button>
          <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <MessageCircle className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const ClinicCard = ({ clinic }) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{clinic.name}</h3>
          <p className="text-gray-600 text-sm">{clinic.type}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{clinic.rating}</span>
          </div>
          <div className={`text-sm ${clinic.open ? 'text-green-600' : 'text-red-600'}`}>
            {clinic.open ? 'Open Now' : 'Closed'}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{clinic.address}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Navigation className="w-4 h-4" />
          <span className="text-sm">{clinic.distance}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{clinic.hours}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{clinic.doctors} doctors</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
          View Clinic
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-cyan-200">Healthcare Specialist</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with top-rated medical experts. Book appointments instantly with verified doctors.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation & Filters */}
      <section className="py-8 bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Specialty Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === "all"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-500"
                }`}
              >
                All Doctors
              </button>
              {specialties.map((specialty) => {
                const IconComponent = specialty.icon;
                return (
                  <button
                    key={specialty.id}
                    onClick={() => setActiveFilter(specialty.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      activeFilter === specialty.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-blue-500"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {specialty.name}
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {specialty.count}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={() => setActiveFilter("clinics")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === "clinics"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-500"
                }`}
              >
                <MapPin className="w-4 h-4" />
                Nearby Clinics
              </button>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search doctors, specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-500 transition-colors bg-white"
              >
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specialty
                    </label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Specialties</option>
                      {specialties.map((specialty) => (
                        <option key={specialty.id} value={specialty.id}>
                          {specialty.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Locations</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Availability
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Any Time</option>
                      <option>Today</option>
                      <option>Tomorrow</option>
                      <option>This Week</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setSelectedSpecialty("");
                      setSelectedLocation("");
                      setSearchQuery("");
                    }}
                    className="text-gray-600 hover:text-gray-800 font-semibold"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {activeFilter === "clinics" ? "Nearby Clinics" : "Medical Specialists"}
              </h2>
              <p className="text-gray-600">
                {activeFilter === "all" 
                  ? `Showing ${filteredDoctors.length} doctors` 
                  : activeFilter === "clinics"
                  ? `Found ${filteredClinics.length} clinics near you`
                  : `Found ${filteredDoctors.length} ${specialties.find(s => s.id === activeFilter)?.name} specialists`
                }
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-1">
                    <div className="bg-gray-600 rounded-sm"></div>
                    <div className="bg-gray-600 rounded-sm"></div>
                    <div className="bg-gray-600 rounded-sm"></div>
                    <div className="bg-gray-600 rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col gap-1">
                    <div className="bg-gray-600 rounded-sm h-1"></div>
                    <div className="bg-gray-600 rounded-sm h-1"></div>
                    <div className="bg-gray-600 rounded-sm h-1"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {activeFilter === "clinics" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          ) : (
            <div className={`gap-6 ${
              viewMode === "grid" 
                ? "grid md:grid-cols-2 lg:grid-cols-3" 
                : "flex flex-col"
            }`}>
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {activeFilter !== "clinics" && filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find more results.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("");
                  setSelectedLocation("");
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Book Appointment</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Doctor Info */}
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedDoctor.name}</h4>
                    <p className="text-blue-600">{selectedDoctor.specialty}</p>
                    <p className="text-gray-600">Consultation: {selectedDoctor.price}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time Slot</label>
                    <select className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>09:00 AM - 10:00 AM</option>
                      <option>10:00 AM - 11:00 AM</option>
                      <option>02:00 PM - 03:00 PM</option>
                      <option>03:00 PM - 04:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Consultation Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-4 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-50">
                      <Video className="w-5 h-5" />
                      Video Call
                    </button>
                    <button className="flex items-center gap-3 p-4 border border-gray-300 text-gray-600 rounded-xl font-semibold transition-all duration-300 hover:border-blue-500 hover:bg-blue-50">
                      <Phone className="w-5 h-5" />
                      In-Person
                    </button>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Confirm Booking - {selectedDoctor.price}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}