require('dotenv').config()
const IP = process.env.IP || "localhost";
const PORT = process.env.PORT || 3001;

const net = require("net");
const stdin = process.stdin;
stdin.setEncoding("utf8");

const client = net.createConnection({
  host: IP,
  port: PORT
});

client.setEncoding("utf8");

client.on("data", (data) => {
  console.log("data came back from server...");
  console.log(data);
});

stdin.on("data", (input) => {
  client.write(input);
});