// layout.jsx — simple রাখ
import Sidebar from "./components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#fff]">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;