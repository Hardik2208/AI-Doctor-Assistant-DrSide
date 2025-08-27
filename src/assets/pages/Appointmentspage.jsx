import { CalendarDays, Clock, User, MapPin } from "lucide-react";

export default function Appointments() {
  const appointments = [
    {
      patient: "Rohit Sharma",
      time: "10:00 AM - 10:30 AM",
      type: "General Checkup",
      location: "Room 203, MedDoc Clinic",
    },
    {
      patient: "Ananya Verma",
      time: "11:00 AM - 11:30 AM",
      type: "Dental Consultation",
      location: "Room 105, MedDoc Clinic",
    },
    {
      patient: "Amit Patel",
      time: "12:00 PM - 12:45 PM",
      type: "Cardiology Review",
      location: "Room 310, MedDoc Clinic",
    },
  ];

  return (
    <div className="p-8 bg-gray-50/70 backdrop-blur-xl min-h-screen rounded-l-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Appointments
        </h1>
        <p className="text-gray-500 text-sm">Today's scheduled patients</p>
      </div>

      {/* Appointment List */}
      <div className="space-y-6">
        {appointments.map((appt, idx) => (
          <div
            key={idx}
            className="bg-white/80 backdrop-blur-lg border border-gray-100/70 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl p-6"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <User className="w-5 h-5 text-blue-500" />
                  {appt.patient}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock className="w-4 h-4 text-amber-500" />
                  {appt.time}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <CalendarDays className="w-4 h-4 text-green-500" />
                  {appt.type}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 text-red-500" />
                  {appt.location}
                </div>
              </div>

              {/* Status Button */}
              <button className="px-4 py-2 text-sm rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-md transition">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
    