import React from 'react';

// Componente para el listado de salones
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
  total_mesas?: number;
  estado?: string;
}

interface SalonesListProps {
  salones: Salon[];
  selectedSalonId: number | null;
  onSelect: (id: number) => void;
  onEdit: (salon: Salon) => void;
  onDelete: (salon: Salon) => void;
  loading: boolean;
  styles: any;
  getSalonEstadoTexto: (estado?: string) => string;
}

export default function SalonesList({ 
  salones, 
  selectedSalonId, 
  onSelect, 
  onEdit, 
  onDelete, 
  loading, 
  styles,
  getSalonEstadoTexto 
}: SalonesListProps) {
  console.log('🏪 SalonesList recibió:', { salones, loading, selectedSalonId });

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <span>Cargando salones...</span>
      </div>
    );
  }

  if (!salones) {
    console.log('⚠️ SalonesList: salones es null/undefined');
    return (
      <div className={styles.emptyState}>
        Error: No se pudieron cargar los salones
      </div>
    );
  }

  if (!Array.isArray(salones)) {
    console.log('⚠️ SalonesList: salones no es un array:', typeof salones, salones);
    return (
      <div className={styles.emptyState}>
        Error: Los datos de salones no tienen el formato correcto
      </div>
    );
  }

  if (salones.length === 0) {
    console.log('⚠️ SalonesList: array de salones está vacío');
    return (
      <div className={styles.emptyState}>
        No hay salones registrados
      </div>
    );
  }

  console.log(`✅ SalonesList: Mostrando ${salones.length} salones`);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.modernTable}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Mesas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {salones.map((salon: Salon) => {
            const nombre = salon.descripcion || 'Sin nombre';
            // Usar total_mesas si existe, si no, fallback a salon.mesas.length
            const cantidadMesas = typeof salon.total_mesas === 'number' ? salon.total_mesas : (salon.mesas ? salon.mesas.length : 0);
            const estadoTexto = getSalonEstadoTexto ? getSalonEstadoTexto(salon.estado) : 'ACTIVO';
            const estadoColor = salon.estado === 'a' ? styles.statusActive : styles.statusInactive;
            
            // Debug logging
            console.log(`🏪 Renderizando salón "${nombre}" con ${cantidadMesas} mesas:`, salon.mesas);
            
            return (
              <tr 
                key={salon.id_salon}
                className={selectedSalonId === salon.id_salon ? styles.selectedRow : ''}
                onClick={() => onSelect(salon.id_salon)}
              >
                <td className={styles.nameCell}>{nombre}</td>
                <td className={styles.numberCell}>{cantidadMesas}</td>
                <td>
                  <span className={`${styles.statusBadge} ${estadoColor}`}>
                    {estadoTexto}
                  </span>
                </td>
                <td className={styles.actionsCell}>
                  <button 
                    className={styles.actionBtn}
                    style={{ background: '#17a2b8' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(salon.id_salon);
                    }}
                    disabled={loading}
                    title="Ver mesas"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </button>
                  <button 
                    className={styles.actionBtn}
                    style={{ background: '#28a745' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(salon);
                    }}
                    disabled={loading}
                    title="Editar salón"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                  <button 
                    className={styles.actionBtn}
                    style={{ background: '#dc3545' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(salon);
                    }}
                    disabled={loading}
                    title="Eliminar salón"
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
        <span>Mostrando 1 a {salones.length} de {salones.length} elementos</span>
        <div className={styles.paginationControls}>
          <button className={styles.paginationBtn} disabled>1</button>
        </div>
      </div>
    </div>
  );
}