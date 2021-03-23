require('dotenv').config();
const PORT = process.env.PORT || 3001;

const net = require("net");
const server = net.createServer();

const users = {};
const queue = [];

// Event Listeners
server.on("connection", (client) => {
  client.setEncoding("utf8");
  
  // Create a new client object with a unique ID
  let id = Math.floor(Math.random() * (9999 - 1001)) + 1000;
  while (Object.keys(users).includes(id)) {
    id = Math.floor(Math.random() * (9999 - 1001)) + 1000;
  }
  
  client.gameID = id;
  
  users[id] = client;
  
  const players = queue.length;
  console.log(`Client #${client.gameID} connected. Players online: ${players}`);

  const welcome = `Welcome to Battleship! Players online: ${players}\nEnter "play" to join the queue.`;
  client.write(welcome);

  client.on("data", (data) => {
    const userInput = data.trim();
    if (userInput === "play") {
      client.write("Joining queue...");
      queue.push(id);
      client.write("Waiting for an opponent...\n")
      if (queue.length > 1) {
        const opponent = users[queue[0]];
        opponent.write("Found an opponent!\n")
        client.write("Found an opponent!\n");
      }
    } else {
      client.write("Invalid input.");
    }
  });

  client.on("end", () => {
    const id = client.gameID;
    delete users[id]
    if (queue.includes(id)) {
      queue.splice(queue.indexOf(id), 1);
    }
    console.log(`Client #${id} disconnected.`);
  });
});

// Server can run only on a specific port
// Only one server per port
server.listen(PORT, () => {
  console.log(`Battleship server is online on port ${PORT}`);
});