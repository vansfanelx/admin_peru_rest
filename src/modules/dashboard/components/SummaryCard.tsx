import React from 'react';

const SummaryCard = ({ title, value, percent, color, subtitle, progressColor }: any) => (
  <div className="card h-100">
    <div className="card-body">
      <h4 className="card-title">{title}</h4>
      <div className={`text-right text-${color} font-weight-bold`} style={{ fontSize: 28 }}>
        {value}
      </div>
      <div className={`text-${color}`}>{percent}</div>
      <div className="progress mb-2">
        <div className={`progress-bar bg-${progressColor || color}`} style={{ width: percent, height: 6 }} />
      </div>
      <span className="font-13">{subtitle}</span>
    </div>
  </div>
);

export default SummaryCard;
