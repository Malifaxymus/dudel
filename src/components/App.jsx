import React, { useEffect, useState } from "react";
import DrawingPad from "./DrawingPad.jsx";
import GuessingPad from "./GuessingPad.jsx";
import Display from "./Display.jsx";
import data from "../JSON.js";
import io from "socket.io-client";

let socket;

const App = (props) => {
  useEffect(() => {
    socket = io("/");

    socket.on("connect", () => {
      console.log("socket connection established.");
    });

    socket.on("newPlayer", (data) => {
      setPlayers(data);
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
    });

    socket.on("dudel", (data) => {
      setDoodlePrompt(data.prompt);
      setGameState("dudel");
    });

    socket.on("done", (data) => {
      setBook(data.book);
      setGameState("done");
    });

    socket.on("msg", (msg) => {
      setMesssage(msg);
    });
  }, []);

  const sketchData = {
    element: "#sketchpad",
    width: 600,
    height: 600,
  };

  const [username, setUsername] = useState("");
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState("username");
  const [doodlePrompt, setDoodlePrompt] = useState("");
  const [guessData, setGuessData] = useState({});
  const [book, setBook] = useState([]);
  const [message, setMesssage] = useState("Welcome to Dudel!");

  const submitUsername = () => {
    socket.emit("addPlayer", { username });
    setGameState("lobby");
  };

  const submitAllReady = () => {
    socket.emit("allReady", { allReady: true });
  };

  const submitDudel = (dudel) => {
    socket.emit("submit", { username, dudel });
    setGameState("waiting");
  };

  if (gameState == "username") {
    return (
      <div>
        <h1>Dudel</h1>
        <div id="username">
          Please Enter Your Name
          <input onChange={(e) => setUsername(e.target.value)}></input>
          <button onClick={submitUsername}>Submit</button>
        </div>
        <p>{message}</p>
      </div>
    );
  }
  if (gameState == "lobby") {
    return (
      <div>
        <h1>Dudel</h1>
        <div>
          {players.map((x) => {
            return <h2>{x}</h2>;
          })}
        </div>
        <button onClick={submitAllReady}>Start</button>
      </div>
    );
  } else if (gameState == "dudel") {
    return (
      <div>
        <h1>Dudel</h1>
        <h2>{doodlePrompt}</h2>
        <DrawingPad sketchData={sketchData} submitDudel={submitDudel} />
      </div>
    );
  } else if (gameState == "guess") {
    return (
      <div>
        <h1>Dudel</h1>
        <GuessingPad sketchData={guessData} submitDudel={submitDudel} />
      </div>
    );
  } else if (gameState == "waiting") {
    return <h2>Please Wait For Other Players...</h2>;
  } else if (gameState == "done") {
    return <Display data={book} />;
  } else {
    return <h1>GAME STATE IS BROKEN WHAT DID YOU DO</h1>;
  }
};

export default App;
