import React from 'react';

const NavLink = ({ icon: Icon, text, active, count }) => (
  <a
    href="#"
    className={`flex items-center space-x-3 p-3 rounded-xl transition-colors duration-200 ${
      active
        ? 'bg-blue-500 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100 hover:text-blue-500'
    }`}
  >
    {Icon && <Icon size={20} />}
    <span className={`flex-1 font-medium ${active ? 'font-bold' : ''}`}>{text}</span>
    {count && (
      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{count}</span>
    )}
  </a>
);

export default NavLink;
