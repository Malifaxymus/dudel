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

    socket.on("startGame", (data) => {
      console.log(data.msg);
      setDoodlePrompt(data.prompt)
      setGameState("doodle");
    });
  }, []);

  const [username, setUsername] = useState("");
  const [gameState, setGameState] = useState("lobby");
  const [doodlePrompt, setDoodlePrompt] = useState('');

  const submitUsername = () => {
    socket.emit("addPlayer", { username });
  };

  const submitAllReady = () => {
    socket.emit("allReady", { allReady: true });
  };

  if (gameState == "lobby") {
    return (
      <div>
        <h2>testy boi</h2>
        <DrawingPad sketchData={sketchData} />
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <button onClick={submitUsername}>SUBMIT USERNAME</button>
        <button onClick={submitAllReady}>Ready to Start</button>
      </div>
    );
  } else if (gameState == "doodle") {
    return <h1>{doodlePrompt}</h1>;
  } else if (gameState == "title") {
    return <h1>TITLE STATE PLACEHOLDER</h1>;
  } else {
    return <h1>GAME STATE IS BROKEN WHAT DID YOU DO</h1>;
  }
};

export default App;
