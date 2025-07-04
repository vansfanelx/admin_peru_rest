import React from 'react';
import './ReservasList.css';

const ReservasList = ({ reservas, onEdit, onDelete }) => {
  return (
    <div className="reservas-list">
      <h3>Lista de Reservas</h3>
      <table>
        <colgroup>
          <col style={{ width: '60px' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '160px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '120px' }} />
          <col style={{ width: '120px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th style={{ textAlign: 'left' }}>Cliente</th>
            <th colSpan={2} style={{ textAlign: 'center' }}>Fecha / Capacidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length === 0 ? (
            <tr>
              <td colSpan="6">No hay reservas</td>
            </tr>
          ) : (
            reservas.map(reserva => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td style={{ fontWeight: 500 }}>{reserva.cliente}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.capacidad || '-'}</td>
                <td>{reserva.estado}</td>
                <td>
                  <button onClick={() => onEdit(reserva)}>Editar</button>
                  <button onClick={() => onDelete(reserva.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservasList;
