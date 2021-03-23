const net = require('net');
const server = net.createServer();

const users = [];

// Event Listeners
server.on('connection', (client) => {
  client.write("Connection established.");
  users.push(client);

  // Incoming data from client
  client.on('data', (clientData) => {
    client.write("message received:", clientData);
  });

  // Client closed connection
  client.on('close', () => {
    console.log("Client disconnected");
    users.splice(users.indexOf(client), 1);
  });
});

// Server can run only on a specific port
// Only one server per port
server.listen(8080, () => {
  console.log("Server listening on port 8080");
});