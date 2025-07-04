import React, { useState } from 'react';

const ForgotPasswordView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Aquí deberías llamar a tu función de recuperación
      // await forgotPassword(email);
      setSuccess('Correo de recuperación enviado');
    } catch (err) {
      setError('Error al enviar el correo');
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
                  type="email"
                  name="email"
                  className="form-control text-center font-30 mb-3"
                  placeholder="Correo"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button
                  className="btn btn-danger btn-block btn-lg text-uppercase waves-effect waves-light mt-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'RECUPERAR CONTRASEÑA'}
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

export default ForgotPasswordView;
