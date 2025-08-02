import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface LoginViewProps {
  multiMozoButton?: () => void;
}
import './LoginView.css';
import { login } from '../../api/api';

const LoginView: React.FC<LoginViewProps> = ({ multiMozoButton }) => {
  // Redirige al dashboard si ya hay token válido
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('token_expires_at');
  const [sessionExpired, setSessionExpired] = useState(false);

  // Redirige si el token es válido y no ha expirado
  if (token && expiresAt && new Date() < new Date(expiresAt) && !sessionExpired) {
    return <Navigate to="/dashboard" replace />;
  }

  // Efecto para cerrar sesión automáticamente cuando expire el token
  useEffect(() => {
    if (!token || !expiresAt) return;
    const checkSession = () => {
      const now = new Date();
      if (new Date(expiresAt) <= now) {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expires_at');
        localStorage.removeItem('user');
        setSessionExpired(true);
      }
    };
    // Verifica cada 10 segundos
    const interval = setInterval(checkSession, 10000);
    // Verifica al cargar
    checkSession();
    return () => clearInterval(interval);
  }, [token, expiresAt]);

  // Si la sesión expiró, redirige al login
  useEffect(() => {
    if (sessionExpired) {
      window.location.href = '/login';
    }
  }, [sessionExpired]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  // Lógica para el teclado virtual (multimozo)
  const handleVirtualKey = (val: string) => {
    if (val === 'DEL') {
      setUsername(username.slice(0, -1));
      setPassword(password.slice(0, -1));
    } else {
      setUsername(username + val);
      setPassword(password + val);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try {
      const data = await login(username, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.expires_at) {
          localStorage.setItem('token_expires_at', data.expires_at);
        }
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Datos incorrectos');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wrapper-2">
      <div className="container-fluid gx-0">
        <div className="row gx-0">
          {/* Imagen a la izquierda: 2/3 del ancho */}
          <div className="col-md-8 p-0">
            <div className="login-bg-image"></div>
          </div>
          {/* Login a la derecha: 1/3 del ancho */}
          <div className="col-md-4 d-flex align-items-center justify-content-center p-0 login-form-col">
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
                <form className="form-horizontal floating-labels" id="frm-login" onSubmit={handleSubmit} autoComplete="off">
                  <div className="form-group m-b-20">
                    <input
                      type="text"
                      name="username"
                      id="f-user"
                      className="form-control text-center font-30 mb-3"
                      autoComplete="off"
                      required
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Usuario"
                    />
                    <input
                      type="password"
                      name="password"
                      id="f-pass"
                      className="form-control text-center font-30 mb-3"
                      autoComplete="off"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Contraseña"
                    />
                    <span className="bar"></span>
                  </div>
                  {showKeyboard && (
                    <div className="row button-group virtual-keyboard">
                      {[1,2,3,4,5,6,7,8,9,0].map((num, idx) => (
                        <div className="col-4" key={num}>
                          <button
                            type="button"
                            className="btn waves-effect waves-light btn-block btn-lg btn-inverse"
                            onClick={() => handleVirtualKey(num.toString())}
                          >
                            {num}
                          </button>
                        </div>
                      ))}
                      <div className="col-8">
                        <button
                          type="button"
                          className="btn waves-effect waves-light btn-block btn-lg btn-inverse"
                          onClick={() => handleVirtualKey('DEL')}
                        >
                          <i className="fas fa-arrow-left"></i>
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    className="btn btn-danger btn-block btn-lg text-uppercase waves-effect waves-light mt-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                  </button>
                  {error && <div className="alert alert-danger mt-2">{error}</div>}
                  {sessionExpired && (
                    <div className="alert alert-warning mt-2">Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</div>
                  )}
                </form>
                <button
                  className="btn btn-block btn-lg btn-multimozo"
                  type="button"
                  onClick={multiMozoButton ? multiMozoButton : () => setShowKeyboard(true)}
                >
                  Multi Mozo
                </button>
                <div className="text-center login-footer">
                  ©2010 - 2025 SWSPERU │ PERU REST SOFT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;

