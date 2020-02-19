// Reloader for in the dev enviroment.
(function() { const u = new URL(window.location.href); const ws = new WebSocket(`${u.protocol === "http:" ? "ws" : "wss"}://${u.host}/_reload`); setInterval(() => ws.send("p"), 1000); ws.addEventListener("message", m => { if (m.data === "r") window.location.reload(); })}());
