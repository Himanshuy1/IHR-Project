import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden font-sans text-textMain selection:bg-primary/30">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow relative overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Main Area */}
        <main className="flex-grow overflow-x-hidden overflow-y-auto bg-bg p-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
