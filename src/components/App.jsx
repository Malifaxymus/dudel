import React from 'react';
import reactDOM from 'react-dom';
import DrawingPad from './DrawingPad.jsx';

const sketchData = {
  element: '#sketchpad',
  width: 400,
  height: 400
}

const App = (props) => {

  return (
    <div>
      <DrawingPad sketchData={sketchData}/>
    </div>
  )
}

export default App;