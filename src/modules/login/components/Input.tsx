import React from 'react';

interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  autoComplete?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, name, id, placeholder, value, onChange, className, autoComplete, required }) => (
  <input
    type={type}
    name={name}
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={className}
    autoComplete={autoComplete}
    required={required}
  />
);

export default Input;
