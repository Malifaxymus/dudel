const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const PORT = 3000;

app.use(express.static(path.join(__dirname, "dist")));

// ******* GAME STATE *******
const STATE = {
  isActiveGame: false,
};

const players = {};
const getPlayerList = () => {
  return Object.keys(players);
};

// ******* EVENTS *******
io.on("connection", (socket) => {
  console.log("some buddy connected.");

  socket.on("disconnect", () => {
    console.log("some buddy disconnected.");
  });

  // give us an external reference to the socket by associating its native ID with a username
  socket.on("addPlayer", (data) => {
    players[data.username] = {
      socket: socket.id,
    };
    console.log(`player added. All players: ${getPlayerList()}`);
  });

  socket.on("allReady", (data) => {
    if (STATE.isActiveGame) {
      //prevent late-joining players from clicking "ready to start" and breaking game
      return;
    }
    STATE.isActiveGame = true;
    io.sockets.emit("startGame", { msg: "starting game!" });
  });
});

//proof of concept for accessing a specific player socket outside the context of connection fn. Every 10 sec, gets the socket ID of the first player in the list and sends a message to just that player (console logged on client side)
setInterval(() => {
  let playerList = getPlayerList();
  if (playerList.length) {
    let firstPlayer = playerList[0];
    let socket = players[firstPlayer].socket;
    if (socket) {
      io.sockets.connected[socket].emit("test", "hey player 1");
    }
  }
}, 10000);

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
