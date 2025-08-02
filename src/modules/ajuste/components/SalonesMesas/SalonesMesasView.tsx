import React, { useState } from 'react';
import UnauthorizedView from '../../../../views/UnauthorizedView';
import styles from './SalonesMesasView.module.css';
import { getSalones, createSalon, updateSalon, deleteSalon, createMesa, updateMesa, deleteMesa, getMesas, getSalonesConMesas } from '../../../../api/api';
import MesasList from './MesasList';
import SalonesList from './SalonesList';

function SalonesMesasView() {
  // Estados principales
  const [salones, setSalones] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unauthorized, setUnauthorized] = useState<boolean>(false);
  const [selectedSalonId, setSelectedSalonId] = useState<number | null>(null);
  
  // Estados de búsqueda
  const [search, setSearch] = useState<string>('');
  const [searchMesas, setSearchMesas] = useState<string>('');
  
  // Estados de modales
  const [showSalonModal, setShowSalonModal] = useState<boolean>(false);
  const [showMesaModal, setShowMesaModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  
  // Estados de edición
  const [salonEdit, setSalonEdit] = useState<any | null>(null);
  const [mesaEdit, setMesaEdit] = useState<any | null>(null);
  const [deleteItem, setDeleteItem] = useState<any | null>(null);
  
  // Estados de formularios - Salones
  const [salonNombre, setSalonNombre] = useState<string>('');
  const [salonEstado, setSalonEstado] = useState<string>('a'); // 'a' = activo, 'i' = inactivo
  
  // Estados de formularios - Mesas
  const [mesaNombre, setMesaNombre] = useState<string>('');
  const [mesaCapacidad, setMesaCapacidad] = useState<number>(4);
  const [mesaDescripcion, setMesaDescripcion] = useState<string>('');
  const [mesaImagen, setMesaImagen] = useState<string>('');
  const [mesaImagenFile, setMesaImagenFile] = useState<File | null>(null);
  // Estados de mesa: libre, reservada, ocupada, limpieza, mantenimiento, bloqueada
  const [mesaEstado, setMesaEstado] = useState<string>('libre');

  // ============ CARGA DE DATOS ============
  const fetchSalonesYMesas = async () => {
    setLoading(true);
    setError(null);
    try {
      const salonesConMesas = await getSalonesConMesas();
      console.log('🔎 [DEBUG] Respuesta cruda de getSalonesConMesas:', salonesConMesas);
      setSalones(salonesConMesas || []);
      if (salonesConMesas && salonesConMesas.length > 0 && !selectedSalonId) {
        setSelectedSalonId(salonesConMesas[0].id_salon);
      }
    } catch (err) {
      setError('No se pudo cargar la información de salones y mesas.');
      console.error('🔎 [DEBUG] Error en fetchSalonesYMesas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  React.useEffect(() => {
    fetchSalonesYMesas();
  }, []);

  // ============ FUNCIONES AUXILIARES PARA ESTADOS ============
  const getSalonEstadoTexto = (estado?: string) => {
    switch (estado) {
      case 'a': return 'ACTIVO';
      case 'i': return 'INACTIVO';
      default: return 'DESCONOCIDO';
    }
  };

  const getMesaEstadoTexto = (estado?: string) => {
    switch (estado) {
      case 'libre': return 'LIBRE';
      case 'reservada': return 'RESERVADA';
      case 'ocupada': return 'OCUPADA';
      case 'limpieza': return 'LIMPIEZA';
      case 'mantenimiento': return 'MANTENIMIENTO';
      case 'bloqueada': return 'BLOQUEADA';
      default: return 'DESCONOCIDO';
    }
  };

  const getMesaEstadoColor = (estado?: string) => {
    switch (estado) {
      case 'libre': return { bg: '#d1fae5', color: '#065f46' }; // Verde
      case 'reservada': return { bg: '#fef3c7', color: '#92400e' }; // Amarillo
      case 'ocupada': return { bg: '#fee2e2', color: '#991b1b' }; // Rojo
      case 'limpieza': return { bg: '#e0e7ff', color: '#3730a3' }; // Azul claro
      case 'mantenimiento': return { bg: '#f3e8ff', color: '#7c3aed' }; // Morado
      case 'bloqueada': return { bg: '#f1f5f9', color: '#334155' }; // Gris
      default: return { bg: '#e2e3e5', color: '#383d41' }; // Gris - Desconocido
    }
  };

  // ============ FILTROS Y DATOS PROCESADOS ============
  const filteredSalones = salones.filter(salon => {
    const nombre = salon.descripcion || '';
    return nombre.toLowerCase().includes(search.toLowerCase());
  });

  const selectedSalon = salones.find(s => s.id_salon === selectedSalonId) || null;
  
  const filteredMesas = React.useMemo(() => {
    if (!selectedSalon || !Array.isArray(selectedSalon.mesas)) return [];
    if (searchMesas && searchMesas.trim() !== '') {
      const q = searchMesas.trim().toLowerCase();
      return selectedSalon.mesas.filter(mesa =>
        (mesa.nro_mesa && mesa.nro_mesa.toString().toLowerCase().includes(q)) ||
        (mesa.descripcion && mesa.descripcion.toLowerCase().includes(q))
      );
    }
    return selectedSalon.mesas;
  }, [selectedSalon, searchMesas]);

  // Debug logging para datos procesados
  console.log('🔍 Datos procesados:', {
    totalSalones: salones.length,
    filteredSalones: filteredSalones.length,
    selectedSalon: selectedSalon ? selectedSalon.descripcion : 'ninguno',
    mesasDelSalonSeleccionado: selectedSalon?.mesas?.length || 0,
    filteredMesas: filteredMesas.length
  });

  // ============ MANEJADORES DE SALONES ============
  const handleNuevoSalon = () => {
    setSalonEdit(null);
    setSalonNombre('');
    setSalonEstado('a');
    setShowSalonModal(true);
  };

  const handleEditarSalon = (salon: any) => {
    setSalonEdit(salon);
    setSalonNombre(salon.descripcion || salon.nombre || '');
    setSalonEstado(salon.estado || 'a');
    setShowSalonModal(true);
  };

  const handleEliminarSalon = async (salon: any) => {
    setDeleteItem({ type: 'salon', item: salon });
    setShowDeleteModal(true);
  };

  const handleGuardarSalon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!salonNombre.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const salonData = {
        descripcion: salonNombre,
        estado: salonEstado
      };
      if (salonEdit) {
        console.log('🔄 Actualizando salón:', salonEdit.id_salon, salonData);
        await updateSalon(salonEdit.id_salon, salonData);
      } else {
        console.log('🔄 Creando nuevo salón:', salonData);
        await createSalon(salonData);
      }
      // Recargar todos los datos después de crear/actualizar
      await fetchSalonesYMesas();
      setShowSalonModal(false);
      console.log('✅ Salón guardado y datos actualizados');
    } catch (err) {
      console.error('❌ Error al guardar salón:', err);
      // Si el error viene del backend con un mensaje y error detallado, mostrarlo bonito
      if (err && err.message) {
        try {
          // Intentar parsear el mensaje JSON si es posible
          const parsed = JSON.parse(err.message);
          if (parsed && parsed.error && parsed.error.accion_requerida) {
            setError('No se puede cambiar el estado del salón porque hay mesas en uso (reservadas, ocupadas, limpieza, mantenimiento o bloqueadas). Todas las mesas deben estar libres para inactivar el salón.');
          } else if (parsed && parsed.message) {
            setError(parsed.message);
          } else {
            setError(err.message);
          }
        } catch {
          setError(err.message);
        }
      } else {
        setError('No se puede cambiar el estado del salón porque hay mesas en uso. Todas las mesas deben estar libres para inactivar el salón.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ============ MANEJADORES DE MESAS ============
  const handleNuevaMesa = () => {
    setMesaEdit(null);
    setMesaNombre('');
    setMesaCapacidad(4);
    setMesaDescripcion('');
    setMesaImagen('');
    setMesaImagenFile(null);
    setMesaEstado('libre');
    setShowMesaModal(true);
  };

  const handleEditarMesa = (mesa: any) => {
    setMesaEdit(mesa);
    setMesaNombre(mesa.nro_mesa || '');
    setMesaCapacidad(mesa.capacidad || 4);
    setMesaDescripcion(mesa.descripcion || '');
    setMesaImagen(mesa.imagen || ''); // Esto mostrará el nombre del archivo actual
    setMesaImagenFile(null); // No hay archivo nuevo seleccionado
    setMesaEstado(mesa.estado || 'libre');
    setShowMesaModal(true);
  };

  const handleEliminarMesa = async (mesa: any) => {
    setDeleteItem({ type: 'mesa', item: mesa });
    setShowDeleteModal(true);
  };

  const handleGuardarMesa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mesaNombre?.trim() || !mesaCapacidad) return;
    if (!selectedSalon) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Crear FormData para enviar archivos
      const formData = new FormData();
      formData.append('id_salon', selectedSalon.id_salon);
      formData.append('nro_mesa', mesaNombre);
  formData.append('capacidad', mesaCapacidad.toString());
      formData.append('descripcion', mesaDescripcion || mesaNombre);
      formData.append('estado', mesaEstado);
      
      // Solo agregar imagen si hay un archivo nuevo
      if (mesaImagenFile) {
        formData.append('imagen', mesaImagenFile);
      } else if (mesaEdit && mesaImagen) {
        // Si estamos editando y no hay archivo nuevo, mantener la imagen existente
        formData.append('imagen_existente', mesaImagen);
      }

      if (mesaEdit && mesaEdit.id_mesa) {
        console.log('🔄 Actualizando mesa:', mesaEdit.id_mesa);
        await updateMesa(mesaEdit.id_mesa, formData);
      } else {
        console.log('🔄 Creando nueva mesa');
        await createMesa(formData);
      }
      
      // Recargar todos los datos después de crear/actualizar
      await fetchSalonesYMesas();
      setShowMesaModal(false);
      console.log('✅ Mesa guardada y datos actualizados');
    } catch (err) {
      console.error('❌ Error al guardar mesa:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============ MANEJADORES DE ELIMINACIÓN ============
  const handleConfirmarEliminacion = async () => {
    if (!deleteItem) return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (deleteItem.type === 'mesa') {
        console.log('🔄 Eliminando mesa:', deleteItem.item.id_mesa);
        await deleteMesa(deleteItem.item.id_mesa);
      } else if (deleteItem.type === 'salon') {
        console.log('🔄 Eliminando salón:', deleteItem.item.id_salon);
        await deleteSalon(deleteItem.item.id_salon);
        if (selectedSalonId === deleteItem.item.id_salon) {
          setSelectedSalonId(null);
        }
      }
      
      // Recargar todos los datos después de eliminar
      await fetchSalonesYMesas();
      setShowDeleteModal(false);
      setDeleteItem(null);
      console.log('✅ Elemento eliminado y datos actualizados');
    } catch (err) {
      console.error('❌ Error al eliminar:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============ MANEJADORES DE MODALES ============
  const handleCerrarSalonModal = () => setShowSalonModal(false);
  const handleCerrarMesaModal = () => setShowMesaModal(false);
  const handleCancelarEliminacion = () => {
    setShowDeleteModal(false);
    setDeleteItem(null);
  };

  // ============ EFECTOS ADICIONALES ============
  // Auto-seleccionar el primer salón si el seleccionado actual no está en los filtrados
  React.useEffect(() => {
    if (filteredSalones.length > 0 && selectedSalonId) {
      const salonSeleccionadoVisible = filteredSalones.find(s => s.id_salon === selectedSalonId);
      if (!salonSeleccionadoVisible) {
        setSelectedSalonId(filteredSalones[0].id_salon);
      }
    } else if (filteredSalones.length > 0 && !selectedSalonId) {
      setSelectedSalonId(filteredSalones[0].id_salon);
    }
  }, [filteredSalones, selectedSalonId]);

  // Limpiar búsqueda de mesas al cambiar salón
  React.useEffect(() => {
    if (selectedSalonId) {
      setSearchMesas('');
    }
  }, [selectedSalonId]);
  // ============ RENDERIZADO ============
  if (unauthorized) return <UnauthorizedView />;

  return (
    <div className={styles.modernContainer}>
      {/* Header con título y breadcrumb */}
      <div className="section-header">
        <div className="section-title">
          Salones y Mesas 
          {loading && ' (Cargando...)'}
          {!loading && salones.length > 0 && ` (${salones.length} salones)`}
        </div>
        <div className="section-breadcrumb">Inicio &gt; Ajustes &gt; Salones y Mesas</div>
      </div>

      {/* Mensaje de error global */}
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {/* Layout de dos paneles */}
      <div className={styles.twoColumnLayout}>
        {/* Panel izquierdo - Salones */}
        <div className={styles.leftPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>
              Salones {salones.length > 0 && `(${salones.length})`}
            </h3>
            <div className={styles.panelHeaderRight}>
              <input
                type="text"
                placeholder="Buscar salones..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.modernSearchInput}
                disabled={loading}
              />
              <button 
                className={styles.addBtn}
                onClick={handleNuevoSalon} 
                disabled={loading}
                title="Agregar nuevo salón"
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.salonListContainer}>
            {loading ? (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <span>Cargando salones...</span>
              </div>
            ) : (
              <SalonesList
                salones={filteredSalones}
                selectedSalonId={selectedSalonId}
                onSelect={setSelectedSalonId}
                onEdit={handleEditarSalon}
                onDelete={handleEliminarSalon}
                loading={loading}
                styles={styles}
                getSalonEstadoTexto={getSalonEstadoTexto}
              />
            )}
          </div>
        </div>

        {/* Panel derecho - Mesas */}
        <div className={styles.rightPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>
              {selectedSalon ? 
                `Mesas de ${selectedSalon.descripcion || 'Sin nombre'} (${selectedSalon.mesas?.length || 0})` : 
                'Mesas'
              }
            </h3>
            <div className={styles.panelHeaderRight}>
              {selectedSalon && (
                <input
                  type="text"
                  placeholder="Buscar mesas..."
                  value={searchMesas}
                  onChange={e => setSearchMesas(e.target.value)}
                  className={styles.modernSearchInput}
                />
              )}
              <button 
                className={styles.addBtn}
                onClick={handleNuevaMesa} 
                disabled={loading || !selectedSalon}
                title="Agregar nueva mesa"
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.mesaListContainer}>
            {loading ? (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <span>Cargando mesas...</span>
              </div>
            ) : selectedSalon ? (
              <MesasList
                mesas={filteredMesas}
                onEdit={handleEditarMesa}
                onDelete={handleEliminarMesa}
                styles={styles}
                loading={loading}
                loadingMesas={loading}
                salonSeleccionado={selectedSalon}
                getMesaEstadoTexto={getMesaEstadoTexto}
                getMesaEstadoColor={getMesaEstadoColor}
              />
            ) : (
              <div className={styles.emptyMesasState}>
                <h3>Selecciona un salón para ver sus mesas</h3>
                <p>Haz clic en cualquier salón de la lista izquierda</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============ MODALES ============ */}
      
      {/* Modal para crear/editar salón */}
      {showSalonModal && (
        <div className={styles.modalOverlay}>
          <form className={styles.modalForm} onSubmit={handleGuardarSalon}>
            <h3 className={styles.modalTitle}>
              {salonEdit ? 'Editar Salón' : 'Nuevo Salón'}
            </h3>
            
            <label className={styles.modalLabel}>
              Descripción del salón:
              <input 
                type="text" 
                value={salonNombre} 
                onChange={e => setSalonNombre(e.target.value)} 
                className={styles.modalInput} 
                required 
                maxLength={250}
                placeholder="Ej: Salón Principal"
              />
            </label>

            <label className={styles.modalLabel}>
              Estado:
              <select 
                value={salonEstado} 
                onChange={e => setSalonEstado(e.target.value)} 
                className={styles.modalInput} 
                required
              >
                <option value="a">Activo</option>
                <option value="i">Inactivo</option>
              </select>
            </label>

            <div className={styles.modalActions}>
              <button 
                type="button" 
                onClick={handleCerrarSalonModal} 
                className={styles.btnModalCancel}
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className={styles.btnModalSave}
                disabled={loading || !salonNombre.trim()}
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal para crear/editar mesa */}
      {showMesaModal && (
        <div className={styles.modalOverlay}>
          <form className={styles.modalForm} onSubmit={handleGuardarMesa}>
            <h3 className={styles.modalTitle}>
              {mesaEdit ? 'Editar Mesa' : 'Nueva Mesa'}
            </h3>
            
            <label className={styles.modalLabel}>
              Número de mesa:
              <input 
                type="text" 
                value={mesaNombre} 
                onChange={e => setMesaNombre(e.target.value)} 
                className={styles.modalInput} 
                required 
                maxLength={5}
                placeholder="Ej: M01"
              />
            </label>

            <label className={styles.modalLabel}>
              Capacidad (personas):
              <input 
                type="number" 
                min={1} 
                max={20} 
                value={mesaCapacidad} 
                onChange={e => setMesaCapacidad(Number(e.target.value))} 
                className={styles.modalInput} 
                required 
              />
            </label>

            <label className={styles.modalLabel}>
              Descripción:
              <input 
                type="text" 
                value={mesaDescripcion} 
                onChange={e => setMesaDescripcion(e.target.value)} 
                className={styles.modalInput} 
                maxLength={250}
                placeholder="Descripción de la mesa (opcional)"
              />
            </label>

            <label className={styles.modalLabel}>
              Imagen:
              <input 
                type="file" 
                accept="image/*"
                onChange={e => {
                  const files = e.target.files;
                  const file = files && files[0] ? files[0] : null;
                  if (file) {
                    setMesaImagenFile(file);
                    setMesaImagen(file.name);
                  } else {
                    setMesaImagenFile(null);
                    if (!mesaEdit) {
                      setMesaImagen('');
                    }
                  }
                }}
                className={styles.modalInput}
                title="Seleccionar imagen para la mesa"
              />
              {mesaImagen && (
                <small style={{ color: '#666', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {mesaImagenFile ? 
                    `Archivo seleccionado: ${mesaImagen}` : 
                    `Imagen actual: ${mesaImagen}`
                  }
                </small>
              )}
              {mesaEdit && !mesaImagenFile && (
                <small style={{ color: '#888', fontSize: '11px', marginTop: '2px', display: 'block' }}>
                  Selecciona un archivo para cambiar la imagen actual
                </small>
              )}
            </label>

            <label className={styles.modalLabel}>
              Estado:
              <select 
                value={mesaEstado} 
                onChange={e => setMesaEstado(e.target.value)} 
                className={styles.modalInput} 
                required
              >
                <option value="libre">Libre</option>
                <option value="reservada">Reservada</option>
                <option value="ocupada">Ocupada</option>
                <option value="limpieza">Limpieza</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="bloqueada">Bloqueada</option>
              </select>
            </label>

            <div className={styles.modalActions}>
              <button 
                type="button" 
                onClick={handleCerrarMesaModal} 
                className={styles.btnModalCancel}
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className={styles.btnModalSave}
                disabled={loading || !mesaNombre.trim() || !mesaCapacidad}
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && deleteItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalForm}>
            <h3 className={styles.modalTitle}>
              Confirmar eliminación
            </h3>
            
            <p className={styles.deleteMessage}>
              ¿Estás seguro de que deseas eliminar {deleteItem.type === 'salon' ? 'el salón' : 'la mesa'} 
              <strong> {deleteItem.type === 'salon' ? deleteItem.item.descripcion : deleteItem.item.nro_mesa}</strong>?
            </p>

            {deleteItem.type === 'salon' && deleteItem.item.mesas && deleteItem.item.mesas.length > 0 && (
              <p className={styles.warningMessage}>
                ⚠️ Este salón tiene {deleteItem.item.mesas.length} mesa(s) asociada(s). 
                Al eliminar el salón, también se eliminarán todas sus mesas.
              </p>
            )}

            <div className={styles.modalActions}>
              <button 
                type="button" 
                onClick={handleCancelarEliminacion} 
                className={styles.btnModalCancel}
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={handleConfirmarEliminacion} 
                className={styles.btnModalDelete}
                disabled={loading}
              >
                {loading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SalonesMesasView;