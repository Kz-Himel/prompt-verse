import Sidebar from "./components/Sidebar"
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div>{children}</div>
        </div>
    )
}

export default DashboardLayout;