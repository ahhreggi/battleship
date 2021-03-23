require('dotenv').config();
const { msg, createUser, getNext } = require("./utility");
const { red, green, yellow, blue, magenta, cyan } = require("chalk");

const PORT = process.env.PORT || 3001;

const net = require("net");
const server = net.createServer();

const users = {};
const queue = [];
let online = 0;

// Event Listeners
server.on("connection", (client) => {
  client.setEncoding("utf8");
  
  // Create a new user & log
  const newUser = createUser(client, users);
  users[newUser.gameID] = newUser;
  online += 1;

  msg.greet(client, online);

  msg.promptPlay(client, online);

  // Process user input
  client.on("data", (data) => {
    const input = data.trim();

    // testing
    if (input === "status") {
      console.log(client.status);
    } else if (input === "queue") {
      console.log(queue.map(u => u.gameID));
    } else if (input === "online") {
      console.log(online);
    }

    // Add player to queue if they're in the lobby
    if (input === "play" && client.status === "lobby") {
      msg.joinQueue(client, queue);

      // If there are 2+ people in queue, remove the next 2 players from queue and prompt them to ready up
      if (queue.length > 1) {
        getNext(queue);
      }

      // Ready up player if they're waiting to start
    } else if (input === "ready" && client.status === "unready") {
      client.status = "ready";
      client.write(cyan("Waiting for game to start..."));
    }

    // give priority queue status on opponent time out?
 
  });

  client.on("end", () => {

    // Clear any timeouts
    clearTimeout(client.countdown);
    // If a client has an opponent waiting, notify them
    const opponent = client.opponent;
    // TODO: if user is playing
    if (opponent && ["unready", "ready", "playing"].includes(opponent.status)) {
      msg.opponentTimedOut(opponent, queue);
    }

    const id = client.gameID;
    delete users[id];
    if (queue.includes(client)) {
      queue.splice(queue.indexOf(client), 1);
    }
    console.log(red(`Client #${id} disconnected.`));
    online -= 1;
  });
});

// Server can run only on a specific port
// Only one server per port
server.listen(PORT, () => {
  console.log(cyan(`Battleship server is online on port ${PORT}`));
});