import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Adjust the path as needed
import {
  Bell,
  Shield,
  Palette,
  User,
  LogOut,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      // Redirect to the login page after successful logout
      navigate("/login");
    }
  };

  return (
    <div className="p-8 bg-gray-50/70 backdrop-blur-xl min-h-screen rounded-l-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Settings
        </h1>
        <p className="text-gray-500 text-sm">Manage your account & preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-100/70 shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" /> Profile
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between items-center">
              <span>Name</span>
              <span className="text-gray-500">Dr. Meenakshi Vyas</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Email</span>
              <span className="text-gray-500">meenakshi@meddocpro.com</span>
            </div>
            <button className="mt-3 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm shadow transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-100/70 shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" /> Notifications
          </h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex justify-between items-center">
              <span>Email Alerts</span>
              <input type="checkbox" className="toggle accent-blue-500 w-5 h-5" defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <span>Push Notifications</span>
              <input type="checkbox" className="toggle accent-blue-500 w-5 h-5" defaultChecked />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-100/70 shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" /> Privacy & Security
          </h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex justify-between items-center">
              <span>Two-Factor Authentication</span>
              <input type="checkbox" className="toggle accent-blue-500 w-5 h-5" />
            </div>
            <div className="flex justify-between items-center">
              <span>Save Login Sessions</span>
              <input type="checkbox" className="toggle accent-blue-500 w-5 h-5" defaultChecked />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-100/70 shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-500" /> Appearance
          </h2>
          <select className="w-full p-3 rounded-xl border border-gray-200 shadow-sm text-gray-700">
            <option>Light Mode</option>
            <option>Dark Mode</option>
            <option>System Default</option>
          </select>
        </div>

        {/* Logout */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-100/70 shadow-lg rounded-2xl p-6 text-center">
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium flex items-center justify-center gap-2 shadow transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}