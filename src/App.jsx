import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./assets/pages/supabaseClient";

// Pages
import Auth from "./assets/pages/Auth";
import DashboardContent from "./assets/pages/DashboardContent";
import InboxPage from "./assets/pages/InboxPage";
import PatientsPage from "./assets/pages/PatientsPage";
import AppointmentsPage from "./assets/pages/AppointmentsPage";
import ReportsPage from "./assets/pages/ReportsPage";
import VitalsPage from "./assets/pages/VitalsPage";
import SettingsPage from "./assets/pages/SettingsPage";
import ProfileFormPage from "./assets/pages/ProfileFormPage";

// Components
import Sidebar from "./assets/component/Sidebar";
import Topbar from "./assets/component/Topbar";

const MainAppLayout = () => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <Topbar />
      <div className="flex-1 overflow-y-auto p-4">
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/vitals" element={<VitalsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The previous check using getSession() is removed.
    // We now rely solely on the state change listener for explicit logins/logouts.
    // On app restart, the session state will be null by default.
    setLoading(false);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // This listener will only fire on explicit login or logout events.
        // It won't automatically re-establish the session on page load.
        if (event === "SIGNED_IN") {
          setSession(session);
        } else if (event === "SIGNED_OUT") {
          setSession(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {session ? (
          <>
            <Route path="/complete-profile" element={<ProfileFormPage />} />
            <Route path="/*" element={<MainAppLayout />} />
          </>
        ) : (
          <Route path="/*" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}