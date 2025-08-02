
import React from 'react';
import './AjusteView.css';


const AjusteView: React.FC = () => {
  return (
    <div className="ajuste-container view-container">
      <div className="section-header">
        <div className="section-title">Ajustes del Sistema</div>
        <div className="section-breadcrumb">Inicio &gt; Panel de opciones</div>
      </div>
      <div className="ajuste-panels">
        {/* Panel Sistema */}
        <div className="ajuste-panel">
          <div className="ajuste-panel-title">Sistema</div>
          <div className="ajuste-panel-list">
            <div className="ajuste-panel-item orange">
              <span className="ajuste-panel-icon">⚙️</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Configuración inicial</div>
                <div className="ajuste-panel-item-desc">Características, opciones y parámetros del sistema.</div>
              </div>
            </div>
            <div className="ajuste-panel-item orange">
              <span className="ajuste-panel-icon">🖨️</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Impresoras</div>
                <div className="ajuste-panel-item-desc">Configuración y administración de impresoras.</div>
              </div>
            </div>
            <div className="ajuste-panel-item orange">
              <span className="ajuste-panel-icon">⏱️</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Optimización de procesos</div>
                <div className="ajuste-panel-item-desc">Reducir pérdida de tiempo y recursos del sistema.</div>
              </div>
            </div>
            <div className="ajuste-panel-item green">
              <span className="ajuste-panel-icon">✅</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Desbloquear Plataforma</div>
                <div className="ajuste-panel-item-desc">Activar funcionalidades después del pago exitoso.</div>
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
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Datos de la empresa</div>
                <div className="ajuste-panel-item-desc">Información y configuración empresarial.</div>
              </div>
            </div>
            <div className="ajuste-panel-item purple">
              <span className="ajuste-panel-icon">👤</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Usuarios / Roles</div>
                <div className="ajuste-panel-item-desc">Gestión de usuarios y permisos del sistema.</div>
              </div>
            </div>
            <div className="ajuste-panel-item purple">
              <span className="ajuste-panel-icon">📄</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Tipo de documentos</div>
                <div className="ajuste-panel-item-desc">Configuración de documentos fiscales.</div>
              </div>
            </div>
            <div className="ajuste-panel-item purple">
              <span className="ajuste-panel-icon">💳</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Tipos de pago</div>
                <div className="ajuste-panel-item-desc">Métodos de pago disponibles.</div>
              </div>
            </div>
          </div>
        </div>        {/* Panel Restaurante */}
        <div className="ajuste-panel">
          <div className="ajuste-panel-title">Restaurante</div>
          <div className="ajuste-panel-list">
            <div className="ajuste-panel-item green">
              <span className="ajuste-panel-icon">🖥️</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Cajas</div>
                <div className="ajuste-panel-item-desc">Configuración de puntos de venta.</div>
              </div>
            </div>
            <div className="ajuste-panel-item green">
              <span className="ajuste-panel-icon">🏷️</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Áreas de Producción</div>
                <div className="ajuste-panel-item-desc">Zonas de preparación y cocina.</div>
              </div>
            </div>
            <div className="ajuste-panel-item green" style={{cursor: 'pointer'}} onClick={() => window.location.href = '/ajuste/salones-mesas'}>
              <span className="ajuste-panel-icon">🍽️</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Salones y mesas</div>
                <div className="ajuste-panel-item-desc">Administración de espacios del restaurante.</div>
              </div>
            </div>
            <div className="ajuste-panel-item green">
              <span className="ajuste-panel-icon">🍔</span>
              <div className="ajuste-panel-item-content">
                <div className="ajuste-panel-item-title">Productos</div>
                <div className="ajuste-panel-item-desc">Catálogo de productos y precios.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjusteView;
