import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200/60 px-6 py-3 shadow-sm">
      {/* Left: Menu + Search */}
      <div className="flex items-center space-x-4 flex-1">
        {/* Hamburger */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Search */}
        <div className="flex items-center bg-gray-100 hover:bg-gray-200 transition rounded-xl px-3 py-2 w-full max-w-md shadow-inner">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients, reports, appointments..."
            className="bg-transparent outline-none px-3 text-sm text-gray-700 flex-1 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center space-x-6 ml-6">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="h-6 w-6 text-gray-600" />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-medium rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-sm">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-xl px-2 py-1 transition">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            className="h-10 w-10 rounded-full shadow-sm"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">Hardik</p>
            <p className="text-xs text-gray-500">Neurologist</p>
          </div>
        </div>
      </div>
    </div>
  );
}