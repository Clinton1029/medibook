"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  CheckCircle,
  Star,
  Heart,
  Clock,
  Rocket,
  TrendingUp,
  Target,
  Crown,
  Gem,
  Award,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const premiumFeatures = [
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      description: "Military-grade encryption & HIPAA compliance",
      gradient: "from-blue-500 to-cyan-500",
      stat: "99.9% Uptime",
    },
    {
      icon: Zap,
      title: "AI Diagnostics",
      description: "Real-time health insights with machine learning",
      gradient: "from-purple-500 to-pink-500",
      stat: "94% Accuracy",
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Forecast patient outcomes & optimize workflows",
      gradient: "from-green-500 to-emerald-500",
      stat: "45% Efficiency",
    },
    {
      icon: Users,
      title: "Smart Collaboration",
      description: "Seamless team coordination across departments",
      gradient: "from-orange-500 to-red-500",
      stat: "3x Faster",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief of Cardiology, Mayo Clinic",
      content:
        "Revolutionized our workflow. Reduced admin work by 70% while improving outcomes.",
      rating: 5,
    },
    {
      name: "Healthcare System Inc.",
      role: "250+ Providers Network",
      content:
        "Scaled telemedicine to 15,000+ monthly consultations with zero downtime.",
      rating: 5,
    },
    {
      name: "Dr. Michael Torres",
      role: "Neurology Practice Director",
      content:
        "Predictive analytics helped reduce no-shows by 45% and satisfaction to 98%.",
      rating: 5,
    },
  ];

  const performanceMetrics = [
    { value: "98.7%", label: "Patient Satisfaction", trend: "+12%", icon: Heart },
    { value: "45%", label: "Faster Documentation", trend: "+8%", icon: Clock },
    { value: "12,458", label: "Active Providers", trend: "+24%", icon: Users },
    { value: "4.97/5", label: "Avg Rating", trend: "+0.2", icon: Star },
  ];

  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Main Section */}
      <div className="relative z-10 pt-32 pb-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-slate-800/50 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-blue-300 font-semibold text-sm tracking-wider">
              ENTERPRISE HEALTHCARE PLATFORM
            </span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold text-white mb-6 leading-tight">
            The Future of{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Medical Excellence
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Transform your practice with AI-powered insights, real-time analytics,
            and seamless patient engagement.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
              <Rocket className="w-5 h-5" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-slate-700 text-white px-8 py-4 rounded-2xl hover:bg-slate-800/50 transition-all flex items-center gap-3">
              <Play className="w-5 h-5" /> Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {performanceMetrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-400 transition-all"
              >
                <Icon className="w-6 h-6 text-blue-400 mb-2" />
                <div className="text-3xl font-bold text-white">{m.value}</div>
                <div className="text-slate-400 text-sm">{m.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Premium Features */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 mb-6">
              <Gem className="w-5 h-5 text-purple-400" />
              <span className="text-white font-semibold">ENTERPRISE FEATURES</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">
              Built for{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Healthcare Excellence
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Advanced tools designed for modern medical practices with enterprise-grade security.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-10 rounded-3xl`}
                  />
                  <div className="relative z-10">
                    <Icon className="w-10 h-10 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{f.description}</p>
                    <span className="text-sm text-blue-300 font-semibold">
                      {f.stat}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-32">
          <h2 className="text-center text-4xl font-bold text-white mb-10">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 backdrop-blur-xl hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">{t.content}</p>
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-slate-400 text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl flex items-center gap-3 hover:scale-105 transition-all cursor-pointer"
        >
          <Rocket className="w-5 h-5" />
          Get Started for Free
        </motion.div>
      </div>
    </section>
  );
}
