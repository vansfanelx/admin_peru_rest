import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * PrivateRoute protege las rutas privadas de la aplicación.
 * Si existe un token en localStorage, permite el acceso a las rutas hijas (Outlet).
 * Si no hay token, redirige al usuario a la página de login.
 *
 * Uso en rutas:
 * <Route element={<PrivateRoute />}>
 *   <Route path="/dashboard" element={<DashboardView />} />
 *   ...
 * </Route>
 */
const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
