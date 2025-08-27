import React from "react";
import {
  Users,
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react";

export default function DashboardContent() {
  const stats = [
    {
      title: "Total Patients",
      value: "324",
      subtitle: "+12 this week",
      icon: Users,
      subtitleClass: "text-green-600",
    },
    {
      title: "Today's Appointments",
      value: "18",
      subtitle: "3 completed",
      icon: Calendar,
      subtitleClass: "text-gray-500",
    },
    {
      title: "Pending Reports",
      value: "7",
      subtitle: "2 urgent",
      icon: FileText,
      subtitleClass: "text-red-600",
    },
    {
      title: "Patient Satisfaction",
      value: "96%",
      subtitle: "+2% this month",
      icon: TrendingUp,
      subtitleClass: "text-green-600",
    },
  ];

  const schedule = [
    {
      title: "Morning Rounds",
      subtitle: "Ward A & B",
      time: "9:00 AM",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-700",
      highlight: "bg-blue-50",
    },
    {
      title: "Patient Consultation",
      subtitle: "John Mitchell - Room 305",
      time: "11:30 AM",
      status: "Upcoming",
      statusColor: "bg-blue-600 text-white",
      highlight: "bg-white",
    },
    {
      title: "Surgery Review",
      subtitle: "Post-op consultation",
      time: "2:00 PM",
      status: "Scheduled",
      statusColor: "bg-gray-200 text-gray-700",
      highlight: "bg-white",
    },
  ];

  const activities = [
    {
      title: "New lab results received",
      subtitle: "John Mitchell",
      time: "10 minutes ago",
      tag: "urgent",
      tagColor: "bg-red-500 text-white",
    },
    {
      title: "Appointment completed",
      subtitle: "Sarah Johnson",
      time: "1 hour ago",
      tag: "normal",
      tagColor: "bg-blue-500 text-white",
    },
    {
      title: "Prescription updated",
      subtitle: "Michael Brown",
      time: "2 hours ago",
      tag: "normal",
      tagColor: "bg-blue-500 text-white",
    },
    {
      title: "Follow-up scheduled",
      subtitle: "Emily Davis",
      time: "3 hours ago",
      tag: "low",
      tagColor: "bg-gray-400 text-white",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Welcome back, Dr. Smith. Here’s your overview for today.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-500">
                  {stat.title}
                </h2>
                <div className="bg-indigo-50 p-2 rounded-xl">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 mt-3">
                {stat.value}
              </p>
              <p className={`text-sm mt-1 ${stat.subtitleClass}`}>
                {stat.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Schedule + Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">
              Today's Schedule
            </h2>
          </div>
          <div className="space-y-4">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-4 rounded-xl ${item.highlight} hover:bg-gray-100 transition`}
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">{item.time}</span>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <Activity className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Activity
            </h2>
          </div>
          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white hover:bg-gray-50 shadow-sm transition cursor-pointer"
              >
                <h3 className="font-medium text-gray-800">{activity.title}</h3>
                <p className="text-sm text-gray-500">{activity.subtitle}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{activity.time}</span>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${activity.tagColor}`}
                  >
                    {activity.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-lg transition mt-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Performance</h2>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Appointments Completed</span>
            <span>85/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Reports Reviewed</span>
            <span>42/50</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "84%" }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Patient Follow-ups</span>
            <span>28/30</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "93%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
