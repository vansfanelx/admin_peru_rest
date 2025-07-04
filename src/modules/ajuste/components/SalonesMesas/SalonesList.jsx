import React from 'react';

// Componente base para el listado de salones (próximamente)
export default function SalonesList({ salones, selectedSalonId, onSelect, onEdit, onDelete, loading, styles }) {
  return (
    <ul className={styles.salonList}>
      {salones.map((salon) => {
        const nombre = salon.descripcion || 'Sin nombre';
        const isActive = selectedSalonId === salon.id_salon;
        return (
          <li
            key={salon.id_salon}
            className={isActive ? `${styles.salonItem} ${styles.salonItemActive}` : styles.salonItem}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <span style={{ flex: 1, cursor: 'pointer' }} onClick={() => onSelect(salon.id_salon)}>{nombre}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className={styles.btnEditar} style={{ padding: '2px 8px', fontSize: 13 }} onClick={() => onEdit(salon)} disabled={loading}>Editar</button>
              <button className={styles.btnEliminar} style={{ padding: '2px 8px', fontSize: 13 }} onClick={() => onDelete(salon.id_salon)} disabled={loading}>Eliminar</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
