import React from 'react';

const ActivityItem = ({ title, subtitle, time, status, statusColor }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-gray-300 rounded-full"></div>
    <div className="flex-1">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
      <div className="flex items-center space-x-2 mt-1">
        <p className="text-xs text-gray-400">{time}</p>
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}>{status}</span>
      </div>
    </div>
  </div>
);

export default ActivityItem;
