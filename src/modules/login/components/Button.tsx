import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', className, onClick, disabled, children }) => (
  <button type={type} className={className} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
