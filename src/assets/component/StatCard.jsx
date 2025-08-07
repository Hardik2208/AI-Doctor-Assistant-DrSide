import React from 'react';

const StatCard = ({ title, value, change, changeColor, icon: Icon, iconBgColor }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow flex items-center space-x-4">
      <div className={`p-3 rounded-full ${iconBgColor}`}>
        {Icon && <Icon className="w-6 h-6 text-gray-700" />}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className={`text-xs mt-1 font-medium ${changeColor}`}>{change}</p>
      </div>
    </div>
  );
};

export default StatCard;
