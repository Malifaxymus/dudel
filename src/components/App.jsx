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
    socket.on("test", (data) => {
      console.log(data);
    });
  }, []);

  const [testEvent, setTestEvent] = useState("");
  const [username, setUsername] = useState("");

  const emitTest = () => {
    socket.emit(testEvent);
  };

  const submitUsername = () => {
    socket.emit("addPlayer", { username });
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
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      <button onClick={submitUsername}>SUBMIT USERNAME</button>
    </div>
  );
};

export default App;
