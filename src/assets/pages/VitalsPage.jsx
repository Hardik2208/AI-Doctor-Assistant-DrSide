import { HeartPulse, Thermometer, Droplet, Activity } from "lucide-react";

export default function Vitals() {
  const vitalsData = [
    {
      label: "Heart Rate",
      value: "78 bpm",
      icon: HeartPulse,
      color: "from-rose-400 to-red-500",
    },
    {
      label: "Temperature",
      value: "98.6 °F",
      icon: Thermometer,
      color: "from-amber-400 to-orange-500",
    },
    {
      label: "Blood Pressure",
      value: "120 / 80 mmHg",
      icon: Activity,
      color: "from-blue-400 to-indigo-500",
    },
    {
      label: "Oxygen Level",
      value: "97%",
      icon: Droplet,
      color: "from-emerald-400 to-green-500",
    },
  ];

  return (
    <div className="p-8 bg-gray-50/70 backdrop-blur-xl min-h-screen rounded-l-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Patient Vitals
        </h1>
        <p className="text-gray-500 text-sm">Real-time health monitoring</p>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vitalsData.map((vital, idx) => {
          const Icon = vital.icon;
          return (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/60 p-6 flex flex-col items-start"
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-tr ${vital.color} shadow-md mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {vital.label}
              </div>
              <div className="text-xl font-semibold text-gray-900 mt-1">
                {vital.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
