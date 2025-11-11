"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    MapPin,
    Search,
    Stethoscope,
    Users,
    Shield,
    Zap,
    Star,
    CheckCircle,
    ArrowRight,
    Play,
    Award,
    Heart,
    Brain,
    Bone,
    Eye,
    Baby,
    UserCheck,
    FileText,
    Phone,
    Video,
    MessageCircle,
    ChevronDown,
    X
  } from 'lucide-react';

export default function HospitalBookingHero() {
  const [activeTab, setActiveTab] = useState("doctor");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Dentistry",
    "Ophthalmology",
    "Psychiatry",
    "Surgery",
    "Emergency"
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const features = [
    {
      icon: UserCheck,
      title: "Verified Doctors",
      description: "All our specialists are verified and certified"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Book appointments anytime, anywhere"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your medical data is completely secure"
    },
    {
      icon: Zap,
      title: "Instant Confirmation",
      description: "Get immediate appointment confirmation"
    }
  ];

  const stats = [
    { value: "500+", label: "Expert Doctors" },
    { value: "50K+", label: "Happy Patients" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Support" }
  ];

  const specialists = [
    { icon: Heart, name: "Cardiologists", available: 24 },
    { icon: Brain, name: "Neurologists", available: 18 },
    { icon: Bone, name: "Orthopedics", available: 32 },
    { icon: Eye, name: "Ophthalmologists", available: 15 },
   { icon: Bone, name: "Dentists", available: 28 },
    { icon: Baby, name: "Pediatricians", available: 22 }
  ];

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      // Handle booking logic here
      alert("Appointment booked successfully!");
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl px-6 py-3 mb-8 shadow-lg"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-700 font-semibold">Rated 4.9/5 by 50,000+ patients</span>
              <Award className="w-5 h-5 text-blue-600" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Find & Book
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Healthcare Experts
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Connect with top medical specialists instantly. Book appointments, 
              video consultations, and get expert medical care from the comfort of your home.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                <Video className="w-5 h-5" />
                Video Consult
              </button>
              <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                <MessageCircle className="w-5 h-5" />
                Chat with Doctor
              </button>
              <button 
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Right Content - Booking Card */}
          <div className="relative">
            {/* Main Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                <h2 className="text-2xl font-bold text-white text-center">
                  Book Your Appointment
                </h2>
                <p className="text-blue-100 text-center mt-2">
                  Fast, secure, and convenient healthcare access
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("doctor")}
                  className={`flex-1 py-4 font-semibold text-center transition-colors ${
                    activeTab === "doctor"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Stethoscope className="w-5 h-5 mx-auto mb-1" />
                  Find Doctor
                </button>
                <button
                  onClick={() => setActiveTab("clinic")}
                  className={`flex-1 py-4 font-semibold text-center transition-colors ${
                    activeTab === "clinic"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <MapPin className="w-5 h-5 mx-auto mb-1" />
                  Nearby Clinic
                </button>
              </div>

              {/* Booking Form */}
              <div className="p-6">
                <form onSubmit={handleBooking} className="space-y-4">
                  {/* Department Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Department
                    </label>
                    <div className="relative">
                      <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        required
                      >
                        <option value="">Choose a department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 text-sm border rounded-lg transition-colors ${
                            selectedTime === time
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 text-gray-700 hover:border-blue-500"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Finding Available Doctors...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Find Available Doctors
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Quick Features */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {features.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">245</div>
                  <div className="text-gray-600 text-sm">Doctors Online</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">5 min</div>
                  <div className="text-gray-600 text-sm">Avg. Wait Time</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Specialists Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Find the Right Specialist
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with expert doctors across various medical specialties
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {specialists.map((specialist, index) => {
              const IconComponent = specialist.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-center mb-2">
                    {specialist.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <UserCheck className="w-4 h-4 text-green-500" />
                    <span>{specialist.available} doctors available</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Emergency Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-8 text-white"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Emergency Medical Care</h2>
              <p className="text-red-100 text-lg mb-6">
                Need immediate medical attention? Our emergency team is available 24/7 to provide urgent care.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Emergency
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  Find Emergency Center
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "5 min", label: "Response Time" },
                { value: "24/7", label: "Availability" },
                { value: "100+", label: "Emergency Rooms" },
                { value: "95%", label: "Success Rate" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-red-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white ml-2" />
                  </div>
                  <p className="text-gray-600 font-semibold">Platform Demo Video</p>
                  <p className="text-gray-500 text-sm mt-1">2:30 minutes</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}