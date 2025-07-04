import React, { useEffect } from 'react';

// Puedes agregar aquí la función real de logout si tienes un API
const logout = async () => {
  // await fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' });
  localStorage.removeItem('token'); // O el nombre de tu token
  // window.location.href = '/admin/login';
};

const LogoutView: React.FC = () => {
  useEffect(() => {
    logout();
    // Redirige después de cerrar sesión
    window.location.href = '/admin/login';
  }, []);

  return (
    <div className="container-fluid gx-0">
      <div className="row gx-0">
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center p-0 login-form-col">
          <div className="w-100 login-form-wrapper">
            <div className="text-center">
              <img src="/images/index.png" className="mb-2 login-logo" alt="Logo" />
              <h2 className="login-title mt-4">Cerrando sesión...</h2>
              <div className="text-center login-footer mt-4">
                ©2025 SWSPERU │ PERU REST SOFT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutView;
