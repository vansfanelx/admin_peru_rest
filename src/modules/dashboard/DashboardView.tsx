import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryCard from './components/SummaryCard';
import ChannelList from './components/ChannelList';
import SimpleCard from './components/SimpleCard';
import TopTable from './components/TopTable';
import './DashboardView.css';

// Llamada real al API
const fetchDashboardData = async (idCaja: string) => {
  try {
    const res = await fetch(`/api/dashboard?idCaja=${idCaja}`);
    if (!res.ok) throw new Error('Error al obtener datos');
    return await res.json();
  } catch (e) {
    // Si hay error, retorna datos vacíos para evitar romper la UI
    return {
      moneda: 'S/',
      pago_efe: 0,
      pago_tar: 0,
      total_ventas: 0,
      pago_efe_porcentaje: 0,
      pago_tar_porcentaje: 0,
      ingresos: 0,
      egresos: 0,
      descuentos: 0,
      comision_delivery: 0,
      canales: {
        salon: { total_ventas: 0, cantidad_ventas: 0 },
        mostrador: { total_ventas: 0, cantidad_ventas: 0 },
        delivery: { total_ventas: 0, cantidad_ventas: 0 },
      },
      productos: [],
      platos: [],
    };
  }
};

const DashboardView: React.FC = () => {
  const [idCaja, setIdCaja] = useState('1');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDashboardData(idCaja).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [idCaja]);

  // Simula cajas
  const cajas = [
    { id: '1', nombre: 'CAJA PRINCIPAL' },
    { id: '2', nombre: 'CAJA SECUNDARIA' },
  ];

  return (
    <div className="dashboard-container">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/reservas" style={{
          background: '#3182ce',
          color: '#fff',
          padding: '8px 18px',
          borderRadius: 6,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 16
        }}>Ir a Reservas</Link>
      </nav>
      {/* Selector de caja */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>Resumen general</div>
        <select
          className="dashboard-caja-select"
          value={idCaja}
          onChange={e => setIdCaja(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e0e0e0', fontSize: 15 }}
        >
          {cajas.map(caja => (
            <option key={caja.id} value={caja.id}>{caja.nombre}</option>
          ))}
        </select>
      </div>

      {/* Top summary cards */}
      <div className="dashboard-top-cards">
        <div className="dashboard-card">
          <div className="dashboard-card-title">Ventas en efectivo</div>
          <div className="dashboard-card-value">{data ? `${data.moneda} ${data.pago_efe.toFixed(2)}` : '...'}</div>
          <div className="dashboard-card-sub">
            <span style={{ color: '#22c55e', fontWeight: 600 }}>{data ? `${data.pago_efe_porcentaje.toFixed(2)}%` : '0%'}</span> No incluye apertura de caja
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-title">Ventas otros medio de pago</div>
          <div className="dashboard-card-value">{data ? `${data.moneda} ${data.pago_tar.toFixed(2)}` : '...'}</div>
          <div className="dashboard-card-sub">
            <span style={{ color: '#4e54c8', fontWeight: 600 }}>{data ? `${data.pago_tar_porcentaje.toFixed(2)}%` : '0%'}</span> Incluye tarjetas y otros medio de pago
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-title">Total de ventas</div>
          <div className="dashboard-card-value">{data ? `${data.moneda} ${data.total_ventas.toFixed(2)}` : '...'}</div>
          <div className="dashboard-card-sub">
            <span style={{ color: '#8b5cf6', fontWeight: 600 }}>100%</span> Incluye descuentos, comisión delivery
          </div>
        </div>
      </div>

      {/* Cards de canal de venta y KPIs */}
      <div style={{ display: 'flex', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
        {/* Canal de venta */}
        <div style={{ flex: '1 1 340px', minWidth: 320, maxWidth: 420 }}>
          <div className="dashboard-card" style={{ height: '100%' }}>
            <div className="dashboard-card-title">Por canal de venta</div>
            <ul style={{ display: 'flex', gap: 16, margin: '12px 0 18px 0', padding: 0, listStyle: 'none' }}>
              <li><span style={{ color: '#4e54c8', fontWeight: 600, borderBottom: '2px solid #4e54c8', paddingBottom: 2 }}>Aprobadas</span></li>
              <li><span style={{ color: '#bbb', fontWeight: 500, marginLeft: 18 }}>Anuladas</span></li>
            </ul>
            {data && <ChannelList data={data.canales} moneda={data.moneda} />}
          </div>
        </div>
        {/* KPIs */}
        <div style={{ flex: '2 1 480px', minWidth: 320, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="dashboard-kpi-row">
            <div className="dashboard-kpi-card kpi-green">
              <span style={{ fontSize: 22, marginRight: 10 }}>💵</span>
              Ingresos caja <span style={{ marginLeft: 'auto', fontWeight: 700 }}>{data ? `${data.moneda} ${data.ingresos.toFixed(2)}` : '...'}</span>
            </div>
            <div className="dashboard-kpi-card kpi-red">
              <span style={{ fontSize: 22, marginRight: 10 }}>💸</span>
              Egresos caja <span style={{ marginLeft: 'auto', fontWeight: 700 }}>{data ? `${data.moneda} ${data.egresos.toFixed(2)}` : '...'}</span>
            </div>
          </div>
          <div className="dashboard-kpi-row">
            <div className="dashboard-kpi-card kpi-orange">
              <span style={{ fontSize: 22, marginRight: 10 }}>🏷️</span>
              Descuentos <span style={{ marginLeft: 'auto', fontWeight: 700 }}>{data ? `${data.moneda} ${data.descuentos.toFixed(2)}` : '...'}</span>
            </div>
            <div className="dashboard-kpi-card kpi-purple">
              <span style={{ fontSize: 22, marginRight: 10 }}>🚴‍♂️</span>
              Comisión delivery <span style={{ marginLeft: 'auto', fontWeight: 700 }}>{data ? `${data.moneda} ${data.comision_delivery.toFixed(2)}` : '...'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tablas de productos/platos más vendidos */}
      <div className="dashboard-tables-row" style={{ marginTop: 32 }}>
        <div className="dashboard-table-card">
          <div className="dashboard-table-title">10 Productos mas vendidos</div>
          <TopTable
            title=""
            items={data ? data.productos : []}
            moneda={data ? data.moneda : ''}
          />
        </div>
        <div className="dashboard-table-card">
          <div className="dashboard-table-title">10 Platos mas vendidos</div>
          <TopTable
            title=""
            items={data ? data.platos : []}
            moneda={data ? data.moneda : ''}
          />
        </div>
      </div>

      {loading && <div style={{ textAlign: 'center', marginTop: 32 }}>Cargando...</div>}
    </div>
  );
};

export default DashboardView;