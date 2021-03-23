const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const net = require("net");
const stdin = process.stdin;
stdin.setEncoding("utf8");

const client = net.createConnection({
  host: process.env.IP || "localhost",
  port: process.env.PORT || 3001
});

client.setEncoding("utf8");

client.on("data", (data) => {
  console.log("data came back from server...");
  console.log(data);
});

stdin.on("data", (input) => {
  client.write(input);
});