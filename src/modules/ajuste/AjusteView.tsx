
import React from 'react';
import './AjusteView.css';


const AjusteView: React.FC = () => {
  return (
    <div className="ajuste-container">
      <div className="ajuste-header">
        <div className="ajuste-title">Ajustes</div>
        <div className="ajuste-breadcrumb">Inicio &gt; Panel de opciones</div>
      </div>
      <div className="ajuste-panels">
        {/* Panel Sistema */}
        <div className="ajuste-panel">
          <div className="ajuste-panel-title">Sistema</div>
          <div className="ajuste-panel-list">
            <div className="ajuste-panel-item orange">
              <span className="ajuste-panel-icon">⚙️</span>
              <div>
                <div className="ajuste-panel-item-title">Configuración inicial</div>
                <div className="ajuste-panel-item-desc">Características, opciones, otros.</div>
              </div>
            </div>
            <div className="ajuste-panel-item orange">
              <span className="ajuste-panel-icon">🖨️</span>
              <div>
                <div className="ajuste-panel-item-title">Impresoras</div>
                <div className="ajuste-panel-item-desc">Creación, modificación.</div>
              </div>
            </div>
            <div className="ajuste-panel-item orange">
              <span className="ajuste-panel-icon">⏱️</span>
              <div>
                <div className="ajuste-panel-item-title">Optimización de procesos</div>
                <div className="ajuste-panel-item-desc">Reducir o eliminar la pérdida de tiempo y recursos</div>
              </div>
            </div>
            <div className="ajuste-panel-item green">
              <span className="ajuste-panel-icon">✅</span>
              <div>
                <div className="ajuste-panel-item-title">Desbloquear Plataforma</div>
                <div className="ajuste-panel-item-desc">Desbloquear si su pago fue exitoso</div>
              </div>
            </div>
          </div>
        </div>
        {/* Panel Empresa */}
        <div className="ajuste-panel">
          <div className="ajuste-panel-title">Empresa</div>
          <div className="ajuste-panel-list">
            <div className="ajuste-panel-item purple">
              <span className="ajuste-panel-icon">🏢</span>
              <div>
                <div className="ajuste-panel-item-title">Datos de la empresa</div>
                <div className="ajuste-panel-item-desc">Modificar los datos de la empresa.</div>
              </div>
            </div>
            <div className="ajuste-panel-item purple">
              <span className="ajuste-panel-icon">👤</span>
              <div>
                <div className="ajuste-panel-item-title">Usuarios / Roles</div>
                <div className="ajuste-panel-item-desc">Creación, modificación.</div>
              </div>
            </div>
            <div className="ajuste-panel-item purple">
              <span className="ajuste-panel-icon">📄</span>
              <div>
                <div className="ajuste-panel-item-title">Tipo de documentos</div>
                <div className="ajuste-panel-item-desc">Modificar los tipos de documentos.</div>
              </div>
            </div>
            <div className="ajuste-panel-item purple">
              <span className="ajuste-panel-icon">💳</span>
              <div>
                <div className="ajuste-panel-item-title">Tipos de pago</div>
                <div className="ajuste-panel-item-desc">Modificar los tipos de pagos.</div>
              </div>
            </div>
          </div>
        </div>
        {/* Panel Restaurante */}
        <div className="ajuste-panel">
          <div className="ajuste-panel-title">Restaurante</div>
          <div className="ajuste-panel-list">
            <div className="ajuste-panel-item green">
              <span className="ajuste-panel-icon">🖥️</span>
              <div>
                <div className="ajuste-panel-item-title">Cajas</div>
                <div className="ajuste-panel-item-desc">Creación, modificación.</div>
              </div>
            </div>
            <div className="ajuste-panel-item green">
              <span className="ajuste-panel-icon">🏷️</span>
              <div>
                <div className="ajuste-panel-item-title">Áreas de Producción</div>
                <div className="ajuste-panel-item-desc">Creación, modificación.</div>
              </div>
            </div>
            <div className="ajuste-panel-item green" style={{cursor: 'pointer'}} onClick={() => window.location.href = '/ajuste/salones-mesas'}>
              <span className="ajuste-panel-icon">🍽️</span>
              <div>
                <div className="ajuste-panel-item-title">Salones y mesas</div>
                <div className="ajuste-panel-item-desc">Creación, modificación.</div>
              </div>
            </div>
            <div className="ajuste-panel-item green">
              <span className="ajuste-panel-icon">🍔</span>
              <div>
                <div className="ajuste-panel-item-title">Productos</div>
                <div className="ajuste-panel-item-desc">Creación, modificación.</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AjusteView;
