import React, { useEffect } from 'react';
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

  return (
    <div>
      <div>
        <canvas className='sketchpad' id='sketchpad'></canvas>
      </div>
      <div>
        <button onClick={handleUndo}>{'<'}</button>
        <button onClick={handleRedo}>{'>'}</button>
        <button onClick={() => props.submitDudel(sketchpad.toJSON())}>Submit</button>
      </div>
    </div>
  )
}

export default DrawingPad;