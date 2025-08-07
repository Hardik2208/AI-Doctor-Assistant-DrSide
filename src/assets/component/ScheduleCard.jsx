import React from 'react';

const ScheduleCard = ({ time, title, subtitle, status, statusColor }) => (
  <div className="flex items-center bg-gray-50 p-4 rounded-xl shadow-inner">
    <div className="w-1/4 md:w-auto">
      <p className="text-lg font-semibold">{time}</p>
    </div>
    <div className="flex-1 mx-4">
      <p className="font-bold">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>{status}</span>
  </div>
);

export default ScheduleCard;
