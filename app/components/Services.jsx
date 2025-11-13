"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Heart, 
  Brain, 
  Bone, 
  Eye, 
  Baby, 
  Microscope,
  Stethoscope,
  Shield,
  Zap,
  Clock,
  Users,
  Award,
  Star,
  CheckCircle,
  Play,
  X,
  ArrowRight,
  Calendar,
  Video,
  Phone,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Target,
  Globe,
  Smartphone,
  Cloud,
  Lock
} from 'lucide-react';

export default function ModernServices() {
  const [activeService, setActiveService] = useState(0);
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Scroll progress indicator
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const premiumServices = [
    {
      icon: Heart,
      title: "Cardiac Care Plus",
      description: "Advanced cardiac treatments with AI-powered diagnostics and 24/7 monitoring",
      features: ["AI-Powered Diagnostics", "24/7 Cardiac Monitoring", "Minimally Invasive Surgery", "Personalized Rehabilitation"],
      price: "From $299",
      duration: "60-90 min",
      level: "Premium",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      doctors: 12,
      successRate: "98%",
      technology: ["AI Diagnostics", "Remote Monitoring", "3D Imaging"],
      waitTime: "24h",
      popular: true
    },
    {
      icon: Brain,
      title: "Neuro Excellence",
      description: "Cutting-edge neurological care with brain mapping and AI-assisted treatments",
      features: ["Advanced Brain Mapping", "Neurological Rehabilitation", "AI Diagnostics", "Memory Care Programs"],
      price: "From $399",
      duration: "45-120 min",
      level: "Elite",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      doctors: 8,
      successRate: "96%",
      technology: ["fMRI Technology", "Neuro Navigation", "AI Analysis"],
      waitTime: "48h",
      popular: false
    },
    {
      icon: Bone,
      title: "Orthopedic Mastery",
      description: "Robotic-assisted orthopedic solutions with personalized recovery plans",
      features: ["Robotic Surgery", "Sports Medicine", "Joint Replacement", "Physical Therapy"],
      price: "From $349",
      duration: "30-180 min",
      level: "Premium",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      doctors: 15,
      successRate: "97%",
      technology: ["Robotic Arms", "3D Printing", "Motion Analysis"],
      waitTime: "36h",
      popular: true
    },
    {
      icon: Eye,
      title: "Vision Precision",
      description: "Laser vision correction with advanced retinal treatments and AI monitoring",
      features: ["LASIK Surgery", "Retinal Treatments", "Cataract Surgery", "Vision Therapy"],
      price: "From $499",
      duration: "20-60 min",
      level: "Elite",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      doctors: 10,
      successRate: "99%",
      technology: ["Laser Technology", "OCT Scanning", "AI Monitoring"],
      waitTime: "12h",
      popular: false
    },
    {
      icon: Baby,
      title: "Pediatric Excellence",
      description: "Specialized care for children with child-friendly technology and monitoring",
      features: ["Child Specialists", "Growth Monitoring", "Vaccination Plans", "24/7 Pediatric Care"],
      price: "From $279",
      duration: "30-60 min",
      level: "Premium",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      doctors: 18,
      successRate: "99%",
      technology: ["Child Monitoring", "Growth Analytics", "Remote Consultations"],
      waitTime: "18h",
      popular: true
    },
    {
      icon: Microscope,
      title: "Precision Diagnostics",
      description: "Advanced diagnostic imaging and laboratory services with AI analysis",
      features: ["MRI & CT Scans", "Blood Analysis", "Genetic Testing", "AI-Powered Reports"],
      price: "From $199",
      duration: "15-120 min",
      level: "Standard",
      color: "from-gray-500 to-slate-600",
      bgColor: "bg-gray-50",
      doctors: 25,
      successRate: "99.5%",
      technology: ["AI Analysis", "3D Imaging", "Digital Pathology"],
      waitTime: "6h",
      popular: false
    }
  ];

  const advancedFeatures = [
    {
      icon: Smartphone,
      title: "Digital Health Platform",
      description: "Seamless mobile experience with real-time health monitoring",
      features: ["Mobile App", "Health Tracking", "Medication Reminders", "Symptom Checker"]
    },
    {
      icon: Cloud,
      title: "Cloud Medical Records",
      description: "Secure, accessible health records available anytime, anywhere",
      features: ["Encrypted Storage", "Instant Access", "Cross-Platform Sync", "Backup & Recovery"]
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access to international medical experts and second opinions",
      features: ["International Experts", "Second Opinions", "Global Standards", "Multi-language Support"]
    },
    {
      icon: Target,
      title: "Precision Medicine",
      description: "Personalized treatment plans based on genetic and health data",
      features: ["Genetic Analysis", "Personalized Plans", "Data-Driven Insights", "Progress Tracking"]
    }
  ];

  const stats = [
    { value: "10,000+", label: "Successful Procedures", icon: Award, change: "+15%" },
    { value: "99.2%", label: "Patient Satisfaction", icon: Star, change: "+2%" },
    { value: "24/7", label: "Premium Support", icon: Shield, change: "100%" },
    { value: "< 30min", label: "Average Response", icon: Clock, change: "-40%" }
  ];

  const specialists = [
    {
      name: "Dr. Sarah Chen",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.9,
      reviews: 284,
      price: "$299",
      image: "/api/placeholder/200/200",
      available: true,
      nextAvailable: "2 hours",
      badges: ["Top Rated", "AI Specialist"],
      languages: ["English", "Mandarin"]
    },
    {
      name: "Dr. Michael Rodriguez",
      specialty: "Neurologist",
      experience: "12 years",
      rating: 4.8,
      reviews: 196,
      price: "$399",
      image: "/api/placeholder/200/200",
      available: true,
      nextAvailable: "1 hour",
      badges: ["Research Lead"],
      languages: ["English", "Spanish"]
    },
    {
      name: "Dr. Emily Watson",
      specialty: "Orthopedic Surgeon",
      experience: "18 years",
      rating: 4.9,
      reviews: 312,
      price: "$349",
      image: "/api/placeholder/200/200",
      available: false,
      nextAvailable: "Tomorrow",
      badges: ["Robotics Expert"],
      languages: ["English", "French"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-50"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="bg-blue-600 text-white p-3 rounded-2xl shadow-2xl hover:bg-blue-700 transition-all duration-300"
        >
          <ArrowUpRight className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-600 text-white p-3 rounded-2xl shadow-2xl hover:bg-green-700 transition-all duration-300"
        >
          <MessageCircle className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 transform -skew-y-3 origin-top-left"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              x: [0, -20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/15 rounded-full blur-3xl"
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-3 mb-8 shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Premium Healthcare Experience</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Advanced Medical
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Services & Care
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Experience the future of healthcare with our cutting-edge technology, 
              world-class specialists, and personalized treatment plans.
            </p>

            {/* Enhanced Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                    <div className="text-green-600 text-sm font-semibold flex items-center justify-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-xl flex items-center gap-3"
              >
                <Calendar className="w-5 h-5" />
                Book Premium Consultation
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-3"
              >
                <Play className="w-5 h-5" />
                Watch Platform Tour
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Advanced <span className="text-blue-600">Technology</span> Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by cutting-edge technology to deliver exceptional healthcare experiences
            </p>
          </motion.div>

          {/* Feature Tabs */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {advancedFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFeatureTab(index)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      activeFeatureTab === index
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl"
                        : "bg-white text-gray-700 shadow-lg hover:shadow-xl border border-gray-200"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {feature.title}
                  </motion.button>
                );
              })}
            </div>

            {/* Feature Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeatureTab}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                        {React.createElement(advancedFeatures[activeFeatureTab].icon, { className: "w-8 h-8 text-white" })}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{advancedFeatures[activeFeatureTab].title}</h3>
                        <p className="text-gray-600 mt-2">{advancedFeatures[activeFeatureTab].description}</p>
                      </div>
                    </div>

                    <div className="grid gap-4 mb-8">
                      {advancedFeatures[activeFeatureTab].features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
                      Learn More About This Technology
                    </button>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                      <div className="text-center">
                        <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Secure & Compliant</h4>
                        <p className="text-gray-600 mb-4">All technologies are HIPAA compliant and enterprise-grade secure</p>
                        <div className="flex justify-center gap-4 text-sm">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">HIPAA</span>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Encrypted</span>
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Secure</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section ref={sectionRef} className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Premium <span className="text-blue-600">Medical</span> Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services backed by advanced technology and expert specialists
            </p>
          </motion.div>

          {/* Services Navigation */}
          <div className="flex overflow-x-auto gap-4 mb-12 pb-4 scrollbar-hide">
            {premiumServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveService(index)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeService === index
                      ? `bg-gradient-to-r ${service.color} text-white shadow-2xl`
                      : "bg-white text-gray-700 shadow-lg hover:shadow-xl border border-gray-200"
                  } ${service.popular ? 'ring-2 ring-yellow-400' : ''}`}
                >
                  <IconComponent className="w-5 h-5" />
                  {service.title}
                  {service.popular && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full ml-2">
                      Popular
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Service Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className={`rounded-3xl p-8 shadow-2xl ${premiumServices[activeService].bgColor} border border-gray-200`}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${premiumServices[activeService].color} rounded-2xl flex items-center justify-center`}>
                        {React.createElement(premiumServices[activeService].icon, { className: "w-8 h-8 text-white" })}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{premiumServices[activeService].title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            premiumServices[activeService].level === "Elite" 
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {premiumServices[activeService].level}
                          </span>
                          <span className="text-lg font-bold text-gray-900">{premiumServices[activeService].price}</span>
                        </div>
                      </div>
                    </div>
                    {premiumServices[activeService].popular && (
                      <span className="bg-yellow-400 text-yellow-900 text-sm px-3 py-1 rounded-full">
                        🔥 Most Popular
                      </span>
                    )}
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed">{premiumServices[activeService].description}</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {premiumServices[activeService].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {premiumServices[activeService].technology.map((tech, index) => (
                      <span key={index} className="bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => handleBookAppointment(specialists[0])}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Book Premium Consultation
                    </button>
                    <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300">
                      View Treatment Options
                    </button>
                  </div>
                </div>

                {/* Service Stats Panel */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <h4 className="font-bold text-gray-900 text-lg mb-4">Service Overview</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Available Specialists</span>
                        <span className="font-bold text-gray-900 flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          {premiumServices[activeService].doctors} doctors
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Session Duration</span>
                        <span className="font-bold text-gray-900">{premiumServices[activeService].duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Success Rate</span>
                        <span className="font-bold text-green-600 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          {premiumServices[activeService].successRate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Average Wait Time</span>
                        <span className="font-bold text-blue-600">{premiumServices[activeService].waitTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white border border-gray-300 rounded-2xl p-4 text-center hover:border-blue-500 transition-colors group">
                      <Video className="w-6 h-6 text-gray-600 group-hover:text-blue-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700">Video Consult</span>
                    </button>
                    <button className="bg-white border border-gray-300 rounded-2xl p-4 text-center hover:border-green-500 transition-colors group">
                      <Phone className="w-6 h-6 text-gray-600 group-hover:text-green-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700">Call Specialist</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Enhanced Specialists Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Our <span className="text-cyan-400">Elite</span> Medical Team
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Board-certified specialists with advanced training and cutting-edge expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialists.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <div className="text-center">
                  {/* Doctor Avatar */}
                  <div className="relative mx-auto mb-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto overflow-hidden">
                      <div className="w-full h-full bg-blue-400 flex items-center justify-center text-white font-bold text-xl">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    {doctor.available && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                  <p className="text-cyan-400 mb-3">{doctor.specialty}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-blue-200">({doctor.reviews})</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {doctor.badges.map((badge, badgeIndex) => (
                      <span key={badgeIndex} className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full text-xs">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Experience</span>
                      <span className="font-semibold">{doctor.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Consultation</span>
                      <span className="font-semibold text-cyan-400">{doctor.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Languages</span>
                      <span className="font-semibold">{doctor.languages.join(', ')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    disabled={!doctor.available}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      doctor.available
                        ? "bg-cyan-500 hover:bg-cyan-600 transform hover:scale-105"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {doctor.available ? "Book Consultation" : `Available ${doctor.nextAvailable}`}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Booking Modal */}
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
                <h3 className="text-2xl font-bold text-gray-900">Book Premium Consultation</h3>
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
                  Confirm Premium Booking - {selectedDoctor.price}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}