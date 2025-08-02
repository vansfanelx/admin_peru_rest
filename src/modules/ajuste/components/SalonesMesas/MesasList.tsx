import React from 'react';

// Componente para el listado de mesas
interface Mesa {
  id_mesa: number;
  nro_mesa?: string;
  descripcion?: string;
  capacidad?: number;
  imagen?: string;
  estado?: string;
}

interface Salon {
  id_salon: number;
  descripcion?: string;
  mesas?: Mesa[];
}

interface MesasListProps {
  mesas: Mesa[];
  onEdit: (mesa: Mesa) => void;
  onDelete: (mesa: Mesa) => void;
  styles: any;
  loading: boolean;
  loadingMesas: boolean;
  salonSeleccionado?: Salon;
  getMesaEstadoTexto: (estado?: string) => string;
  getMesaEstadoColor: (estado?: string) => { bg: string; color: string };
}

export default function MesasList({ 
  mesas, 
  onEdit, 
  onDelete, 
  styles, 
  loading, 
  loadingMesas,
  salonSeleccionado,
  getMesaEstadoTexto,
  getMesaEstadoColor 
}: MesasListProps) {
  // Debug logging
  console.log('🍽️ MesasList recibió:', { 
    mesas, 
    salonSeleccionado, 
    loading, 
    loadingMesas 
  });

  if (loadingMesas || loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <span>Cargando mesas...</span>
      </div>
    );
  }

  if (!mesas || mesas.length === 0) {
    console.log('⚠️ No hay mesas para mostrar');
    return (
      <div className={styles.emptyState}>
        No hay mesas registradas en este salón
      </div>
    );
  }

  console.log(`✅ Mostrando ${mesas.length} mesas`);
  
  return (
    <div className={styles.tableContainer}>
      <table className={styles.modernTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>Salón</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa: Mesa, index: number) => {
            // Colores por estado de mesa
            const ESTADO_COLORES = {
              libre:        { bg: '#d1fae5', color: '#065f46' },
              reservada:    { bg: '#fef3c7', color: '#92400e' },
              ocupada:      { bg: '#fee2e2', color: '#991b1b' },
              limpieza:     { bg: '#e0e7ff', color: '#3730a3' },
              mantenimiento:{ bg: '#f3e8ff', color: '#7c3aed' },
              bloqueada:    { bg: '#f1f5f9', color: '#334155' },
            };
            const estadoTexto = getMesaEstadoTexto ? getMesaEstadoTexto(mesa.estado) : (mesa.estado ? mesa.estado.charAt(0).toUpperCase() + mesa.estado.slice(1) : 'Libre');
            const estadoColor = getMesaEstadoColor
              ? getMesaEstadoColor(mesa.estado)
              : (ESTADO_COLORES[mesa.estado as keyof typeof ESTADO_COLORES] || { bg: '#d4edda', color: '#155724' });

            return (
              <tr key={mesa.id_mesa}>
                <td className={styles.numberCell}>{index + 1}</td>
                <td className={styles.nameCell}>
                  {typeof mesa.nro_mesa !== 'undefined' && mesa.nro_mesa !== null && mesa.nro_mesa !== ''
                    ? mesa.nro_mesa
                    : (mesa.descripcion || `Mesa ${index + 1}`)}
                </td>
                <td className={styles.numberCell}>
                  <span style={{
                    background: '#e0f2fe',
                    color: '#0369a1',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {mesa.capacidad || 2} pers.
                  </span>
                </td>
                <td className={styles.nameCell}>
                  {salonSeleccionado?.descripcion || 'Sin nombre'}
                </td>
                <td>
                  <span className={styles.statusBadge} style={{
                    background: estadoColor.bg,
                    color: estadoColor.color
                  }}>
                    {estadoTexto}
                  </span>
                </td>
                <td className={styles.actionsCell}>
                  <button 
                    className={styles.actionBtn}
                    style={{ background: '#28a745' }}
                    onClick={() => onEdit(mesa)}
                    disabled={loading}
                    title="Editar mesa"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                  <button 
                    className={styles.actionBtn}
                    style={{ background: '#dc3545' }}
                    onClick={() => onDelete(mesa)}
                    disabled={loading}
                    title="Eliminar mesa"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Paginación como en el ejemplo */}
      <div className={styles.pagination}>
        <span>Mostrando 1 a {mesas.length} de {mesas.length} elementos</span>
        <div className={styles.paginationControls}>
          <button className={styles.paginationBtn} disabled>1</button>
        </div>
      </div>
    </div>
  );
}