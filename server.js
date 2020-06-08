const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const PORT = 3000;

app.use(express.static(path.join(__dirname, "dist")));

// ******* GAME STATE *******
const STATE = {
  notebooks: [],
  isActiveGame: false,
};

// ******* EVENTS *******
io.on("connection", (socket) => {
  console.log("some buddy connected.");

  socket.on("disconnect", () => {
    console.log("some buddy disconnected.");
  });

  socket.on("testyBoi", () => {
    console.log("a testy boi was emitted.");
  });

  socket.on("anotherTest", () => {
    console.log("another test was emitted.");
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
