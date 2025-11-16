"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Calendar, 
  DollarSign, 
  Settings, 
  Bell, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  MoreHorizontal,
  Heart,
  Brain,
  Bone,
  Eye as EyeIcon,
  Baby,
  Stethoscope,
  Shield,
  Zap,
  Clock,
  UserPlus,
  Activity,
  PieChart,
  MapPin,
  MessageCircle,
  Video,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Star,
  CheckCircle,
  X,
  RefreshCw,
  Database,
  Cpu,
  Server,
  Network,
  AlertTriangle,
  Settings as SettingsIcon
} from 'lucide-react';

export default function AdvancedAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [realTimeData, setRealTimeData] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("today");

  // Real-time data simulation
  useEffect(() => {
    if (realTimeData) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        setNotifications(prev => [
          ...prev.slice(0, 4),
          {
            id: Date.now(),
            type: 'info',
            message: 'New patient registration',
            time: 'Just now',
            read: false
          }
        ]);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [realTimeData]);

  // Mock data
  const stats = {
    patients: { current: 12457, change: +12.5, trend: 'up' },
    appointments: { current: 342, change: +8.2, trend: 'up' },
    revenue: { current: 125430, change: +15.3, trend: 'up' },
    doctors: { current: 156, change: +3.2, trend: 'up' }
  };

  const recentActivities = [
    { id: 1, user: "Dr. Sarah Chen", action: "Completed surgery", time: "2 mins ago", type: "success" },
    { id: 2, user: "Patient John Doe", action: "Booked appointment", time: "5 mins ago", type: "info" },
    { id: 3, user: "System", action: "Database backup completed", time: "10 mins ago", type: "warning" },
    { id: 4, user: "Dr. Michael Rodriguez", action: "Uploaded patient report", time: "15 mins ago", type: "success" },
    { id: 5, user: "Patient Emily Wilson", action: "Cancelled appointment", time: "20 mins ago", type: "error" }
  ];

  const appointments = [
    { id: 1, patient: "John Smith", doctor: "Dr. Sarah Chen", time: "10:00 AM", type: "Consultation", status: "confirmed" },
    { id: 2, patient: "Maria Garcia", doctor: "Dr. Michael Rodriguez", time: "11:30 AM", type: "Surgery", status: "pending" },
    { id: 3, patient: "Robert Johnson", doctor: "Dr. Emily Watson", time: "2:00 PM", type: "Check-up", status: "confirmed" },
    { id: 4, patient: "Lisa Wang", doctor: "Dr. James Kim", time: "3:30 PM", type: "Consultation", status: "cancelled" }
  ];

  const departments = [
    { name: "Cardiology", patients: 2456, doctors: 24, revenue: 452300, icon: Heart, trend: +8.2 },
    { name: "Neurology", patients: 1876, doctors: 18, revenue: 387600, icon: Brain, trend: +12.1 },
    { name: "Orthopedics", patients: 3124, doctors: 32, revenue: 523400, icon: Bone, trend: +5.7 },
    { name: "Ophthalmology", patients: 1567, doctors: 15, revenue: 298700, icon: EyeIcon, trend: +9.8 },
    { name: "Pediatrics", patients: 2890, doctors: 22, revenue: 412300, icon: Baby, trend: +7.3 }
  ];

  const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
          trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}%
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value.toLocaleString()}</h3>
      <p className="text-gray-600 dark:text-gray-400">{title}</p>
    </motion.div>
  );

  const DepartmentCard = ({ department }) => {
    const IconComponent = department.icon;
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">{department.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            {department.trend}%
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">{department.patients}</div>
            <div className="text-xs text-gray-500">Patients</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">{department.doctors}</div>
            <div className="text-xs text-gray-500">Doctors</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">${(department.revenue / 1000).toFixed(0)}K</div>
            <div className="text-xs text-gray-500">Revenue</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Performance</span>
            <span className="text-green-600 font-semibold">Excellent</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${Math.min(department.trend * 10, 100)}%` }}
            ></div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-800 shadow-2xl z-50"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">MediAdmin</h1>
                <p className="text-sm text-gray-500">Healthcare Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "patients", label: "Patients", icon: Users },
                { id: "appointments", label: "Appointments", icon: Calendar },
                { id: "doctors", label: "Doctors", icon: Stethoscope },
                { id: "analytics", label: "Analytics", icon: Activity },
                { id: "reports", label: "Reports", icon: PieChart },
                { id: "settings", label: "Settings", icon: Settings }
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {item.label}
                    {item.id === "patients" && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">24</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* System Status */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">API</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs">Stable</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Storage</span>
                  <div className="flex items-center gap-1 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs">78%</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <div className="w-6 h-6 flex flex-col justify-center gap-1">
                    <div className="w-4 h-0.5 bg-gray-600 dark:bg-gray-400"></div>
                    <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-400"></div>
                    <div className="w-4 h-0.5 bg-gray-600 dark:bg-gray-400 ml-2"></div>
                  </div>
                </button>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search patients, doctors, reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 w-80 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-4">
                {/* Real-time Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Live Data</span>
                  <button
                    onClick={() => setRealTimeData(!realTimeData)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      realTimeData ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        realTimeData ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  {darkMode ? '🌙' : '☀️'}
                </button>

                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                  <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold">
                    AD
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-semibold text-gray-900 dark:text-white">Admin User</div>
                    <div className="text-sm text-gray-500">Super Administrator</div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                    <p className="text-gray-600 dark:text-gray-400">Real-time insights and analytics</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-2 text-gray-900 dark:text-white"
                    >
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white rounded-2xl px-4 py-2 hover:bg-blue-700 transition-colors">
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Patients"
                    value={stats.patients.current}
                    change={stats.patients.change}
                    trend={stats.patients.trend}
                    icon={Users}
                    color="from-blue-500 to-cyan-500"
                  />
                  <StatCard
                    title="Appointments"
                    value={stats.appointments.current}
                    change={stats.appointments.change}
                    trend={stats.appointments.trend}
                    icon={Calendar}
                    color="from-green-500 to-emerald-500"
                  />
                  <StatCard
                    title="Revenue"
                    value={stats.revenue.current}
                    change={stats.revenue.change}
                    trend={stats.revenue.trend}
                    icon={DollarSign}
                    color="from-purple-500 to-pink-500"
                  />
                  <StatCard
                    title="Active Doctors"
                    value={stats.doctors.current}
                    change={stats.doctors.change}
                    trend={stats.doctors.trend}
                    icon={Stethoscope}
                    color="from-amber-500 to-orange-500"
                  />
                </div>

                {/* Charts and Departments */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Performance Analytics</h3>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400">Interactive chart visualization</p>
                        <p className="text-sm text-gray-500">Real-time data streaming enabled</p>
                      </div>
                    </div>
                  </div>

                  {/* Department Performance */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Department Performance</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {departments.slice(0, 3).map((dept, index) => (
                        <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                              <dept.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{dept.name}</div>
                              <div className="text-sm text-gray-500">{dept.doctors} doctors</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900 dark:text-white">${(dept.revenue / 1000).toFixed(0)}K</div>
                            <div className="flex items-center gap-1 text-green-600 text-sm">
                              <TrendingUp className="w-4 h-4" />
                              {dept.trend}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity and Appointments */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl transition-colors">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'success' ? 'bg-green-500' :
                            activity.type === 'warning' ? 'bg-yellow-500' :
                            activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">{activity.user}</div>
                            <div className="text-sm text-gray-500">{activity.action}</div>
                          </div>
                          <div className="text-sm text-gray-400">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Appointments */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Appointments</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                        View Calendar
                      </button>
                    </div>
                    <div className="space-y-4">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl transition-colors">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{appointment.patient}</div>
                            <div className="text-sm text-gray-500">{appointment.doctor} • {appointment.type}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900 dark:text-white">{appointment.time}</div>
                            <div className={`text-sm ${
                              appointment.status === 'confirmed' ? 'text-green-600' :
                              appointment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {appointment.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Department Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Department Overview</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                      Manage Departments
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.map((dept, index) => (
                      <DepartmentCard key={index} department={dept} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "patients" && (
              <motion.div
                key="patients"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <Users className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Patients Management</h2>
                <p className="text-gray-600 dark:text-gray-400">Advanced patient management system coming soon</p>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <SettingsIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">System Settings</h2>
                <p className="text-gray-600 dark:text-gray-400">Advanced configuration panel coming soon</p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Quick Actions Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 flex flex-col gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <UserPlus className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <BarChart3 className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}