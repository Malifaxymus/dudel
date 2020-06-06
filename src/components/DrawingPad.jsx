import React, { useEffect } from 'react';
import reactDOM from 'react-dom';
import Sketchpad from '../sketchpad.js';

const DrawingPad = (props) => {

  useEffect(() => {
      var sketchpad = new Sketchpad({
        element: '#sketchpad',
        width: 400,
        height: 400
      })
  }, []);

  return (<canvas className='sketchpad' id='sketchpad'></canvas>)
}

export default DrawingPad;