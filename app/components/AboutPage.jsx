"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
  Heart, 
  Star, 
  Award, 
  Users, 
  Globe, 
  Target, 
  Zap, 
  Shield, 
  TrendingUp,
  Play,
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Clock,
  CheckCircle,
  ArrowRight,
  Eye,
  Brain,
  Bone,
  Baby,
  Microscope,
  Stethoscope
} from 'lucide-react';

export default function AdvancedAboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeTeam, setActiveTeam] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [counter, setCounter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Advanced mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      setParallaxOffset({ x, y });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Advanced statistics with counting animation
  const stats = [
    { value: 50000, label: "Happy Patients", suffix: "+", icon: Users },
    { value: 98.7, label: "Success Rate", suffix: "%", icon: Award },
    { value: 500, label: "Expert Doctors", suffix: "+", icon: Stethoscope },
    { value: 24, label: "Hours Support", suffix: "/7", icon: Clock }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced timeline data
  const timeline = [
    {
      year: "2024",
      title: "AI-Powered Healthcare Platform",
      description: "Launched revolutionary AI diagnostics and telemedicine platform",
      achievements: ["AI Diagnostics", "Global Network", "Mobile App"],
      icon: Zap,
      color: "from-purple-500 to-pink-600"
    },
    {
      year: "2023",
      title: "International Expansion",
      description: "Expanded to 15+ countries with multi-language support",
      achievements: ["15 Countries", "Multi-language", "Global Standards"],
      icon: Globe,
      color: "from-blue-500 to-cyan-600"
    },
    {
      year: "2022",
      title: "Medical Excellence Awards",
      description: "Recognized as the leading healthcare innovation company",
      achievements: ["5 Awards", "Top Ratings", "Industry Leader"],
      icon: Award,
      color: "from-amber-500 to-orange-600"
    },
    {
      year: "2021",
      title: "Platform Launch",
      description: "Revolutionized healthcare access with digital platform",
      achievements: ["App Launch", "100K Users", "95% Satisfaction"],
      icon: Rocket,
      color: "from-green-500 to-emerald-600"
    }
  ];

  // Advanced team members with 3D effects
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      expertise: "Cardiology & AI Diagnostics",
      image: "/api/placeholder/400/400",
      experience: "15+ years",
      education: "Harvard Medical School",
      achievements: ["AI Research", "Medical Innovation", "Patient Care"],
      social: { linkedin: "#", twitter: "#", email: "#" }
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Head of Neurology",
      expertise: "Neurological Research",
      image: "/api/placeholder/400/400",
      experience: "12+ years",
      education: "Johns Hopkins University",
      achievements: ["Brain Mapping", "Research Papers", "Clinical Trials"],
      social: { linkedin: "#", twitter: "#", email: "#" }
    },
    {
      name: "Dr. Emily Watson",
      role: "Surgical Director",
      expertise: "Robotic Surgery",
      image: "/api/placeholder/400/400",
      experience: "18+ years",
      education: "Mayo Medical School",
      achievements: ["Robotics Pioneer", "Minimal Invasive", "Training"],
      social: { linkedin: "#", twitter: "#", email: "#" }
    }
  ];

  // Enhanced values with interactive cards
  const values = [
    {
      icon: Heart,
      title: "Patient First",
      description: "Every decision centers around patient wellbeing and outcomes",
      color: "from-red-500 to-pink-600",
      features: ["Personalized Care", "24/7 Support", "Continuous Monitoring"]
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Highest standards of data protection and medical ethics",
      color: "from-blue-500 to-cyan-600",
      features: ["HIPAA Compliant", "Encrypted Data", "Privacy First"]
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Pioneering new technologies to advance healthcare",
      color: "from-purple-500 to-indigo-600",
      features: ["AI Diagnostics", "Remote Monitoring", "Tech Integration"]
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working together for better patient outcomes",
      color: "from-green-500 to-emerald-600",
      features: ["Team Approach", "Global Network", "Knowledge Sharing"]
    }
  ];

  // Advanced animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden relative"
    >
      {/* Advanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/10 rounded-full blur-3xl"
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            x: parallaxOffset.x * 0.5,
            y: parallaxOffset.y * 0.5,
          }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10"
        />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            {/* Animated Badge */}
            <motion.div
              animate={floatingAnimation}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl px-6 py-3 mb-8 shadow-2xl"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Leading Healthcare Innovation Since 2021</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-6"
            >
              Redefining
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Healthcare
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              We're transforming medical care through cutting-edge technology, 
              compassionate service, and innovative solutions that put patients first.
            </motion.p>

            {/* Interactive CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-2xl flex items-center gap-3"
              >
                <Play className="w-5 h-5" />
                Watch Our Story
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Team
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={floatingAnimation}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </section>

      {/* Animated Statistics Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <motion.div
                    animate={{ 
                      rotateY: counter === index ? 360 : 0,
                      scale: counter === index ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2"
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision with Interactive Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
              >
                Our <span className="text-blue-600">Mission</span> & Vision
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                To make world-class healthcare accessible to everyone through technology, 
                innovation, and compassionate care that transforms lives.
              </motion.p>

              {/* Interactive Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                {[
                  "AI-Powered Diagnostics",
                  "Global Specialist Network", 
                  "24/7 Telemedicine",
                  "Personalized Treatment Plans"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-semibold text-gray-900">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Interactive Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <Target className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-blue-100 leading-relaxed">
                  To create a future where distance, cost, and access are no longer barriers 
                  to receiving exceptional medical care, powered by technology and human compassion.
                </p>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 mt-6 text-blue-200"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span className="font-semibold">Building the future of healthcare</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-16"
          >
            Our <span className="text-blue-600">Journey</span>
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center mb-16`}
                >
                  {/* Year Card */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                    className="flex-shrink-0"
                  >
                    <div className={`w-32 h-32 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl`}>
                      {item.year}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="flex-1 bg-white rounded-3xl p-8 shadow-2xl border border-gray-200"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.achievements.map((achievement, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16"
          >
            Meet Our <span className="text-cyan-400">Experts</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <div className="text-center">
                  {/* Animated Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    className="relative mx-auto mb-4"
                  >
                    <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto overflow-hidden">
                      <div className="w-full h-full bg-blue-400 flex items-center justify-center text-white font-bold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"
                    />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-cyan-400 mb-3">{member.role}</p>
                  <p className="text-blue-200 text-sm mb-4">{member.expertise}</p>

                  {/* Achievements */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.achievements.map((achievement, i) => (
                      <span key={i} className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full text-xs">
                        {achievement}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm text-blue-200">
                    <div className="flex justify-between">
                      <span>Experience</span>
                      <span className="font-semibold">{member.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Education</span>
                      <span className="font-semibold text-cyan-400">{member.education}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-16"
          >
            Our <span className="text-blue-600">Values</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-300 h-full">
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{value.description}</p>
                    
                    <div className="space-y-2">
                      {value.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            {/* Animated Background Elements */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"
            />
            <motion.div
              animate={{
                rotate: -360,
                scale: [1.2, 1, 1.2],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"
            />

            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold mb-6"
              >
                Ready to Transform Healthcare?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-blue-100 mb-8"
              >
                Join thousands of healthcare providers and patients experiencing the future of medicine.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl flex items-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  Get Started Today
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Sales
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Add missing Rocket icon
const Rocket = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);