import React from 'react';

const SimpleCard = ({ title, value, bg }: any) => (
  <div className={`card bg-${bg} text-white h-100`}>
    <div className="card-body">
      <h4 className="card-title">{title}</h4>
      <h5>{value}</h5>
    </div>
  </div>
);

export default SimpleCard;
