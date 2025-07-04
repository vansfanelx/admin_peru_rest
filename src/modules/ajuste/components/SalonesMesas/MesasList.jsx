import React from 'react';

// Componente base para el listado de mesas (próximamente)
export default function MesasList({ mesas, onEdit, onDelete, styles, loading }) {
  if (!mesas || mesas.length === 0) {
    return <div className={styles.mesasEmpty}>No hay mesas registradas.</div>;
  }
  return (
    <ul className={styles.mesaList}>
      {mesas.map((mesa) => (
        <li key={mesa.id_mesa} className={styles.mesaItem}>
          <span>{mesa.descripcion || mesa.nombre} (Capacidad: {mesa.capacidad})</span>
          <div>
            <button className={styles.btnEditar} onClick={() => onEdit(mesa)} disabled={loading}>Editar</button>
            <button className={styles.btnEliminar} onClick={() => onDelete(mesa.id_mesa)} disabled={loading}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
