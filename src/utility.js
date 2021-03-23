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

  joinQueue: (client, queue, priority = false) => {
    client.status = "queue";
    if (priority) {
      queue.unshift(client);
    } else {
      queue.push(client);
    }
    const num = queue.length;
    let res = cyan("Joining queue...");
    res += cyan(`\nPosition in queue: ${num}`);
    client.write(res);
    console.log(`Client ${client.gameID} joined the queue. (#${num})`);
  },

  promptReady: (p1, p2, queue) => {
    p1.status = "unready";
    p2.status = "unready";

    const res = yellow(`Match found! Enter "${green("READY")}" within 15 seconds to play.`);

    p1.write(res);
    p2.write(res);

    p1.opponent = p2;
    p2.opponent = p1;

    // Assign a timeout to player 1
    p1.countdown = setTimeout(() => {
      // If both players are ready, start game
      if (p1.status === "ready" && p2.status === "ready") {
        msg.gameStarting(p1, p2);
      } else if (p1.status === "ready" && p2.status !== "ready") {
        msg.opponentTimedOut(p1, queue);
        msg.userTimedOut(p2);
      } else if (p1.status !== "ready" && p2.status === "ready") {
        msg.opponentTimedOut(p2, queue);
        msg.userTimedOut(p1);
      } else if (p1.status !== "ready" && p2.status !== "ready") {
        msg.userTimedOut(p1);
        msg.userTimedOut(p2);
      }
    }, 15000);
  },

  userTimedOut: (client) => {
    clearTimeout(client.countdown);
    let res = red("Timed out. Returning to lobby...");
    client.write(res);
    msg.promptPlay(client);
  },
  
  opponentTimedOut: (client, queue) => {
    clearTimeout(client.countdown);
    client.opponent = null;
    let res = red("Opponent timed out.");
    client.write(res);
    msg.joinQueue(client, queue, true);
  },

  gameStarting: (p1, p2) => {
    p1.status = "playing";
    p2.status = "playing";
    let res = magenta(`Game starting soon... (${p1.gameID} vs. ${p2.gameID})`);
    p1.write(res);
    p2.write(res);
  }

};


module.exports = { msg, createUser };