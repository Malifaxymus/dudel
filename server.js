const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const PORT = 3000;

app.use(express.static(path.join(__dirname, "dist")));

io.on("connection", (socket) => {
  console.log("some buddy connected.");

  socket.on("disconnect", () => {
    console.log("some buddy disconnected.");
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
