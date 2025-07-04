import React, { useEffect, useState } from 'react';
import SummaryCard from './components/SummaryCard';
import ChannelList from './components/ChannelList';
import SimpleCard from './components/SimpleCard';
import TopTable from './components/TopTable';

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
    <div className="main-content">
      <div className="row mb-3">
        <div className="col-12 col-md-4">
          <div className="mb-2 font-weight-bold">Resumen general</div>
          <select className="form-control" value={idCaja} onChange={e => setIdCaja(e.target.value)}>
            {cajas.map(caja => (
              <option key={caja.id} value={caja.id}>{caja.nombre}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4 mb-3">
          <SummaryCard
            title="Ventas en efectivo"
            value={data ? `${data.moneda} ${data.pago_efe.toFixed(2)}` : '...'}
            percent={data ? `${data.pago_efe_porcentaje.toFixed(2)}%` : '0%'}
            color="success"
            progressColor="success"
            subtitle="No incluye apertura de caja"
          />
        </div>
        <div className="col-md-4 mb-3">
          <SummaryCard
            title="Ventas otros medio de pago"
            value={data ? `${data.moneda} ${data.pago_tar.toFixed(2)}` : '...'}
            percent={data ? `${data.pago_tar_porcentaje.toFixed(2)}%` : '0%'}
            color="primary"
            progressColor="primary"
            subtitle="Incluye tarjetas y otros medio de pago"
          />
        </div>
        <div className="col-md-4 mb-3">
          <SummaryCard
            title="Total de ventas"
            value={data ? `${data.moneda} ${data.total_ventas.toFixed(2)}` : '...'}
            percent="100%"
            color="info"
            progressColor="info"
            subtitle="Incluye descuentos, comisión delivery"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6 col-lg-5">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title">Por canal de venta</h4>
              <ul className="nav nav-tabs mb-3">
                <li className="nav-item"><span className="nav-link active">Aprobadas</span></li>
                <li className="nav-item"><span className="nav-link">Anuladas</span></li>
              </ul>
              {data && <ChannelList data={data.canales} moneda={data.moneda} />}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-7">
          <div className="row">
            <div className="col-md-6 mb-3">
              <SimpleCard
                title="Ingresos caja"
                value={data ? `${data.moneda} ${data.ingresos.toFixed(2)}` : '...'}
                bg="success"
              />
            </div>
            <div className="col-md-6 mb-3">
              <SimpleCard
                title="Egresos caja"
                value={data ? `${data.moneda} ${data.egresos.toFixed(2)}` : '...'}
                bg="danger"
              />
            </div>
            <div className="col-md-6 mb-3">
              <SimpleCard
                title="Descuentos"
                value={data ? `${data.moneda} ${data.descuentos.toFixed(2)}` : '...'}
                bg="warning"
              />
            </div>
            <div className="col-md-6 mb-3">
              <SimpleCard
                title="Comisión delivery"
                value={data ? `${data.moneda} ${data.comision_delivery.toFixed(2)}` : '...'}
                bg="primary"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-6 mb-3">
          <TopTable
            title="10 Productos mas vendidos"
            items={data ? data.productos : []}
            moneda={data ? data.moneda : ''}
          />
        </div>
        <div className="col-lg-6 mb-3">
          <TopTable
            title="10 Platos mas vendidos"
            items={data ? data.platos : []}
            moneda={data ? data.moneda : ''}
          />
        </div>
      </div>
      {loading && <div className="text-center mt-4">Cargando...</div>}
    </div>
  );
};

export default DashboardView;