// "use client";

// import Sidebar from "./components/Sidebar";
// import { useSession } from "@/lib/auth-client";

// export default function DashboardLayout({ children }) {
//   const { data: session, isPending } = useSession();

//   if (isPending) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex min-h-screen bg-[#fff]">
//       <Sidebar role={session?.user?.role} />
//       <div className="flex-1 overflow-y-auto">
//         {children}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  // Sudhu browser-e component mount holeo true hobe
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hydration mismatch atkate component mount ebong dynamic loading ekshathe block rakha hobe
  if (!isMounted || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff] text-gray-400 font-medium">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-[#fff] overflow-hidden">
      
      {/* Sidebar Wrapper: Layer control z-50 dropdown/drawer functionality */}
      <div className="z-50">
        <Sidebar role={session?.user?.role} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <main className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}