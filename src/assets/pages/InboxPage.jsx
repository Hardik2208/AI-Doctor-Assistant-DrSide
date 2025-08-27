import { useState } from "react";
import { AlertTriangle, User, Calendar } from "lucide-react";

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("Reports");

  const reports = [
    {
      id: 1,
      title: "Blood Test Results",
      patient: "John Mitchell",
      patientId: "P-001",
      description:
        "Elevated cholesterol levels detected. Immediate consultation recommended.",
      urgent: true,
      date: "Jan 15, 04:00 PM",
    },
    {
      id: 2,
      title: "X-Ray Report",
      patient: "Emma Watson",
      patientId: "P-002",
      description: "Minor fracture observed in left arm.",
      urgent: false,
      date: "Jan 16, 10:30 AM",
    },
    {
      id: 3,
      title: "MRI Scan",
      patient: "David Clark",
      patientId: "P-003",
      description: "Signs of mild disc bulge detected. Further review advised.",
      urgent: true,
      date: "Jan 17, 02:15 PM",
    },
    {
      id: 4,
      title: "ECG Results",
      patient: "Sophia Lee",
      patientId: "P-004",
      description:
        "Irregular heartbeat pattern noticed. Cardiology referral recommended.",
      urgent: true,
      date: "Jan 18, 09:00 AM",
    },
    {
      id: 5,
      title: "Lab Results",
      patient: "Michael Brown",
      patientId: "P-005",
      description: "All parameters within normal range.",
      urgent: false,
      date: "Jan 19, 11:45 AM",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Inbox</h1>
          <p className="text-gray-500">Patient reports and notifications</p>
        </div>
      </div>

      {/* Tabs Box */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8">
        <div className="flex space-x-2">
          {["Reports", "Notifications", "Messages"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center px-6 py-2 font-medium rounded-lg transition-all
                ${
                  activeTab === tab
                    ? "bg-blue-500 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab} {tab === "Reports" && "(5)"}{" "}
              {tab === "Notifications" && "(2)"} {tab === "Messages" && "(5)"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "Reports" && (
        <div className="space-y-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 transition hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                {/* Left side */}
                <div>
                  <div className="flex items-center gap-2">
                    {report.urgent && (
                      <AlertTriangle size={18} className="text-red-500" />
                    )}
                    <h2 className="text-lg font-semibold text-gray-800">
                      {report.title}
                    </h2>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1 gap-2">
                    <User size={14} />
                    <span>{report.patient}</span>
                    <span>• ID: {report.patientId}</span>
                  </div>
                  <p className="text-gray-600 mt-3">{report.description}</p>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-5">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow-sm">
                      View Report
                    </button>
                    <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                      Mark as Reviewed
                    </button>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end gap-2">
                  {report.urgent && (
                    <span className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full">
                      Urgent
                    </span>
                  )}
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {report.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 text-gray-600">
          📢 You have 2 new notifications.
        </div>
      )}

      {activeTab === "Messages" && (
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 text-gray-600">
          ✉️ You have 5 unread messages.
        </div>
      )}
    </div>
  );
}
