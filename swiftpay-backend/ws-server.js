const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
  });
});

function broadcast(data) {
  const msg = JSON.stringify(data);

  clients.forEach(ws => {
    if (ws.readyState === 1) {
      ws.send(msg);
    }
  });
}

module.exports = { broadcast };
