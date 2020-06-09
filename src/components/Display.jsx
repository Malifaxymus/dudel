import React, { useEffect } from 'react';
import Sketchpad from '../sketchpad.js';

let Display = (props) => {
  let sketchDataArray = []

  useEffect(() => {
    sketchDataArray.forEach(x => {
      new Sketchpad(x)
    })
  }, []);

  return (
    <div>
      {props.data.map((x, i) => {
        if (i === 0) {
          return <h2>Original Prompt: {x}</h2>
        }
        if (i % 2 === 0) {
          console.log('test', x)
          return <h2>Guess: {x}</h2>
        } else {
          let sketchData = JSON.parse(x)
          sketchData.element = `#sketchpad${i}`;
          sketchData.readOnly = true;
          sketchDataArray.push(sketchData)
          return (
            <div>
              <h2>Drawing:</h2>
              <canvas id={`sketchpad${i}`}></canvas>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Display