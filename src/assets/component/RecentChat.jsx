import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MessageCircle, Clock, User } from "lucide-react";

export default function RecentChats() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  useEffect(() => {
    // Get doctor's info from localStorage or your auth system
    const doctorData = localStorage.getItem('currentDoctor');
    if (doctorData) {
      const doctor = JSON.parse(doctorData);
      setCurrentDoctor(doctor);
      fetchDoctorChats(doctor.id); // doctor's supabase UID
    } else {
      console.error('No doctor logged in');
      setLoading(false);
    }
  }, []);

const fetchDoctorChats = async (doctorId) => {
  try {
    // Fetch all chat rooms that include this doctor's ID
    const response = await axios.get(
      `https://ai-doctor-assistant-backend-ai-ml.onrender.com/api/chat/doctor-chats/${doctorId}`
    );
    setChats(response.data);
  } catch (error) {
    console.error('Error fetching chats:', error);
    setChats([]);
  } finally {
    setLoading(false);
  }
};

  const joinChat = (chat) => {
    if (!currentDoctor) return;
    
    // Navigate to the chat room
    navigate(`/chat/${chat.roomId}?user=${currentDoctor.email}`);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-[#f5f5f7]">
        <div className="text-center">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-[#1c1c1e]">Recent Chats</h2>
        <p className="text-[#6e6e73]">Manage your patient conversations</p>
      </div>

      {/* Chat List */}
      <div className="space-y-4">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat.roomId}
              className="bg-white shadow-md rounded-2xl p-6 border border-[#e5e5e5] hover:shadow-lg transition cursor-pointer"
              onClick={() => joinChat(chat)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1c1c1e]">
                      {chat.patientName || `Patient ${chat.patientId.slice(0, 8)}`}
                    </h3>
                    <p className="text-sm text-[#6e6e73]">{chat.lastMessage}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {chat.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                  
                  <button
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      joinChat(chat);
                    }}
                  >
                    Join Chat
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4 text-sm text-[#6e6e73]">
                <Clock className="w-4 h-4" />
                <span>{formatTime(chat.lastActivity)}</span>
                <span className="mx-2">•</span>
                <MessageCircle className="w-4 h-4" />
                <span>{chat.messageCount} messages</span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-md rounded-2xl p-8 border border-[#e5e5e5] text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1c1c1e] mb-2">
              No active chats
            </h3>
            <p className="text-[#6e6e73]">
              Patients will appear here when they start a conversation with you
            </p>
          </div>
        )}
      </div>
    </div>
  );
}