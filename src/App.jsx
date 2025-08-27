  import { useState } from "react";
  import Sidebar from "./assets/component/Sidebar";
  import Topbar from "./assets/component/Topbar";

  // Pages
  import DashboardContent from "./assets/pages/DashboardContent";
  import InboxPage from "./assets/pages/InboxPage";
  import PatientsPage from "./assets/pages/PatientsPage";
  import AppointmentsPage from "./assets/pages/AppointmentsPage";
  import ReportsPage from "./assets/pages/ReportsPage";
  import VitalsPage from "./assets/pages/VitalsPage";
  import SettingsPage from "./assets/pages/SettingsPage";

  export default function App() {
    const [activeView, setActiveView] = useState("dashboard");

    const renderContent = () => {
      switch (activeView) {
        case "dashboard":
          return <DashboardContent />;
        case "inbox":
          return <InboxPage />;
        case "patients":
          return <PatientsPage />;
        case "appointments":
          return <AppointmentsPage />;
        case "reports":
          return <ReportsPage />;
        case "vitals":
          return <VitalsPage />;
        case "settings":
          return <SettingsPage />;
        default:
          return <DashboardContent />;
      }
    };

    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar setActiveView={setActiveView} />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <Topbar />
          <div className="flex-1 overflow-y-auto p-4">{renderContent()}</div>
        </div>
      </div>
    );
  }