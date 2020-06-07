import React from 'react';
import DrawingPad from './DrawingPad.jsx';
import data from '../JSON.js';

const sketchData = {
  element: '#sketchpad',
  width: 600,
  height: 600
}

const App = (props) => {

  return (
    <div>
      <DrawingPad sketchData={sketchData}/>
    </div>
  )
}

export default App;