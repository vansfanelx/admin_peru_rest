import React, { useState } from 'react';

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

const menuItems: MenuItem[] = [
  { key: 'punto-venta', icon: '/images/icon-sidebar-file.svg', label: 'Punto de Venta' },
  {
    key: 'caja',
    icon: '/images/icon-sidebar-monitor.svg',
    label: 'Caja',
    arrow: true,
    subitems: [
      { key: 'apertura-cierre', label: 'Apertura y cierre' },
      { key: 'ingresos', label: 'Ingresos' },
      { key: 'egresos', label: 'Egresos' },
      { key: 'monitor-ventas', label: 'Monitor de ventas' },
    ],
  },
  { key: 'clientes', icon: '/images/icon-sidebar-user.svg', label: 'Clientes' },
  {
    key: 'compras',
    icon: '/images/icon-sidebar-cart.svg',
    label: 'Compras',
    arrow: true,
    subitems: [
      { key: 'proveedores', label: 'Proveedores' },
      { key: 'ordenes', label: 'Órdenes de compra' },
    ],
  },
  {
    key: 'creditos',
    icon: '/images/icon-sidebar-creditcard.svg',
    label: 'Creditos',
    arrow: true,
    subitems: [
      { key: 'clientes-creditos', label: 'Clientes con crédito' },
      { key: 'pagos', label: 'Pagos' },
    ],
  },
  {
    key: 'inventario',
    icon: '/images/icon-sidebar-box.svg',
    label: 'Inventario',
    arrow: true,
    subitems: [
      { key: 'stock', label: 'Stock' },
      { key: 'ajuste-stock', label: 'Ajuste de stock' },
      { key: 'productos', label: 'Productos' },
      { key: 'kardex', label: 'Kardex' },
    ],
  },
  { key: 'reservas', icon: '/images/icon-sidebar-file.svg', label: 'Reservas' },
  { key: 'carta-digital', icon: '/images/icon-sidebar-tablet.svg', label: 'Carta Digital' },
  { key: 'produccion', icon: '/images/icon-sidebar-cart.svg', label: 'Producción' },
  { key: 'contable', icon: '/images/icon-sidebar-archive.svg', label: 'Contable' },
  { key: 'informes', icon: '/images/icon-sidebar-list.svg', label: 'Informes' },
  { key: 'ajustes', icon: '/images/icon-sidebar-settings.svg', label: 'Ajustes' },
  { key: 'tablero', icon: '/images/icon-sidebar-activity.svg', label: 'Tablero' },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const [active, setActive] = useState('tablero');
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [submenuFixed, setSubmenuFixed] = useState<string | null>(null);

  const handleMenuClick = (key: string, hasSubitems: boolean) => {
    setActive(key);
    if (hasSubitems) {
      if (sidebarOpen) {
        setOpenSubmenu(openSubmenu === key ? null : key);
      }
    } else {
      setOpenSubmenu(null);
    }
  };

  return (
    <aside className={`main-sidebar${sidebarOpen ? ' open' : ''}`}>
      <div className="sidebar-profile-bg">
        <img
          className="sidebar-profile-avatar"
          src="/images/default-avatar.png"
          alt="Avatar"
          style={{ width: 36, height: 36 }}
        />
        {sidebarOpen && <div className="sidebar-profile-name">JONATHAN</div>}
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item, idx) => (
          <React.Fragment key={item.key}>
            <div
              className={`sidebar-menu-item${active === item.key ? ' sidebar-menu-active sidebar-menu-animate' : ''}${idx !== 0 ? ' sidebar-menu-item-bordered' : ''}`}
              onClick={e => {
                handleMenuClick(item.key, !!item.subitems);
                if (!sidebarOpen && item.subitems) {
                  setHoveredMenu(item.key);
                  setSubmenuFixed(item.key);
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  setSubmenuPosition({ x: rect.right, y: rect.top + rect.height / 2 });
                } else if (!sidebarOpen) {
                  setHoveredMenu(null);
                  setSubmenuFixed(null);
                  setSubmenuPosition(null);
                }
              }}
              onMouseEnter={e => {
                if (!sidebarOpen && item.subitems && !submenuFixed) {
                  setHoveredMenu(item.key);
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  setSubmenuPosition({ x: rect.right, y: e.clientY });
                }
              }}
              onMouseMove={e => {
                if (!sidebarOpen && item.subitems && hoveredMenu === item.key && !submenuFixed) {
                  setSubmenuPosition({ x: e.clientX, y: e.clientY });
                }
              }}
              onMouseLeave={() => {
                if (!sidebarOpen && item.subitems && !submenuFixed) {
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
                    }}
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
            {/* Submenu flotante en modo colapsado */}
            {!sidebarOpen && item.subitems && ((hoveredMenu === item.key && submenuPosition) || submenuFixed === item.key) && (
              <div
                className="sidebar-submenu sidebar-submenu-floating"
                style={{
                  position: 'fixed',
                  left: (submenuPosition?.x ?? 0) + 10,
                  top: (submenuPosition?.y ?? 0) - 20,
                  zIndex: 1000,
                  minWidth: 160,
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  borderRadius: 6,
                  padding: '8px 0',
                  pointerEvents: 'auto',
                }}
                onMouseEnter={() => {
                  setHoveredMenu(item.key);
                }}
                onMouseLeave={() => {
                  if (!submenuFixed) {
                    setHoveredMenu(null);
                    setSubmenuPosition(null);
                  }
                }}
              >
                {item.subitems.map(sub => (
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
