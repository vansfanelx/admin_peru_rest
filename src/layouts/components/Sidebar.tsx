import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
}

type MenuItem = {
  key: string;
  icon: string;
  label: string;
  arrow?: boolean;
  subitems?: { key: string; label: string }[];
};


import iconSidebarFile from '../../assets/icons/icon-sidebar-file.svg';
import iconSidebarMonitor from '../../assets/icons/icon-sidebar-monitor.svg';
import iconSidebarUser from '../../assets/icons/icon-sidebar-user.svg';
import iconSidebarCart from '../../assets/icons/icon-sidebar-cart.svg';
import iconSidebarCreditcard from '../../assets/icons/icon-sidebar-creditcard.svg';
import iconSidebarBox from '../../assets/icons/icon-sidebar-box.svg';
import iconSidebarTablet from '../../assets/icons/icon-sidebar-tablet.svg';
import iconSidebarArchive from '../../assets/icons/icon-sidebar-archive.svg';
import iconSidebarList from '../../assets/icons/icon-sidebar-list.svg';
import iconSidebarSettings from '../../assets/icons/icon-sidebar-settings.svg';
import iconSidebarActivity from '../../assets/icons/icon-sidebar-activity.svg';

const menuItems: MenuItem[] = [
  { key: 'punto-venta', icon: iconSidebarFile, label: 'Punto de Venta' },
  {
    key: 'caja',
    icon: iconSidebarMonitor,
    label: 'Caja',
    arrow: true,
    subitems: [
      { key: 'apertura-cierre', label: 'Apertura y cierre' },
      { key: 'ingresos', label: 'Ingresos' },
      { key: 'egresos', label: 'Egresos' },
      { key: 'monitor-ventas', label: 'Monitor de ventas' },
    ],
  },
  { key: 'clientes', icon: iconSidebarUser, label: 'Clientes' },
  {
    key: 'compras',
    icon: iconSidebarCart,
    label: 'Compras',
    arrow: true,
    subitems: [
      { key: 'proveedores', label: 'Proveedores' },
      { key: 'ordenes', label: 'Órdenes de compra' },
    ],
  },
  {
    key: 'creditos',
    icon: iconSidebarCreditcard,
    label: 'Creditos',
    arrow: true,
    subitems: [
      { key: 'clientes-creditos', label: 'Clientes con crédito' },
      { key: 'pagos', label: 'Pagos' },
    ],
  },
  {
    key: 'inventario',
    icon: iconSidebarBox,
    label: 'Inventario',
    arrow: true,
    subitems: [
      { key: 'stock', label: 'Stock' },
      { key: 'ajuste-stock', label: 'Ajuste de stock' },
      { key: 'productos', label: 'Productos' },
      { key: 'kardex', label: 'Kardex' },
    ],
  },
  { key: 'reservas', 
    icon: iconSidebarFile, 
    label: 'Reservas',
    arrow: true
  },
  { key: 'carta-digital', icon: iconSidebarTablet, label: 'Carta Digital' },
  { key: 'produccion', icon: iconSidebarCart, label: 'Producción' },
  { key: 'contable', icon: iconSidebarArchive, label: 'Contable' },
  { key: 'informes', icon: iconSidebarList, label: 'Informes' },
  {
    key: 'ajustes',
    icon: iconSidebarSettings,
    label: 'Ajustes',
    arrow: true,
    subitems: [
      { key: 'salones-mesas', label: 'Salones y Mesas' },
      // Puedes agregar más subitems aquí si lo deseas
    ],
  },
  { key: 'tablero', icon: iconSidebarActivity, label: 'Tablero' },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  // Determinar el activo según la ruta
  const currentPath = window.location.pathname;
  const initialActive = currentPath.startsWith('/ajuste') ? 'ajustes' : (currentPath === '/dashboard' || currentPath === '/' ? 'tablero' : '');
  const [active, setActive] = useState(initialActive);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [submenuFixed, setSubmenuFixed] = useState<string | null>(null);

  const handleMenuClick = (key: string, hasSubitems: boolean) => {
    setActive(key);
    // Navegación para Ajustes y Tablero
    if (key === 'ajustes') {
      navigate('/ajuste');
      return;
    }
    if (key === 'salones-mesas') {
      navigate('/ajuste/salones-mesas');
      return;
    }
    if (key === 'tablero') {
      navigate('/dashboard');
      return;
    }
    if (hasSubitems) {
      if (sidebarOpen) {
        setOpenSubmenu(openSubmenu === key ? null : key);
      }
    } else {
      setOpenSubmenu(null);
      if (key === 'reservas') {
        navigate('/reservas');
        return;
      }
    }
  };

  // Obtener el usuario logueado del localStorage (acepta 'user' o 'usuario')
  let userName = 'Usuario';
  try {
    let userStr = localStorage.getItem('user') || localStorage.getItem('usuario');
    if (userStr) {
      const user = JSON.parse(userStr);
      userName = user.username || user.name || 'Usuario';
    }
  } catch {}

  return (
    <aside className={`main-sidebar${sidebarOpen ? ' open' : ''}`}>
      <div className="sidebar-profile-bg">
        <img
          className="sidebar-profile-avatar"
          src="/images/default-avatar.png"
          alt="Avatar"
          style={{ width: 36, height: 36 }}
        />
        {sidebarOpen && <div className="sidebar-profile-name">{userName}</div>}
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item, idx) => (
          <React.Fragment key={item.key}>
            <div
              className={`sidebar-menu-item${active === item.key ? ' sidebar-menu-active sidebar-menu-animate' : ''}${idx !== 0 ? ' sidebar-menu-item-bordered' : ''}`}
              onClick={e => {
                handleMenuClick(item.key, !!item.subitems);
                if (!sidebarOpen) {
                  // Al hacer click, cerrar cualquier menú flotante
                  setHoveredMenu(null);
                  setSubmenuFixed(null);
                  setSubmenuPosition(null);
                }
              }}
              onMouseEnter={e => {
                if (!sidebarOpen && !submenuFixed) {
                  setHoveredMenu(item.key);
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  setSubmenuPosition({ x: rect.right, y: e.clientY });
                }
              }}
              onMouseMove={e => {
                if (!sidebarOpen && hoveredMenu === item.key && !submenuFixed) {
                  setSubmenuPosition({ x: e.clientX, y: e.clientY });
                }
              }}
              onMouseLeave={() => {
                if (!sidebarOpen && !submenuFixed) {
                  setHoveredMenu(null);
                  setSubmenuPosition(null);
                }
              }}
              style={{ transition: 'background 0.2s, border-right 0.2s', position: 'relative' }}
            >
              <img src={item.icon} className="sidebar-menu-icon" alt={item.label} />
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && item.arrow && (
                <img
                  src="/images/chevron-right.svg"
                  className="sidebar-menu-arrow"
                  alt="Chevron"
                  style={{
                    transform: openSubmenu === item.key ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              )}
            </div>
            {/* Submenu abierto en modo expandido */}
            {sidebarOpen && item.subitems && openSubmenu === item.key && (
              <div className="sidebar-submenu sidebar-submenu-elevated">
                {item.subitems.map(sub => (
                  <div
                    key={sub.key}
                    className={`sidebar-submenu-item${active === sub.key ? ' sidebar-submenu-item-active' : ''}`}
                    onClick={e => {
                      e.stopPropagation();
                      setActive(sub.key);
                      if (sub.key === 'salones-mesas') {
                        navigate('/ajuste/salones-mesas');
                      } else if (sub.key === 'listar-reservas') {
                        navigate('/reservas');
                      } else if (sub.key === 'registrar-reservas') {
                        navigate('/reservas?modal=nueva');
                      }
                    }}
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
            {/* Menú flotante SIEMPRE en modo colapsado, siempre muestra el nombre y subíndices si existen */}
            {!sidebarOpen && hoveredMenu === item.key && submenuPosition && (
              <div
                className="sidebar-submenu sidebar-submenu-floating"
                style={{
                  position: 'fixed',
                  left: (submenuPosition?.x ?? 0) + 10,
                  top: (submenuPosition?.y ?? 0) - 20,
                  zIndex: 1000,
                  minWidth: 180,
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  borderRadius: 6,
                  padding: item.subitems ? '0 0 8px 0' : '0',
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}
                onMouseEnter={() => {
                  setHoveredMenu(item.key);
                }}
                onMouseLeave={() => {
                  setHoveredMenu(null);
                  setSubmenuPosition(null);
                }}
              >
                {/* Nombre del módulo arriba del submenu o solo el nombre si no hay subíndices */}
                <div style={{
                  padding: item.subitems ? '10px 20px 6px 20px' : '16px 24px',
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#4e54c8',
                  borderBottom: item.subitems ? '1px solid #f0f0f0' : 'none',
                  background: '#f7f8fa',
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  marginBottom: item.subitems ? 4 : 0,
                  textAlign: 'center',
                  minWidth: 140
                }}>{item.label}</div>
                {item.subitems && item.subitems.map(sub => (
                  <div
                    key={sub.key}
                    className={`sidebar-submenu-item${active === sub.key ? ' sidebar-submenu-item-active' : ''}`}
                    style={{ padding: '8px 20px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                    onClick={e => {
                      e.stopPropagation();
                      setActive(sub.key);
                      setHoveredMenu(null);
                      setSubmenuPosition(null);
                      setSubmenuFixed(null);
                    }}
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
