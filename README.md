# dudel

Dudel is a websocket based application that allows a theoretical endless number of users to play a web version of the game popular board game telestrations.

Each player begins by sketching a word given to them at the start of the game. Once the players are done drawing, they all at the same time, pass their sketch to the next player, who must guess what's been drawn. Players then simultaneously pass their guess -- which hopefully matches the original word (or does it??) -- to the next player who must try to draw the word they see -- and so on.

Dudel utilizes Websocket.io to create a persistent connection between players and the server. The server must manage multiple game-states simultaneously, and once every player has turned in their drawing/guess, the server passes it to the next player. Once a full rotation has been made, the entire history of the player's drawing is displayed to them.

This has been tested on an AWS T2 Micro instance and works flawlessly.
