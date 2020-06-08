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

let head = null;
const players = {};
const getPlayerList = () => {
  return Object.keys(players);
};

let usedPrompts = ['default'];
generatePrompt = () => {
  const prompts = ['Green Thumb','Rotten Apple','Nightmare','Reality TV Show','Dynamite','Gymnast','Flying Squirrel','Garden','Race Horse','Fish Out Of Water','Ballpark','Drumstick','Rain Forest','Foot Long Hot Dog','In the Dog House','Wristwatch','Ox','Scorpion','Thinking Cap','Iceberg Lettuce','Toxic Waste','Doctor','Mad Cow','Corn Bread','Venus Flytrap','Bearded Lady','Elevator Music','Haunted House','Scuba Diver','Cinderella','Big Cheese','False Teeth','High Jump','Sheriff','Drive-In Movie','Gravy Train','Roommate','Kilt','Babysitter','Wine Celler','Oriental Rug','Hot Dogs','Soccer Field','Pain Killer','Pantry','5-O\'Clock Shadow','Butler','Orbit','Toss The Bouquet','Flash Flood','Cul-De-Sac'];

  let prompt = 'default';
  while (usedPrompts.includes(prompt)) {
    prompt = prompts[Math.floor(Math.random() * prompts.length)]
  }
  usedPrompts.push(prompt)
  return prompt
}

// ******* EVENTS *******
io.on("connection", (socket) => {
  console.log("some buddy connected.");

  socket.on("disconnect", () => {
    console.log("some buddy disconnected.");
  });

  // give us an external reference to the socket by associating its native ID with a username
  socket.on("addPlayer", (data) => {
    let newPlayer = players[data.username] = {
      socket: socket.id,
      next: players[getPlayerList()[0]],
      book: [generatePrompt()],
    };
    if (head) head.next = newPlayer;
    head = newPlayer;

    console.log(head)
    console.log(`player added. All players: ${getPlayerList()}`);
  });

  socket.on("allReady", (data) => {
    if (STATE.isActiveGame) {
      //prevent late-joining players from clicking "ready to start" and breaking game
      return;
    }
    STATE.isActiveGame = true;
    const playerList = getPlayerList()

    playerList.forEach(player => {
      player = players[player]
      io.sockets.connected[player.socket].emit("startGame", {prompt: player.book.pop()})
    })
    //io.sockets.emit("startGame", { msg: "starting game!" });
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
