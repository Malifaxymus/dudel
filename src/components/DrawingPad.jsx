import React, { useEffect } from 'react';
import reactDOM from 'react-dom';
import Sketchpad from '../sketchpad.js';

const DrawingPad = (props) => {

  useEffect(() => {
    window.sketchpad = new Sketchpad(props.sketchData)
  }, []);

  const handleUndo = () => {
    sketchpad.undo();
  };

  const handleRedo = () => {
    sketchpad.redo();
  };

  return (
    <div>
      <canvas className='sketchpad' id='sketchpad'></canvas>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
    </div>
  )
}

export default DrawingPad;