
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/api';
import logoHeader from '/public/images/icon-logo-header.svg';
import menuIcon from '/public/images/menu.svg';
import sunatLogo from '/public/images/logo-sunat.png';
import bellIcon from '/public/images/bell.svg';
import logoutIcon from '/public/images/logout.svg';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}




const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      // Manejo de error opcional
    }
    // Limpiar token y datos de usuario
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <header>
      <div className="header-left">
        <div className="header-logo" style={{ background: 'transparent', borderRadius: 0, boxShadow: 'none', padding: 0 }}>
          <img src={logoHeader} alt="Logo" style={{ width: 36, height: 36, borderRadius: 0, background: 'transparent', display: 'block', margin: '0 auto' }} />
        </div>
        <button
          className="header-menu"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Abrir menú"
          style={{ background: 'none', border: 'none', padding: 0, marginRight: 16 }}
        >
          <img src={menuIcon} alt="Menú" style={{ width: 24, height: 24 }} />
        </button>
      </div>
      <div style={{ flex: 1 }} />
      <div className="header-right">
        <button className="header-btn" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <img src={sunatLogo} alt="Sunat" style={{ width: 20, height: 20 }} />
          Sunat
          <i className="fas fa-check" style={{ marginLeft: 4 }}></i>
        </button>
        <span className="header-icon bell" style={{ marginLeft: 18 }}>
          <img src={bellIcon} alt="Notificaciones" style={{ width: 24, height: 24 }} />
        </span>
        <span className="header-icon logout" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <img src={logoutIcon} alt="Cerrar sesión" style={{ width: 24, height: 24 }} />
        </span>
      </div>
    </header>
  );
};

export default Header;
