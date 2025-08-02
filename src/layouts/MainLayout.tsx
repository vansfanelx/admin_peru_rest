import React, { useState } from 'react';
import './MainLayout.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main'; // Nuevo componente

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-layout">
      <div className="main-header-topbar" />
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  <div className={`main-body${sidebarOpen ? ' sidebar-open' : ''}`}> 
        <Sidebar sidebarOpen={sidebarOpen} />
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
};

export default MainLayout;