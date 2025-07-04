import React, { useState } from 'react';

const RegisterView: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Aquí deberías llamar a tu función de registro
      // await register(form.username, form.password, form.email);
      setSuccess('Usuario registrado correctamente');
    } catch (err) {
      setError('Error al registrar usuario');
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid gx-0">
      <div className="row gx-0">
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center p-0 login-form-col">
          <div className="w-100 login-form-wrapper">
            <div>
              <img src="/images/index.png" className="mb-2 login-logo" alt="Logo" />
              <form className="form-horizontal floating-labels" onSubmit={handleSubmit} autoComplete="off">
                <input
                  type="text"
                  name="username"
                  className="form-control text-center font-30 mb-3"
                  placeholder="Usuario"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-control text-center font-30 mb-3"
                  placeholder="Correo"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  className="form-control text-center font-30 mb-3"
                  placeholder="Contraseña"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  className="btn btn-danger btn-block btn-lg text-uppercase waves-effect waves-light mt-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : 'REGISTRAR'}
                </button>
                {error && <div className="alert alert-danger mt-2">{error}</div>}
                {success && <div className="alert alert-success mt-2">{success}</div>}
              </form>
              <div className="text-center login-footer">
                ©2025 SWSPERU │ PERU REST SOFT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
