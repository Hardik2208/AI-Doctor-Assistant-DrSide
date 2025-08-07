import React, { useState } from 'react';
import {
  Bell,
  Search,
  LayoutDashboard,
  Inbox,
  Calendar,
  ClipboardList,
  HeartPulse,
  Cog,
  File,
  Users,
  ThumbsUp,
  MoreHorizontal,
  FileText,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

import NavLink from '../component/NavLink.jsx';
import StatCard from '../component/StatCard.jsx';
import ScheduleCard from '../component/ScheduleCard.jsx';
import ActivityItem from '../component/ActivityItem.jsx';

// New component for the Inbox items
const ReportItem = ({ icon, title, patient, description, status, statusColor }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white rounded-full border">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="font-semibold text-gray-900">{title}</p>
              <p className="text-sm text-gray-500">{patient}</p>
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusColor}`}>
              {status}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <div className="mt-4 flex space-x-3">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
              View Report
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200">
              Mark as Reviewed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// New component for the Inbox page
const InboxPage = () => {
  const [activeTab, setActiveTab] = useState('reports');

  const reports = [
    {
      id: 1,
      icon: <AlertCircle size={20} className="text-red-500" />,
      title: "Blood Test Results",
      patient: "John Mitchell - ID: P-001",
      description: "Elevated cholesterol levels detected. Immediate consultation recommended.",
      status: "urgent",
      statusColor: "bg-red-100 text-red-600"
    },
    {
      id: 2,
      icon: <FileText size={20} className="text-yellow-500" />,
      title: "X-Ray Report",
      patient: "Sarah Johnson - ID: P-002",
      description: "Chest x-ray shows normal lung fields. No abnormalities detected.",
      status: "normal",
      statusColor: "bg-yellow-100 text-yellow-600"
    },
    {
      id: 3,
      icon: <AlertCircle size={20} className="text-red-500" />,
      title: "MRI Scan",
      patient: "Michael Brown - ID: P-003",
      description: "Brain MRI reveals minor inflammation. Follow-up required.",
      status: "urgent",
      statusColor: "bg-red-100 text-red-600"
    },
    {
      id: 4,
      icon: <FileText size={20} className="text-yellow-500" />,
      title: "ECG Results",
      patient: "Emily Davis - ID: P-004",
      description: "Normal heart rhythm. No arrhythmias detected.",
      status: "normal",
      statusColor: "bg-yellow-100 text-yellow-600"
    },
    {
      id: 5,
      icon: <FileText size={20} className="text-green-500" />,
      title: "Lab Results",
      patient: "Robert Wilson - ID: P-005",
      description: "Routine blood work shows all values within normal range.",
      status: "normal",
      statusColor: "bg-green-100 text-green-600"
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Inbox</h2>
        <p className="text-gray-500 mt-2">Patient reports and notifications</p>
      </div>
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-2 px-4 font-semibold ${
            activeTab === 'reports' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Reports (5)
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-2 px-4 font-semibold ${
            activeTab === 'notifications' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Notifications (2)
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-2 px-4 font-semibold ${
            activeTab === 'messages' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Messages (5)
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'reports' && reports.map(report => (
          <ReportItem
            key={report.id}
            icon={report.icon}
            title={report.title}
            patient={report.patient}
            description={report.description}
            status={report.status}
            statusColor={report.statusColor}
          />
        ))}
        {/* You would add content for Notifications and Messages here */}
      </div>
    </div>
  );
};


// Main dashboard content, extracted to a separate component
const DashboardContent = () => {
  return (
    <>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-500 mt-2">Welcome back, Dr. Smith. Here's your overview for today.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Patients"
            value="324"
            change="+12 this week"
            changeColor="text-green-500"
            icon={Users}
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="Today's Appointments"
            value="18"
            change="3 completed"
            changeColor="text-gray-500"
            icon={Calendar}
            iconBgColor="bg-red-100"
          />
          <StatCard
            title="Pending Reports"
            value="7"
            change="2 urgent"
            changeColor="text-red-500"
            icon={File}
            iconBgColor="bg-green-100"
          />
          <StatCard
            title="Patient Satisfaction"
            value="96%"
            change="+2% this month"
            changeColor="text-green-500"
            icon={ThumbsUp}
            iconBgColor="bg-yellow-100"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Today's Schedule</h3>
            <div className="space-y-4">
              <ScheduleCard
                time="9:00 AM"
                title="Morning Rounds"
                subtitle="Ward A & B"
                status="In Progress"
                statusColor="bg-blue-100 text-blue-600"
              />
              <ScheduleCard
                time="11:30 AM"
                title="Patient Consultation"
                subtitle="John Mitchell - Room 305"
                status="Upcoming"
                statusColor="bg-indigo-100 text-indigo-600"
              />
              <ScheduleCard
                time="2:00 PM"
                title="Surgery Review"
                subtitle="Post-op consultation"
                status="Scheduled"
                statusColor="bg-gray-100 text-gray-600"
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <MoreHorizontal size={24} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="space-y-4">
              <ActivityItem
                title="New lab results received"
                subtitle="John Mitchell"
                time="10 minutes ago"
                status="urgent"
                statusColor="bg-red-100 text-red-600"
              />
              <ActivityItem
                title="Appointment completed"
                subtitle="Sarah Johnson"
                time="1 hour ago"
                status="normal"
                statusColor="bg-blue-100 text-blue-600"
              />
              <ActivityItem
                title="Prescription updated"
                subtitle="Michael Brown"
                time="2 hours ago"
                status="normal"
                statusColor="bg-blue-100 text-blue-600"
              />
              <ActivityItem
                title="Follow-up scheduled"
                subtitle="Emily Davis"
                time="3 hours ago"
                status="low"
                statusColor="bg-gray-100 text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


// Main App Component, now managing the view state
const Dashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const navLinks = [
    { icon: LayoutDashboard, text: "Dashboard", view: 'dashboard' },
    { icon: Inbox, text: "Inbox", view: 'inbox', count: 2 },
    { icon: Users, text: "Patients", view: 'patients' },
    { icon: Calendar, text: "Appointments", view: 'appointments' },
    { icon: ClipboardList, text: "Reports", view: 'reports' },
    { icon: HeartPulse, text: "Vitals Monitor", view: 'vitals' },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans antialiased text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 flex flex-col justify-between shadow-lg rounded-r-3xl transition-all duration-300">
        <div>
          <div className="flex items-center mb-10">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">M</div>
            <div>
              <h1 className="text-xl font-bold">MedDoc Pro</h1>
              <p className="text-sm text-gray-500">Doctor Portal</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.view}
                icon={link.icon}
                text={link.text}
                count={link.count}
                active={activeView === link.view}
                onClick={() => setActiveView(link.view)}
              />
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t pt-4">
          <p className="text-xs text-gray-400 uppercase font-semibold mb-2">System</p>
          <NavLink icon={Cog} text="Settings" active={activeView === 'settings'} onClick={() => setActiveView('settings')} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 transition-all duration-300">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
          <div className="relative w-full md:w-auto flex-1 mr-0 md:mr-6 mb-4 md:mb-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients, reports, appointments..."
              className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Bell className="text-gray-600 hover:text-blue-500 cursor-pointer" size={24} />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></div>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src="https://placehold.co/40x40/055D75/FFFFFF?text=SS"
                alt="Dr. Sarah Smith"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-sm">Dr. Sarah Smith</p>
                <p className="text-xs text-gray-500">Cardiologist</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        {activeView === 'dashboard' ? <DashboardContent /> : <InboxPage />}
      </main>
    </div>
  );
};

export default Dashboard;