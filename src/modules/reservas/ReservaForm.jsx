import React, { useState, useEffect } from 'react';
import './ReservaForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservaForm = ({ reserva, onChange, onSubmit, isEdit }) => {
  const [fecha, setFecha] = useState(reserva.fecha ? new Date(reserva.fecha) : null);
  const [capacidad, setCapacidad] = useState(reserva.capacidad || '');
  const [cliente, setCliente] = useState(reserva.cliente || '');
  const [mesasLibres, setMesasLibres] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [clienteInput, setClienteInput] = useState(cliente);
  const [showClientes, setShowClientes] = useState(false);

  // Simulación de clientes (reemplazar por llamada real a la API)
  useEffect(() => {
    setClientes([
      { id: 1, nombre: 'Juan Pérez' },
      { id: 2, nombre: 'María López' },
      { id: 3, nombre: 'Carlos Sánchez' },
      { id: 4, nombre: 'Ana Torres' },
    ]);
  }, []);

  // Simulación de búsqueda de mesas libres (reemplazar por llamada real a la API si existe)
  const buscarMesasLibres = async e => {
    e.preventDefault();
    setBuscando(true);
    setError(null);
    setMesasLibres([]);
    setMesaSeleccionada(null);
    try {
      // Aquí deberías llamar a la API real, usando fecha y capacidad
      // Por ahora, simula resultados
      await new Promise(r => setTimeout(r, 800));
      setMesasLibres([
        { id: 1, nro_mesa: 'A1', capacidad: capacidad },
        { id: 2, nro_mesa: 'B2', capacidad: capacidad },
        { id: 3, nro_mesa: 'C3', capacidad: capacidad },
      ]);
    } catch (e) {
      setError('Error al buscar mesas libres');
    } finally {
      setBuscando(false);
    }
  };

  const handleClienteInput = e => {
    setClienteInput(e.target.value);
    setShowClientes(true);
    onChange({ target: { name: 'cliente', value: e.target.value } });
  };

  const handleSelectCliente = clienteObj => {
    setClienteInput(clienteObj.nombre);
    setShowClientes(false);
    onChange({ target: { name: 'cliente', value: clienteObj.nombre } });
  };

    return (
      <div className="reserva-form">
        <form onSubmit={buscarMesasLibres} autoComplete="off" className="reserva-form-form">
          <h2 className="reserva-form-title">Nueva Reserva</h2>
          <div className="reserva-form-fields">
            {/* Cliente */}
            <div className="reserva-form-field">
              <label className="reserva-form-label">Cliente:</label>
              <div className="reserva-form-input-wrapper">
                <input
                  type="text"
                  name="cliente"
                  value={clienteInput}
                  onChange={handleClienteInput}
                  className="filtros-input reserva-form-input"
                  autoComplete="off"
                  onFocus={() => setShowClientes(true)}
                  required
                />
                {showClientes && clienteInput && (
                  <div className="reserva-form-autocomplete">
                    {clientes.filter(c => c.nombre.toLowerCase().includes(clienteInput.toLowerCase())).length === 0 ? (
                      <div className="reserva-form-autocomplete-empty">Sin resultados</div>
                    ) : (
                      clientes.filter(c => c.nombre.toLowerCase().includes(clienteInput.toLowerCase())).map(c => (
                        <div
                          key={c.id}
                          className="reserva-form-autocomplete-item"
                          onClick={() => handleSelectCliente(c)}
                        >
                          {c.nombre}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Fecha */}
            <div className="reserva-form-field">
              <label className="reserva-form-label">Fecha:</label>
              <DatePicker
                selected={fecha}
                onChange={date => {
                  setFecha(date);
                  onChange({ target: { name: 'fecha', value: date ? date.toISOString() : '' } });
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
                placeholderText="Selecciona fecha"
                className="filtros-datepicker reserva-form-input"
                required
              />
            </div>
            {/* Capacidad y botón en la misma fila */}
            <div className="reserva-form-row">
              <div className="reserva-form-field" style={{ flex: 1 }}>
                <label className="reserva-form-label">Capacidad:</label>
                <input
                  type="number"
                  name="capacidad"
                  min={1}
                  value={capacidad}
                  onChange={e => { setCapacidad(e.target.value); onChange({ target: { name: 'capacidad', value: e.target.value } }); }}
                  className="filtros-input reserva-form-input"
                  required
                />
              </div>
              <div className="reserva-form-btn-wrapper">
                <button type="submit" className="filtros-btn reserva-form-btn">
                  {buscando ? 'Buscando...' : 'Buscar mesas libres'}
                </button>
              </div>
            </div>
          </div>
      </form>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {mesasLibres.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <strong>Mesas libres:</strong>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
            {mesasLibres.map(mesa => (
              <div
                key={mesa.id}
                className={`reserva-form-mesa-card${mesaSeleccionada && mesaSeleccionada.id === mesa.id ? ' selected' : ''}`}
                onClick={() => setMesaSeleccionada(mesa)}
              >
                <div className="reserva-form-mesa-nro">Mesa {mesa.nro_mesa}</div>
                <div className="reserva-form-mesa-cap">Capacidad: {mesa.capacidad}</div>
                {mesaSeleccionada && mesaSeleccionada.id === mesa.id && (
                  <div className="reserva-form-mesa-seleccionada">Seleccionada</div>
                )}
              </div>
            ))}
          </div>
          {mesaSeleccionada && (
            <button
              className="filtros-btn"
              style={{ marginTop: 18, background: '#38a169' }}
              onClick={() => alert(`Reserva realizada para la mesa ${mesaSeleccionada.nro_mesa}`)}
            >
              Reservar mesa {mesaSeleccionada.nro_mesa}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservaForm;
                      
