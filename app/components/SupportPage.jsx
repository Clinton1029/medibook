"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Phone, 
  MessageCircle, 
  Video, 
  Mail, 
  Clock, 
  Shield, 
  Zap, 
  Heart, 
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  FileText,
  ChevronDown,
  X,
  Send,
  Star,
  CheckCircle,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Users,
  Globe,
  Smartphone,
  Headphones,
  LifeBuoy
} from 'lucide-react';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("help");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // FAQ Data
  const faqCategories = [
    {
      title: "Booking & Appointments",
      icon: Calendar,
      questions: [
        {
          question: "How do I book an appointment?",
          answer: "You can book appointments through our website, mobile app, or by calling our support line. Simply select your preferred doctor, choose a time slot, and confirm your booking."
        },
        {
          question: "Can I reschedule my appointment?",
          answer: "Yes, you can reschedule up to 24 hours before your appointment through your patient portal or by contacting our support team."
        },
        {
          question: "What's your cancellation policy?",
          answer: "Cancellations made 24 hours in advance receive a full refund. Late cancellations may incur a fee depending on the service."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: Smartphone,
      questions: [
        {
          question: "The video call isn't working",
          answer: "Check your internet connection, ensure your camera and microphone permissions are enabled, and try refreshing the page. If issues persist, contact technical support."
        },
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your inbox."
        },
        {
          question: "Is the app available on mobile?",
          answer: "Yes, our app is available on both iOS and Android devices through their respective app stores."
        }
      ]
    },
    {
      title: "Billing & Payments",
      icon: FileText,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and most insurance plans."
        },
        {
          question: "Can I get an invoice for my visit?",
          answer: "Yes, invoices are automatically generated and available in your patient portal under 'Billing History'."
        },
        {
          question: "Do you accept insurance?",
          answer: "We work with most major insurance providers. Contact our billing department to verify your coverage."
        }
      ]
    }
  ];

  const emergencyContacts = [
    {
      name: "Medical Emergency",
      number: "911",
      description: "Life-threatening emergencies",
      icon: AlertTriangle,
      color: "from-red-500 to-pink-600"
    },
    {
      name: "24/7 Medical Line",
      number: "1-800-HEALTH",
      description: "24/7 medical consultation",
      icon: Phone,
      color: "from-blue-500 to-cyan-600"
    },
    {
      name: "Mental Health Crisis",
      number: "988",
      description: "24/7 mental health support",
      icon: Heart,
      color: "from-purple-500 to-indigo-600"
    },
    {
      name: "Poison Control",
      number: "1-800-222-1222",
      description: "24/7 poison emergencies",
      icon: Shield,
      color: "from-green-500 to-emerald-600"
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "24/7 dedicated support line",
      contact: "1-800-HEALTH",
      availability: "24/7 Available",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant messaging with our team",
      contact: "Start Chat",
      availability: "24/7 Available",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Face-to-face support sessions",
      contact: "Schedule Call",
      availability: "Mon-Sun: 6AM-11PM",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Detailed assistance via email",
      contact: "support@healthcare.com",
      availability: "Response within 2 hours",
      color: "from-amber-500 to-orange-600"
    }
  ];

  const popularArticles = [
    "How to prepare for your first video consultation",
    "Understanding your medical bill",
    "Setting up two-factor authentication",
    "Downloading your medical records",
    "Troubleshooting common technical issues"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully! We'll get back to you within 2 hours.");
    }, 2000);
  };

  const sendChatMessage = () => {
    if (message.trim()) {
      setChatMessages(prev => [...prev, { text: message, sender: "user", time: new Date() }]);
      setMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Thanks for your message! Our support team will be with you shortly. In the meantime, is there anything specific we can help you with?", 
          sender: "bot", 
          time: new Date() 
        }]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              We're Here to
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Help & Support
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              24/7 support for all your healthcare needs. Get help with appointments, technical issues, or emergency assistance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: "help", label: "Help Center", icon: HelpCircle },
              { id: "contact", label: "Contact Support", icon: Headphones },
              { id: "emergency", label: "Emergency", icon: AlertTriangle }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-semibold transition-all duration-300 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* Help Center */}
            {activeTab === "help" && (
              <motion.div
                key="help"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-6xl mx-auto"
              >
                {/* Search Section */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 mb-12">
                  <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h2>
                    <p className="text-gray-600 mb-6">Search our knowledge base or browse common questions</p>
                    
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search for answers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {[
                    { icon: BookOpen, label: "Knowledge Base", count: "250+ articles" },
                    { icon: MessageSquare, label: "Community", count: "10K+ members" },
                    { icon: Video, label: "Video Guides", count: "50+ tutorials" },
                    { icon: Users, label: "Live Support", count: "24/7 available" }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center cursor-pointer hover:shadow-xl transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.label}</h3>
                        <p className="text-gray-600 text-sm">{item.count}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Popular Articles */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h3>
                  <div className="grid gap-4">
                    {popularArticles.map((article, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                      >
                        <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                        <span className="text-gray-700 group-hover:text-gray-900">{article}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 ml-auto transform -rotate-90" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-6">
                  {faqCategories.map((category, categoryIndex) => {
                    const IconComponent = category.icon;
                    return (
                      <motion.div
                        key={categoryIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 }}
                        className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                            <p className="text-gray-600">{category.questions.length} questions</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {category.questions.map((faq, faqIndex) => (
                            <motion.div
                              key={faqIndex}
                              className="border border-gray-200 rounded-2xl overflow-hidden"
                            >
                              <button
                                onClick={() => setActiveFaq(activeFaq === faqIndex ? -1 : faqIndex)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                              >
                                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                <ChevronDown
                                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                                    activeFaq === faqIndex ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              
                              <AnimatePresence>
                                {activeFaq === faqIndex && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-6 pb-6"
                                  >
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
                                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                                        <MessageCircle className="w-4 h-4" />
                                        Still need help?
                                      </button>
                                      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                                        <Star className="w-4 h-4" />
                                        Helpful
                                      </button>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Contact Support */}
            {activeTab === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Contact Methods */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
                    
                    <div className="space-y-6">
                      {contactMethods.map((method, index) => {
                        const IconComponent = method.icon;
                        return (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center`}>
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{method.title}</h3>
                                <p className="text-gray-600 mb-3">{method.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-blue-600">{method.contact}</span>
                                  <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {method.availability}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Support Stats */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white mt-8">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold">98%</div>
                          <div className="text-blue-200 text-sm">Satisfaction Rate</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">2min</div>
                          <div className="text-blue-200 text-sm">Avg. Response</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">24/7</div>
                          <div className="text-blue-200 text-sm">Availability</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">50K+</div>
                          <div className="text-blue-200 text-sm">Patients Helped</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            First Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="text"
                              required
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="John"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            required
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Subject
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>General Inquiry</option>
                          <option>Technical Support</option>
                          <option>Billing Question</option>
                          <option>Appointment Help</option>
                          <option>Feedback</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          rows={6}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          placeholder="Please describe your issue in detail..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Emergency */}
            {activeTab === "emergency" && (
              <motion.div
                key="emergency"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                {/* Emergency Alert */}
                <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-8 text-white text-center mb-12">
                  <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Medical Emergency?</h2>
                  <p className="text-red-100 text-xl mb-6">
                    If this is a life-threatening emergency, call 911 immediately.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-red-600 px-8 py-4 rounded-2xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-3">
                      <Phone className="w-5 h-5" />
                      Call 911 Now
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                      <MapPin className="w-5 h-5" />
                      Find Emergency Room
                    </button>
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {emergencyContacts.map((contact, index) => {
                    const IconComponent = contact.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 text-center cursor-pointer group"
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.name}</h3>
                        <p className="text-gray-600 mb-4">{contact.description}</p>
                        <div className="text-2xl font-bold text-blue-600 mb-4">{contact.number}</div>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Emergency Resources */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Emergency Resources</h3>
                  
                  <div className="grid gap-6">
                    {[
                      {
                        title: "Nearest Emergency Rooms",
                        description: "Find the closest emergency medical facilities",
                        action: "View Locations",
                        icon: MapPin
                      },
                      {
                        title: "Urgent Care Centers",
                        description: "Immediate care for non-life-threatening conditions",
                        action: "Find Centers",
                        icon: Clock
                      },
                      {
                        title: "Mental Health Crisis",
                        description: "24/7 support for mental health emergencies",
                        action: "Get Help",
                        icon: Heart
                      },
                      {
                        title: "Poison Control",
                        description: "Immediate assistance for poison emergencies",
                        action: "Contact Now",
                        icon: Shield
                      }
                    ].map((resource, index) => {
                      const IconComponent = resource.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ x: 10 }}
                          className="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                            <p className="text-gray-600 text-sm">{resource.description}</p>
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
                            {resource.action}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-4 lg:p-6"
            onClick={() => setShowChat(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 100 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md h-96 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Support Chat</div>
                      <div className="text-blue-200 text-sm flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Online now
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-white/80 hover:text-white transition-colors p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Start a conversation with our support team</p>
                  </div>
                ) : (
                  chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-sm rounded-2xl p-3 ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-900 rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={sendChatMessage}
                    disabled={!message.trim()}
                    className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}