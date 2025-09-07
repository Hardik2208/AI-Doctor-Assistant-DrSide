import { Link, useLocation } from "react-router-dom";
import {
  Stethoscope,
  LayoutDashboard,
  Inbox,
  Users,
  Calendar,
  FileText,
  Activity,
  Settings,
    MessageCircle, // Add this import
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { key: "inbox", label: "Inbox", icon: Inbox, path: "/inbox" },
    { key: "patients", label: "Patients", icon: Users, path: "/patients" },
        { key: "chats", label: "Recent Chats", icon: MessageCircle, path: "/chats" }, // Add this line
    {
      key: "appointments",
      label: "Appointments",
      icon: Calendar,
      path: "/appointments",
    },
    { key: "reports", label: "Reports", icon: FileText, path: "/reports" },
    { key: "vitals", label: "Vitals", icon: Activity, path: "/vitals" },
    { key: "settings", label: "Settings", icon: Settings, path: "/settings" },
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
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200
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
            </Link>
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