
import React, { useState, useEffect } from 'react';
import './LoginView.css';
import { loginMozo } from '../../api/api';

const MultiMozoView: React.FC<{ onAdmin: () => void }> = ({ onAdmin }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);

  // Obtener token y expiración cada vez que se renderiza el componente
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('token_expires_at');

  // Efecto para cerrar sesión automáticamente cuando expire el token
  useEffect(() => {
    if (!token || !expiresAt) return;
    const interval = setInterval(() => {
      const now = new Date();
      if (new Date(expiresAt) <= now) {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expires_at');
        localStorage.removeItem('user');
        setSessionExpired(true);
      }
    }, 1000 * 30); // Verifica cada 30 segundos
    return () => clearInterval(interval);
  }, [token, expiresAt]);

  // Limpia sesión si ya expiró al cargar
  useEffect(() => {
    if (token && expiresAt && new Date() >= new Date(expiresAt)) {
      localStorage.removeItem('token');
      localStorage.removeItem('token_expires_at');
      localStorage.removeItem('user');
      setSessionExpired(true);
    }
  }, []);
  const handleVirtualKey = (val: string) => {
    if (val === 'DEL') {
      setCode(code.slice(0, -1));
    } else {
      setCode(code + val);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (code === '') {
      setLoading(false);
      setError('Ingrese un código válido');
      return;
    }
    try {
      const data = await loginMozo(code);
      setLoading(false);
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        if (data.expires_at) {
          localStorage.setItem('token_expires_at', data.expires_at);
        }
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Código incorrecto');
      }
    } catch (err) {
      setLoading(false);
      setError('Error de conexión. Intente nuevamente.');
    }
  };

  return (
    <div id="wrapper-2">
      <div className="container-fluid gx-0">
        <div className="row gx-0">
          {/* Imagen a la izquierda: 2/3 del ancho */}
          <div className="col-12 col-md-8 d-none d-md-flex p-0">
            <div className="login-bg-image"></div>
          </div>
          {/* MultiMozo a la derecha: 1/3 del ancho */}
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center p-0 login-form-col">
            <div className="w-100 login-form-wrapper">
              <div>
                <img
                  src="/images/index.png"
                  className="mb-2 login-logo"
                  alt="Logo"
                />
                <h2 className="text-center login-title">¡Bienvenido!</h2>
                <div className="text-center login-subtitle">
                  Ingrese sus datos de acceso
                </div>
                <form className="form-horizontal floating-labels" id="frm-multimozo" onSubmit={handleSubmit} autoComplete="off">
                  <div className="form-group m-b-20">
                    <input
                      type="password"
                      name="code"
                      id="f-code"
                      className="form-control text-center font-30 mb-3"
                      autoComplete="off"
                      required
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      placeholder="Código"
                    />
                  </div>
                  <div className="virtual-keyboard">
                    <button type="button" className="btn" onClick={() => handleVirtualKey('1')}>1</button>
                    <button type="button" className="btn" onClick={() => handleVirtualKey('2')}>2</button>
                    <button type="button" className="btn" onClick={() => handleVirtualKey('3')}>3</button>
                    <button type="button" className="btn" onClick={() => handleVirtualKey('4')}>4</button>
                    <button type="button" className="btn" onClick={() => handleVirtualKey('5')}>5</button>
                    <button type="button" className="btn" onClick={() => handleVirtualKey('6')}>6</button>
                    <button type="button" className="btn" onClick={() => handleVirtualKey('7')}>7</button>
                    <button type="button" className="btn" onClick={() => handleVirtualKey('8')}>8</button>
                    <button type="button" className="btn" onClick={() => handleVirtualKey('9')}>9</button>
                    <button type="button" className="btn key-0" onClick={() => handleVirtualKey('0')}>0</button>
                    <button type="button" className="btn key-backspace" onClick={() => handleVirtualKey('DEL')}>
                      ←
                    </button>
                  </div>
                  <button
                    className="btn btn-danger btn-block btn-lg text-uppercase waves-effect waves-light mt-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'CONTINUAR'}
                  </button>
                  {error && <div className="alert alert-danger mt-2">{error}</div>}
                  {sessionExpired && (
                    <div className="alert alert-warning mt-2">Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</div>
                  )}
                </form>
                <button
                  className="btn btn-block btn-lg btn-multimozo"
                  type="button"
                  onClick={onAdmin}
                >
                  Administrador
                </button>
                <div className="text-center login-footer">
                  ©2025 SWSPERU │ PERU REST SOFT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiMozoView;