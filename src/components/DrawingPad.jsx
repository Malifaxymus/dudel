import React, { useEffect } from 'react';
import reactDOM from 'react-dom';
import Sketchpad from '../sketchpad.js';

const DrawingPad = (props) => {
  useEffect(() => {
    props.sketchData.element = '#sketchpad';
    window.sketchpad = new Sketchpad(props.sketchData)
  }, []);

  const handleUndo = () => {
    sketchpad.undo();
  };

  const handleRedo = () => {
    sketchpad.redo();
  };

  const handleSave = () => {
    console.log(sketchpad.toJSON())
  }

  return (
    <div>
      <div>
        <canvas className='sketchpad' id='sketchpad'></canvas>
      </div>
      <div>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}

export default DrawingPad;