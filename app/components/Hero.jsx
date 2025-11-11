"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Search, Stethoscope, Users, Shield, Zap, Star, Award, Video, MessageCircle, Play, Phone, ChevronDown, X } from 'lucide-react';

export default function HospitalBookingHero() {
  const [activeTab, setActiveTab] = useState("doctor");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const departments = ["Cardiology", "Neurology", "Orthopedics", "Dermatology", "Pediatrics", "Dentistry", "Ophthalmology", "Psychiatry"];
  const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"];
  const features = [
    { icon: Users, title: "Verified Doctors", desc: "All specialists verified" },
    { icon: Clock, title: "24/7 Availability", desc: "Book anytime, anywhere" },
    { icon: Shield, title: "Secure & Private", desc: "Data completely secure" },
    { icon: Zap, title: "Instant Confirmation", desc: "Immediate confirmation" }
  ];
  const stats = [
    { value: "500+", label: "Expert Doctors" },
    { value: "50K+", label: "Happy Patients" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Support" }
  ];

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      alert("Appointment booked successfully!");
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl px-6 py-3 mb-8"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-700 font-semibold">Rated 4.9/5 by 50,000+ patients</span>
              <Award className="w-5 h-5 text-blue-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Connect with top medical specialists instantly. Book appointments, 
              video consultations, and get expert medical care from home.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                <h2 className="text-2xl font-bold text-white text-center">Book Your Appointment</h2>
                <p className="text-blue-100 text-center mt-2">Fast, secure healthcare access</p>
              </div>

              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("doctor")}
                  className={`flex-1 py-4 font-semibold text-center transition-colors ${
                    activeTab === "doctor" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Stethoscope className="w-5 h-5 mx-auto mb-1" />
                  Find Doctor
                </button>
                <button
                  onClick={() => setActiveTab("clinic")}
                  className={`flex-1 py-4 font-semibold text-center transition-colors ${
                    activeTab === "clinic" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <MapPin className="w-5 h-5 mx-auto mb-1" />
                  Nearby Clinic
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Department</label>
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 text-sm border rounded-lg transition-colors ${
                            selectedTime === time ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-700 hover:border-blue-500"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                      </>
                    )}
                  </button>
                </form>

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
          </div>
        </div>
      </div>

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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}