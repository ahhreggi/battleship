const prompt = (client, message) => {
  client.write(message + "\n");
}

module.exports = { prompt };