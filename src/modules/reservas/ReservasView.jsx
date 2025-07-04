import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FiltrosReservas from './FiltrosReservas';
import ReservasList from './ReservasList';
import ReservaForm from './ReservaForm';
import { getReservas, createReserva, updateReserva, deleteReserva } from '../../api/api';

const ReservasView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [filtros, setFiltros] = useState({
    cliente: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado: '',
    capacidad: '',
    nro_mesa: ''
  });
  const [formReserva, setFormReserva] = useState({ cliente: '', fecha: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReservas = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getReservas(params);
      setReservas(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  // Abrir modal si la URL contiene ?modal=nueva
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('modal') === 'nueva') {
      setModalOpen(true);
    }
  }, [location.search]);

  const handleFiltroChange = e => {
    // Permite compatibilidad con react-datepicker y eventos normales
    if (e && e.target) {
      setFiltros({ ...filtros, [e.target.name]: e.target.value });
    } else if (e && e.name) {
      setFiltros({ ...filtros, [e.name]: e.value });
    }
  };

  const handleBuscar = () => {
    fetchReservas(filtros);
  };

  const handleFormChange = e => {
    setFormReserva({ ...formReserva, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await updateReserva(editId, formReserva);
      } else {
        await createReserva(formReserva);
      }
      setFormReserva({ cliente: '', fecha: '' });
      setIsEdit(false);
      setEditId(null);
      setModalOpen(false);
      navigate('/reservas', { replace: true });
      fetchReservas(filtros);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = reserva => {
    setFormReserva({ cliente: reserva.cliente, fecha: reserva.fecha });
    setIsEdit(true);
    setEditId(reserva.id);
    setModalOpen(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar reserva?')) return;
    setLoading(true);
    setError(null);
    try {
      await deleteReserva(id);
      fetchReservas(filtros);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <h1>Reservas</h1>
      <FiltrosReservas filtros={filtros} onChange={handleFiltroChange} onBuscar={handleBuscar} />
      {/* Botón flotante para nueva reserva */}
      <button
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: '#38a169',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          fontSize: 32,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          zIndex: 1001
        }}
        title="Nueva reserva"
        onClick={() => {
          setIsEdit(false);
          setFormReserva({ cliente: '', fecha: '' });
          setModalOpen(true);
          navigate('/reservas?modal=nueva');
        }}
      >+
      </button>

      {/* Modal de reserva */}
      {modalOpen && (
        <div className="reserva-modal-overlay">
          <div className="reserva-modal-content">
            <button
              className="reserva-modal-close"
              onClick={() => { setModalOpen(false); navigate('/reservas', { replace: true }); }}
              title="Cerrar"
            >×</button>
            <ReservaForm
              reserva={formReserva}
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
              isEdit={isEdit}
            />
          </div>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? <div>Cargando...</div> : (
        <ReservasList reservas={reservas} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default ReservasView;
