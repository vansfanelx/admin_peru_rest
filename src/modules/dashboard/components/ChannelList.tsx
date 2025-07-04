import React from 'react';

const ChannelList = ({ data, moneda }: any) => (
  <div>
    <div className="mb-2 d-flex align-items-center">
      <span className="badge badge-success mr-2" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-box" /></span>
      <div>
        <div>{`${moneda} ${data.salon.total_ventas.toFixed(2)}`}</div>
        <small>Nro de ventas: {data.salon.cantidad_ventas}</small>
        <div>SALONES</div>
      </div>
    </div>
    <div className="mb-2 d-flex align-items-center">
      <span className="badge badge-primary mr-2" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-shopping-basket" /></span>
      <div>
        <div>{`${moneda} ${data.mostrador.total_ventas.toFixed(2)}`}</div>
        <small>Nro de ventas: {data.mostrador.cantidad_ventas}</small>
        <div>MOSTRADOR</div>
      </div>
    </div>
    <div className="mb-2 d-flex align-items-center">
      <span className="badge badge-warning mr-2" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-motorcycle" /></span>
      <div>
        <div>{`${moneda} ${data.delivery.total_ventas.toFixed(2)}`}</div>
        <small>Nro de ventas: {data.delivery.cantidad_ventas}</small>
        <div>DELIVERY</div>
      </div>
    </div>
  </div>
);

export default ChannelList;
