import { Search, Filter, Plus, Phone, Mail, Calendar } from "lucide-react";

export default function PatientsPage() {
  const patients = [
    {
      id: "P-004",
      name: "Emily Davis",
      status: "active",
      age: 40,
      gender: "Female",
      phone: "+1 (555) 456-7890",
      email: "emily.davis@email.com",
      lastVisit: "1/18/2024",
      condition: "Asthma",
    },
    {
      id: "P-005",
      name: "Daniel Wilson",
      status: "critical",
      age: 50,
      gender: "Male",
      phone: "+1 (555) 567-8901",
      email: "daniel.wilson@email.com",
      lastVisit: "1/17/2024",
      condition: "Heart Disease",
    },
    {
      id: "P-006",
      name: "Sophia Martinez",
      status: "active",
      age: 35,
      gender: "Female",
      phone: "+1 (555) 678-9012",
      email: "sophia.martinez@email.com",
      lastVisit: "1/14/2024",
      condition: "Arthritis",
    },
    {
      id: "P-007",
      name: "James Anderson",
      status: "active",
      age: 29,
      gender: "Male",
      phone: "+1 (555) 789-0123",
      email: "james.anderson@email.com",
      lastVisit: "1/16/2024",
      condition: "Back Pain",
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-[#f5f5f7]">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-[#1c1c1e]">Patients</h2>
          <p className="text-[#6e6e73]">Manage your patient records</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl shadow-md transition">
          <Plus size={18} />
          Add Patient
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4 w-full mb-6">
        {/* Search */}
        <div className="flex items-center bg-white border border-[#e5e5e5] rounded-xl px-3 py-2 flex-1 shadow-sm">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            className="w-full outline-none text-gray-700 bg-transparent"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center border border-[#e5e5e5] rounded-xl px-3 py-2 bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition">
          <Filter className="text-gray-500 mr-2" size={18} />
          <span className="text-gray-600">All Status</span>
        </div>
      </div>

      {/* Patients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white shadow-md rounded-2xl p-6 border border-[#e5e5e5] hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#1c1c1e]">
                  {patient.name}
                </h3>
                <p className="text-sm text-[#6e6e73]">{patient.id}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  patient.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {patient.status}
              </span>
            </div>

            {/* Info */}
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>
                  Age: <strong>{patient.age} years</strong>
                </span>
                <span>
                  Gender: <strong>{patient.gender}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <span>Last visit: {patient.lastVisit}</span>
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* Condition */}
            <div className="text-sm text-gray-700">
              <span className="text-gray-500">Current Condition</span>
              <p className="font-medium text-[#1c1c1e]">{patient.condition}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-5">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 transition shadow-sm">
                View Records
              </button>
              <button className="flex-1 border border-[#e5e5e5] py-2 rounded-xl hover:bg-gray-100 transition">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
