import React, { useEffect, useState } from "react";
import DrawingPad from "./DrawingPad.jsx";
import GuessingPad from "./GuessingPad.jsx";
import data from "../JSON.js";
import io from "socket.io-client";

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
      setDoodlePrompt(data.prompt);
      setGameState("dudel");
    });

    socket.on("guess", (data) => {
      let dudel = JSON.parse(data.dudel);
      dudel.readOnly = true;
      setGuessData(dudel);
      setGameState("guess");
    })

    socket.on("dudel", (data) => {
      setDoodlePrompt(data.prompt);
      setGameState("dudel");
    })

    socket.on("done", (data) => {
      console.log(data);
      setGameState("done");
    })
  }, []);

  const sketchData = {
    element: "#sketchpad",
    width: 600,
    height: 600,
  };

  const [username, setUsername] = useState("");
  const [gameState, setGameState] = useState("lobby");
  const [doodlePrompt, setDoodlePrompt] = useState("");
  const [guessData, setGuessData] = useState({})

  const submitUsername = () => {
    socket.emit("addPlayer", { username });
  };

  const submitAllReady = () => {
    socket.emit("allReady", { allReady: true });
  };

  const submitDudel = (dudel) => {
    socket.emit("submit", { username, dudel })
    setGameState("waiting")
  }

  if (gameState == "lobby") {
    return (
      <div>
        <h2>Dudel</h2>
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
  } else if (gameState == "dudel") {
    return (
      <div>
        <h1>{doodlePrompt}</h1>
        <DrawingPad sketchData={sketchData} submitDudel={submitDudel} />
      </div>
    )
  } else if (gameState == "guess") {
    return (
      <div>
        <GuessingPad sketchData={guessData} submitDudel={submitDudel} />
      </div>
    );
  } else if (gameState == "waiting") {
    return <h1>Please Wait For Other Players...</h1>
  } else if (gameState == "done") {
    return <h1>Done!</h1>
  } else {
    return <h1>GAME STATE IS BROKEN WHAT DID YOU DO</h1>;
  }
};

export default App;
