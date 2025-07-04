import Dashboard from './modules/dashboard';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './components/PrivateRoute';

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { LoginView } from './modules/login';
import MultiMozoView from './modules/login/MultiMozoView';
import RegisterView from './modules/login/RegisterView';
import ForgotPasswordView from './modules/login/ForgotPasswordView';
import ResetPasswordView from './modules/login/ResetPasswordView';
import ValidarCorreoView from './modules/login/ValidarCorreoView';
import ReenviarValidacionView from './modules/login/ReenviarValidacionView';
import LogoutView from './modules/login/LogoutView';
import DashboardView from './modules/dashboard/DashboardView';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginViewWithMultiMozo />} />
        <Route path="/multimozo" element={<MultiMozoViewWithAdmin />} />
        <Route path="/admin/register" element={<RegisterView />} />
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/logout" element={<LogoutView />} />
            <Route index element={<DashboardView />} />
          </Route>
        </Route>
        <Route path="/admin/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/admin/reset-password" element={<ResetPasswordView />} />
        <Route path="/admin/validar-correo" element={<ValidarCorreoView />} />
        <Route path="/admin/reenviar-validacion" element={<ReenviarValidacionView />} />
       
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// Componente wrapper para LoginView con botón Multi Mozo
const LoginViewWithMultiMozo: React.FC = () => {
  const navigate = useNavigate();
  return <LoginView multiMozoButton={() => navigate('/multimozo')} />;
};

// Componente wrapper para MultiMozoView con botón Administrador
const MultiMozoViewWithAdmin: React.FC = () => {
  const navigate = useNavigate();
  return <MultiMozoView onAdmin={() => navigate('/login')} />;
};

export default App;
