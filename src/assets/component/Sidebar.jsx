import {
  Stethoscope,
  LayoutDashboard,
  Inbox,
  Users,
  Calendar,
  FileText,
  Activity,
  Settings,
} from "lucide-react";

export default function Sidebar({ setActiveView, activeView }) {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "inbox", label: "Inbox", icon: Inbox },
    { key: "patients", label: "Patients", icon: Users },
    { key: "appointments", label: "Appointments", icon: Calendar },
    { key: "reports", label: "Reports", icon: FileText },
    { key: "vitals", label: "Vitals", icon: Activity },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-white/80 backdrop-blur-xl shadow-xl flex flex-col rounded-r-3xl border-r border-gray-200/60">
      {/* Branding */}
      <div className="p-6 flex items-center space-x-3 border-b border-gray-200/50">
        <div className="bg-gradient-to-tr from-blue-500 to-blue-600 p-2 rounded-xl shadow-md">
          <Stethoscope className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="font-semibold text-xl text-gray-900 tracking-tight">
            MedDoc Pro
          </div>
          <div className="text-xs text-gray-500">Doctor Portal</div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeView === item.key;
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer (optional) */}
      <div className="p-4 border-t border-gray-200/60 text-xs text-gray-500 text-center">
        © 2025 MedDoc Pro
      </div>
    </div>
  );
}
