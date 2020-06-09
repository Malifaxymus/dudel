import React, { useEffect, useState } from 'react';
import Sketchpad from '../sketchpad.js';

const GuessingPad = (props) => {

  useEffect(() => {
    props.sketchData.element = '#sketchpad';
    window.sketchpad = new Sketchpad(props.sketchData)
    window.sketchpad.animate(3)
  }, []);

  const [guess, setGuess] = useState('')

  const handleChange = (e) => {
    setGuess(e.target.value)
  }

  return (
    <div>
      <div>
        <canvas className='sketchpad' id='sketchpad'></canvas>
      </div>
        <h2>What is this?</h2>
        <input type='text' onChange={(e) => handleChange(e)}></input>
        <button onClick={() => props.submitDudel(guess)}>Submit</button>
    </div>
  )
}

export default GuessingPad;