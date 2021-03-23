const { red, green, yellow, blue, magenta, cyan } = require("chalk");

const generateID = () => {
  return Math.floor(Math.random() * (9999 - 1001)) + 1000;
};

const createUser = (client, users) => {
  // Create a new client object with a unique ID
  let id = generateID();
  while (Object.keys(users).includes(id)) {
    id = generateID();
  }
  client.gameID = id;
  client.status = "lobby";

  return client;
};

const msg = {
  
  greet: (client, players) => {
    let res = cyan(`Welcome to Battleship! Players online: ${players}`);
    client.write(res);

    console.log(green(`Client #${client.gameID} connected. Players online: ${players}`));
  },

  promptPlay: (client) => {
    client.status = "lobby";
    let res = yellow(`\nEnter "${green("PLAY")}" to join the queue.`);
    client.write(res);
  },

  joinQueue: (client, queue) => {
    client.status = "queue";
    const num = queue.length;
    let res = cyan("Joining queue...");
    res += cyan(`\nPosition in queue: ${num}`);
    client.write(res);
    console.log(`Client ${client.gameID} joined the queue. (#${num})`);
  },

  promptReady: (p1, p2) => {
    p1.status = "unready";
    p2.status = "unready";

    const res = yellow(`Match found! Enter "${green("READY")}" within 15 seconds to play.`);

    p1.write(res);
    p2.write(res);

    p1.opponent = p2;
    p2.opponent = p1;

    // Assign the timeout to player 1
    p1.countdown = setTimeout(() => {
      if (p1.status !== "ready") {
        msg.timedOut(p1);
        if (p2.status === "ready") {
          msg.opponentTimedOut(p2);
        }
      }
      if (p2.status !== "ready") {
        msg.timedOut(p2);
        if (p1.status === "ready") {
          msg.opponentTimedOut(p1);
        }
      }

      // If both players are ready, start game
      if (p1.status === "ready" && p2.status === "ready") {
        msg.gameStarting(p1, p2);
      }
    }, 8000);
  },

  userTimedOut: (client) => {
    let res = red("Timed out. Returning to lobby...");
    client.write(res);
    msg.promptPlay(client);
  },
  
  opponentTimedOut: (client) => {
    client.opponent = null;
    let res = red("Opponent timed out.");
    client.write(res);
  },

  gameStarting: (p1, p2) => {
    p1.status = "playing";
    p2.status = "playing";
    let res = magenta("GAME STARTING!!!!");
    p1.write(res);
    p2.write(res);
  }

};


module.exports = { msg, createUser };