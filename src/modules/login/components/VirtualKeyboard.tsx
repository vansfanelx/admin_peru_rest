import React from 'react';

interface VirtualKeyboardProps {
  onKeyPress: (val: string) => void;
}

const keys = [1,2,3,4,5,6,7,8,9,0];

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => (
  <div className="row button-group virtual-keyboard">
    {keys.map(num => (
      <div className="col-4" key={num}>
        <button
          type="button"
          className="btn waves-effect waves-light btn-block btn-lg btn-inverse"
          onClick={() => onKeyPress(num.toString())}
        >
          {num}
        </button>
      </div>
    ))}
    <div className="col-8">
      <button
        type="button"
        className="btn waves-effect waves-light btn-block btn-lg btn-inverse"
        onClick={() => onKeyPress('DEL')}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
    </div>
  </div>
);

export default VirtualKeyboard;
