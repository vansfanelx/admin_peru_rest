import React, { useState } from 'react';
import './LoginView.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const LoginView: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Lógica para el teclado virtual (multimozo)
  const handleVirtualKey = (val: string) => {
    if (val === 'DEL') {
      setUsuario(usuario.slice(0, -1));
      setPassword(password.slice(0, -1));
    } else {
      setUsuario(usuario + val);
      setPassword(password + val);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        // Redirigir según el rol o dashboard
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
      <div className="row auth-wrapper gx-0">
        <div
          className="col-lg-7 col-xl-8 bg-primary auth-box-2 on-sidebar hidden-md-down"
          style={{
            backgroundImage: `url(/images/background/fondo.jpg)`,
            backgroundSize: 'cover',
          }}
        ></div>
        <div className="col-md-12 col-lg-5 col-xl-4 d-flex align-items-center justify-content-center">
          <div className="row justify-content-center w-100 mt-1 mt-lg-0 px-5">
            <div className="col-12">
              <div>
                <img
                  src="/images/index.png"
                  style={{ width: '70%', maxWidth: 350, margin: '0 auto', display: 'block' }}
                  className="mb-2"
                  alt="Logo"
                />
                <h3 className="text-center">Bienvenido!</h3>
                <p className="text-center text-muted fs-4">Ingrese sus datos de acceso</p>
                <form className="form-horizontal floating-labels" id="frm-login" onSubmit={handleSubmit} autoComplete="off">
                  <h5 className="box-title m-b-20">Ingrese código</h5>
                  <div className="form-group m-b-20">
                    <input
                      type="hidden"
                      name="password"
                      id="f-pass"
                      className="form-control"
                      value={password}
                      readOnly
                    />
                    <input
                      type="password"
                      name="usuario"
                      id="f-user"
                      className="form-control text-center font-30"
                      autoComplete="off"
                      required
                      value={usuario}
                      onChange={e => {
                        setUsuario(e.target.value);
                        setPassword(e.target.value);
                      }}
                      style={{ borderRadius: 10 }}
                    />
                    <span className="bar"></span>
                  </div>
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
                  <button
                    className="btn btn-warning btn-block btn-lg text-uppercase waves-effect waves-light mt-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'CONTINUAR'}
                  </button>
                  {error && <div className="alert alert-danger mt-2">{error}</div>}
                </form>
                <div className="mt-4 mb-3 px-5">
                  <a className="btn btn-primary btn-lg btn-block" href="/">Administrador</a>
                </div>
                <div className="text-center" style={{ fontSize: 12 }}>
                  ©2023 Mi Página Web Péru │ Páginas Web & Hosting
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
