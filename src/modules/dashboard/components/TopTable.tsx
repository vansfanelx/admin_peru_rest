import React from 'react';

const TopTable = ({ title, items, moneda }: any) => (
  <div className="card h-100">
    <div className="card-body">
      <h4 className="card-title">{title}</h4>
      <div className="table-responsive">
        <table className="table stylish-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Ventas</th>
              <th>Importe</th>
              <th className="text-right">% Ventas</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? items.map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>{`${moneda} ${item.importe.toFixed(2)}`}</td>
                <td className="text-right">{item.porcentaje.toFixed(2)}%</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="text-center text-muted">Sin datos</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default TopTable;
