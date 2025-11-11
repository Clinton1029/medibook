"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  ArrowRight, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  CheckCircle, 
  Star,
  Calendar,
  Video,
  FileText,
  TrendingUp
} from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security for all patient data"
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Live insights into practice performance"
    },
    {
      icon: BarChart3,
      title: "Advanced Reporting",
      description: "Comprehensive health analytics dashboard"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless coordination across healthcare teams"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Cardiologist, Mayo Clinic",
      content: "Reduced administrative time by 70% while improving patient satisfaction scores.",
      rating: 5
    },
    {
      name: "Healthcare System",
      role: "250+ Providers",
      content: "Scaled our telemedicine services to 15,000+ monthly consultations seamlessly.",
      rating: 5
    },
    {
      name: "Dr. Michael Torres",
      role: "Neurology Practice",
      content: "The analytics dashboard helped us identify and reduce no-show rates by 45%.",
      rating: 5
    }
  ];

  const metrics = [
    { value: "98%", label: "Patient Satisfaction" },
    { value: "45%", label: "Faster Documentation" },
    { value: "12k+", label: "Active Providers" },
    { value: "4.9/5", label: "Average Rating" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 mb-8"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-slate-300">Rated 4.9/5 by 2,000+ healthcare providers</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              The Future of
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Healthcare Management
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl"
            >
              Streamline your practice with AI-powered tools, real-time analytics, 
              and seamless patient engagement. Built for modern healthcare providers.
            </motion.p>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
            >
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{metric.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25">
                <span className="flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button 
                onClick={() => setIsPlaying(true)}
                className="group flex items-center justify-center gap-3 text-slate-300 hover:text-white font-medium py-4 px-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center group-hover:bg-slate-700/50 transition-colors">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                "AI-Powered Diagnostics",
                "Real-time Analytics",
                "Secure Messaging",
                "Automated Scheduling"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            {/* Main Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-2xl"
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white font-semibold">Live Dashboard</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Today's Appointments", value: "24", trend: "+12%" },
                  { label: "Patient Satisfaction", value: "96%", trend: "+5%" },
                  { label: "Revenue", value: "$12.4k", trend: "+18%" },
                  { label: "Active Patients", value: "1,247", trend: "+8%" }
                ].map((metric, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-2xl p-4">
                    <div className="text-slate-400 text-sm mb-1">{metric.label}</div>
                    <div className="flex items-end justify-between">
                      <div className="text-white font-bold text-xl">{metric.value}</div>
                      <div className="flex items-center gap-1 text-green-400 text-sm">
                        <TrendingUp className="w-3 h-3" />
                        {metric.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity Feed */}
              <div className="bg-slate-800/50 rounded-2xl p-4">
                <div className="text-white font-semibold mb-3">Recent Activity</div>
                <div className="space-y-3">
                  {[
                    { icon: Calendar, text: "New appointment with Sarah Johnson", time: "2 min ago" },
                    { icon: Video, text: "Telemedicine session completed", time: "1 hour ago" },
                    { icon: FileText, text: "Lab results uploaded", time: "2 hours ago" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm">{activity.text}</div>
                        <div className="text-slate-400 text-xs">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -top-4 -left-4 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-700 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">245</div>
                  <div className="text-slate-400 text-sm">Active Today</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute -bottom-4 -right-4 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-700 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">98%</div>
                  <div className="text-slate-400 text-sm">Uptime</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 lg:mt-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by Leading Healthcare Providers
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Join thousands of medical professionals who trust our platform to deliver exceptional patient care
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 lg:mt-32"
        >
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">What Our Clients Say</h2>
              <p className="text-slate-400">Join 2,000+ healthcare providers transforming their practice</p>
            </div>

            <div className="relative h-48">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="text-center max-w-2xl mx-auto">
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-xl text-white mb-6 leading-relaxed">
                      "{testimonials[currentSlide].content}"
                    </blockquote>
                    <div>
                      <div className="font-semibold text-white">{testimonials[currentSlide].name}</div>
                      <div className="text-slate-400 text-sm">{testimonials[currentSlide].role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-white font-semibold">Product Demo Video</p>
                  <p className="text-slate-400 text-sm mt-2">2:30 minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsPlaying(false)}
                className="mt-4 text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}