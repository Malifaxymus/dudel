import React, { useEffect, useState } from "react";
import DrawingPad from "./DrawingPad.jsx";
import data from "../JSON.js";
import io from "socket.io-client";

const sketchData = {
  element: "#sketchpad",
  width: 600,
  height: 600,
};

let socket;

const App = (props) => {
  useEffect(() => {
    socket = io("/");
    socket.on("connect", () => {
      console.log("socket connection established.");
    });
  }, []);

  const [testEvent, setTestEvent] = useState("");

  const emitTest = () => {
    socket.emit(testEvent);
  };

  return (
    <div>
      <h2>testy boi</h2>
      <DrawingPad sketchData={sketchData} />
      Enter event name:
      <input
        onChange={(e) => {
          setTestEvent(e.target.value);
        }}
      ></input>
      <button onClick={emitTest}>EMIT TEST EVENT</button>
    </div>
  );
};

export default App;
