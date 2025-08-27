import { AlertTriangle, User, Calendar } from "lucide-react";

export default function Inbox() {
  const reports = [
    {
      id: 1,
      title: "Blood Test Results",
      patient: "John Mitchell",
      patientId: "P-001",
      description: "Elevated cholesterol levels detected. Immediate consultation recommended.",
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
      description: "Irregular heartbeat pattern noticed. Cardiology referral recommended.",
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
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inbox</h1>
          <p className="text-gray-500">Patient reports and notifications</p>
        </div>
      </div>
       {/* Tabs */}
      <div className="flex border-transparent mb-6">
        <button className="px-6 py-2 border-b-2 border-blue-600 text-blue-600 font-medium">
          Reports (5)
        </button>
        <button className="px-6 py-2 text-gray-600 hover:text-blue-600">
          Notifications (2)
        </button>
        <button className="px-6 py-2 text-gray-600 hover:text-blue-600">
          Messages (5)
        </button>
      </div>


      {/* Report List */}
      <div className="space-y-5">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white shadow-md rounded-lg border-transparent p-5"
          >
            <div className="flex justify-between items-start">
              {/* Left side */}
              <div>
                <div className="flex items-center gap-2 text-blue-600">
                  <AlertTriangle size={18} className="text-red-500" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {report.title}
                  </h2>
                </div>
                <div className="flex items-center text-gray-500 text-sm mt-1 gap-2">
                  <User size={14} />
                  <span>{report.patient}</span>
                  <span>• ID: {report.patientId}</span>
                </div>
                <p className="text-gray-600 mt-2">{report.description}</p>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    View Report
                  </button>
                  <button className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
                    Mark as Reviewed
                  </button>
                </div>
              </div>

              {/* Right side */}
              <div className="flex flex-col items-end gap-2">
                {report.urgent && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    urgent
                  </span>
                )}
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={14} className="mr-1" />
                  {report.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
