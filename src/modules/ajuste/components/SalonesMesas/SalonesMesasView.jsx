import React, { useState } from 'react';
import UnauthorizedView from '../../../../views/UnauthorizedView';
import styles from './SalonesMesasView.module.css';
import { getSalones, createSalon, updateSalon, deleteSalon, createMesa, updateMesa, deleteMesa, getMesas } from '../../../../api/api';
import MesasList from './MesasList';

 
function SalonesMesasView() {
  const [salones, setSalones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salonEdit, setSalonEdit] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [showSalonModal, setShowSalonModal] = useState(false);
  const [salonNombre, setSalonNombre] = useState('');
  const [mesaEdit, setMesaEdit] = useState(null);
  const [mesaNombre, setMesaNombre] = useState('');
  const [mesaCapacidad, setMesaCapacidad] = useState(2);
  const [showMesaModal, setShowMesaModal] = useState(false);

  // Cargar salones y mesas desde la API al montar
  React.useEffect(() => {
    const fetchSalonesYMesas = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSalones();
        // Para cada salón, obtener sus mesas desde la API
        const salonesConMesas = await Promise.all(
          (Array.isArray(data) ? data : []).map(async (s) => {
            try {
              const res = await fetch(`/api/ajuste/mesas?id_salon=${s.id_salon}`, { headers: { ...getSalones().headers } });
              if (!res.ok) return { ...s, mesas: [] };
              const mesas = await res.json();
              return { ...s, mesas };
            } catch {
              return { ...s, mesas: [] };
            }
          })
        );
        setSalones(salonesConMesas);
      } catch (err) {
        if (err.message && (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized'))) {
          setUnauthorized(true);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSalonesYMesas();
  }, []);

  const filteredSalones = salones.filter(salon => {
    const nombre = salon.descripcion || '';
    return nombre.toLowerCase().includes(search.toLowerCase());
  });
 const selectedSalon = salones.find(s => s.id_salon === selectedSalonId) || null;

  // CRUD Salones con API
  const handleNuevoSalon = () => {
    setSalonEdit(null);
    setSalonNombre('');
    setShowSalonModal(true);
  };

  const handleEditarSalon = (salon) => {
    setSalonEdit(salon);
    setSalonNombre(salon.nombre);
    setShowSalonModal(true);
  };

  const handleCerrarSalonModal = () => setShowSalonModal(false);

  // CRUD Mesas
  const handleNuevaMesa = () => {
    setMesaEdit(null);
    setMesaNombre('');
    setMesaCapacidad(2);
    setShowMesaModal(true);
  };

  const handleEditarMesa = (mesa) => {
    setMesaEdit(mesa);
    setMesaNombre(mesa.descripcion || mesa.nombre || '');
    setMesaCapacidad(mesa.capacidad);
    setShowMesaModal(true);
  };

  const handleCerrarModal = () => setShowMesaModal(false);

  const handleEliminarMesa = async (mesaId) => {
    if (!selectedSalon) return;
    if (!window.confirm('¿Eliminar esta mesa?')) return;
    setLoading(true);
    setError(null);
    try {
      await deleteMesa(mesaId);
      setSalones(prevSalones => prevSalones.map(salon => {
        if (salon.id_salon !== selectedSalon.id_salon) return salon;
        return {
          ...salon,
          mesas: salon.mesas.filter(m => m.id_mesa !== mesaId)
        };
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuardarMesa = async (e) => {
    e.preventDefault();
    if (!mesaNombre.trim()) return;
    if (!selectedSalon) return;
    setLoading(true);
    setError(null);
    try {
      if (mesaEdit) {
        // Editar mesa existente
        const data = await updateMesa(mesaEdit.id_mesa, {
          id_salon: selectedSalon.id_salon,
          nro_mesa: mesaNombre,
          capacidad: mesaCapacidad,
          descripcion: mesaNombre,
          imagen: 'default.png',
          estado: mesaEdit.estado || 'a',
        });
        setSalones(prevSalones => prevSalones.map(salon => {
          if (salon.id_salon !== selectedSalon.id_salon) return salon;
          return {
            ...salon,
            mesas: salon.mesas.map(m => m.id_mesa === mesaEdit.id_mesa ? { ...data } : m)
          };
        }));
      } else {
        // Crear nueva mesa
        const data = await createMesa({
          id_salon: selectedSalon.id_salon,
          nro_mesa: mesaNombre,
          capacidad: mesaCapacidad,
          descripcion: mesaNombre,
          imagen: 'default.png',
          estado: 'a',
        });
        setSalones(prevSalones => prevSalones.map(salon => {
          if (salon.id_salon !== selectedSalon.id_salon) return salon;
          return {
            ...salon,
            mesas: [...salon.mesas, data]
          };
        }));
      }
      setShowMesaModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar salón
  const handleEliminarSalon = async (salonId) => {
    if (!window.confirm('¿Eliminar este salón?')) return;
    setLoading(true);
    setError(null);
    try {
      await deleteSalon(salonId);
      setSalones(prev => prev.filter(s => s.id_salon !== salonId));
    if (selectedSalonId === salonId) setSelectedSalonId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Guardar salón (nuevo o editar)
  const handleGuardarSalon = async (e) => {
    e.preventDefault();
    if (!salonNombre.trim()) return;
    setLoading(true);
    setError(null);
    try {
      if (salonEdit) {
       await updateSalon(salonEdit.id_salon, salonNombre);
        setSalones(prev => prev.map(s => s.id_salon === salonEdit.id_salon ? { ...s, nombre: salonNombre } : s));
      } else {
        const data = await createSalon(salonNombre);
        setSalones(prev => [...prev, { ...data, mesas: [] }]);
      }
      setShowSalonModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  // Al seleccionar un salón, recargar solo las mesas de ese salón
  React.useEffect(() => {
    if (!selectedSalonId) return;
    const cargarMesas = async () => {
      setLoading(true);
      setError(null);
      try {
        // getMesas debe aceptar un parámetro opcional para filtrar por salón
        const todasLasMesas = await getMesas();
        const mesasFiltradas = Array.isArray(todasLasMesas)
          ? todasLasMesas.filter(m => m.id_salon === selectedSalonId)
          : [];
        setSalones(prevSalones => prevSalones.map(salon =>
          salon.id_salon === selectedSalonId ? { ...salon, mesas: mesasFiltradas } : salon
        ));
      } catch (err) {
        setSalones(prevSalones => prevSalones.map(salon =>
          salon.id_salon === selectedSalonId ? { ...salon, mesas: [] } : salon
        ));
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarMesas();
  }, [selectedSalonId]);
  if (unauthorized) return <UnauthorizedView />;

  
  return (
    <div>
     <div className={styles.container}>
      <div className={styles.panelLeft}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Salones</h2>
          <button className={styles.btnNuevo} onClick={handleNuevoSalon} disabled={loading}>+ Nuevo</button>
        </div>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar salón..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.inputSearch}
            disabled={loading}
          />
        </div>
        <div className={styles.listContainer}>
          {loading ? (
            <div className={styles.statusMsg}>Cargando salones...</div>
          ) : error ? (
            <div className={`${styles.statusMsg} ${styles.statusError}`}>{error}</div>
          ) : filteredSalones.length === 0 ? (
            <div className={styles.statusMsg}>No hay salones registrados.</div>
          ) : (
            <ul className={styles.salonList}>
              {filteredSalones.map((salon) => {
                const nombre = salon.descripcion || 'Sin nombre';
                const isActive = selectedSalonId === salon.id_salon;
                return (
                  <li
                    key={salon.id_salon}
                    className={isActive ? `${styles.salonItem} ${styles.salonItemActive}` : styles.salonItem}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <span style={{ flex: 1, cursor: 'pointer' }} onClick={() => setSelectedSalonId(salon.id_salon)}>{nombre}</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className={styles.btnEditar} style={{ padding: '2px 8px', fontSize: 13 }} onClick={() => handleEditarSalon(salon)} disabled={loading}>Editar</button>
                      <button className={styles.btnEliminar} style={{ padding: '2px 8px', fontSize: 13 }} onClick={() => handleEliminarSalon(salon.id_salon)} disabled={loading}>Eliminar</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      {/* Modal para crear/editar salón */}
      {showSalonModal && (
        <div className={styles.modalOverlay}>
          <form className={styles.modalForm} onSubmit={handleGuardarSalon}>
            <h3 className={styles.modalTitle}>{salonEdit ? 'Editar Salón' : 'Nuevo Salón'}</h3>
            <label>
              Nombre:
              <input type="text" value={salonNombre} onChange={e => setSalonNombre(e.target.value)} className={styles.modalInput} required />
            </label>
            <div className={styles.modalActions}>
              <button type="button" onClick={handleCerrarSalonModal} className={styles.btnModalCancel}>Cancelar</button>
              <button type="submit" className={styles.btnModalSave}>Guardar</button>
            </div>
          </form>
        </div>
      )}
      <div className={styles.panelRight}>
        {selectedSalon ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 className={styles.mesasTitle}>Mesas de "{selectedSalon.descripcion || selectedSalon.nombre || ''}"</h2>
              <button className={styles.btnNuevo} onClick={handleNuevaMesa}>+ Nueva Mesa</button>
            </div>
            <MesasList
              mesas={selectedSalon.mesas}
              onEdit={handleEditarMesa}
              onDelete={handleEliminarMesa}
              styles={styles}
              loading={loading}
            />
          </div>
        ) : (
          <div className={styles.mesasEmpty}>
            Selecciona un salón para ver sus mesas.<br />
            <span className={styles.mesasEmoji}>🍽️</span>
          </div>
        )}

        {/* Modal para crear/editar mesa */}
        {showMesaModal && (
          <div className={styles.modalOverlay}>
            <form className={styles.modalForm} onSubmit={handleGuardarMesa}>
              <h3 className={styles.modalTitle}>{mesaEdit ? 'Editar Mesa' : 'Nueva Mesa'}</h3>
              <label>
                Nombre:
                <input type="text" value={mesaNombre} onChange={e => setMesaNombre(e.target.value)} className={styles.modalInput} required />
              </label>
              <label>
                Capacidad:
                <input type="number" min={1} max={20} value={mesaCapacidad} onChange={e => setMesaCapacidad(Number(e.target.value))} className={styles.modalInput} required />
              </label>
              <div className={styles.modalActions}>
                <button type="button" onClick={handleCerrarModal} className={styles.btnModalCancel}>Cancelar</button>
                <button type="submit" className={styles.btnModalSave}>Guardar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
export default SalonesMesasView;

