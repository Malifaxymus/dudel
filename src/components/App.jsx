import React, { useEffect } from "react";
import DrawingPad from "./DrawingPad.jsx";
import data from "../JSON.js";
import io from "socket.io-client";

const sketchData = {
  element: "#sketchpad",
  width: 600,
  height: 600,
};

const App = (props) => {
  useEffect(() => {
    const socket = io("/");
    socket.on("connect", () => {
      console.log("socket connection established.");
    });
  }, []);

  return (
    <div>
      <h2>testy boi</h2>
      <DrawingPad sketchData={sketchData} />
    </div>
  );
};

export default App;
