// Import all the needed requirements.
const Bundler = require('parcel-bundler');
const express = require('express');
const fs = require('fs');
const mime = require('mime-types');

// Defines the express app.
const app = express();

// Defines the express websocket handler.
require('express-ws')(app);

// Defines all connected websockets.
const connectedWebsockets = [];

// Set the parcel options.
const options = {
  production: false,
  outDir: `${__dirname}/dist`,
  contentHash: false,
  watch: true,
};

// Handles bundling.
function createBundlerRoute(fps) {
  // Create the inner of the promises.
  const promises = [];
  for (const x of fps) {
    const fp = x;
    promises.push(promiseRes => {
      let files = {};
      let bundler = new Bundler(fp, options);
      bundler.on("buildError", err => console.error(err));
      bundler.on("bundled", bundle => {
        files = {};
        let pop = bundle.name.split('/').pop();
        files[pop] = fs.readFileSync(bundle.name);
        try {
          files[`${pop}.map`] = fs.readFileSync(`${bundle.name}.map`);
        } catch (_) {
          // No map found!
        }
        promiseRes((req, res, next) => {
          const filename = req.path.substr(1);
          const f = files[filename];
          if (f) {
            res.header("Content-Type", mime.lookup(filename));
            res.send(f);
            return;
          }
          next();
        });
        for (const ws of connectedWebsockets) ws.send("r");
      });
      bundler.bundle();
    });
  }

  // Goes through each promise inner and run it one by one.
  function runPromise() {
    const i = promises.pop();
    if (!i) {
      app.listen(7770);
      console.log("Serving on port http://127.0.0.1:7770/.");
      return;
    };
    const promise = new Promise(i);
    promise.then(res => {      
      app.use(res);
      runPromise();
    });
  }
  runPromise();
}

// Listens to the index route.
app.get("/", (...args) => {
  // Open the file.
  let index = fs.readFileSync(`${__dirname}/index.html`).toString();

  // Replace "</body>" with "<script> *reloader script here* </script></body>"
  index = index.replace("</body>", `<script>${fs.readFileSync(`${__dirname}/build/dev_reloader.js`).toString()}</script></body>`);

  // Send the index.
  args[1].header("Content-Type", "text/html");
  args[1].send(index);
});

// Handle reloading.
app.ws("/_reload", ws => {
  // Push to the websocket arrays.
  connectedWebsockets.push(ws);

  // Handle a ping message.
  ws.on("message", msg => ws.send(msg));

  // Handle the socket closing.
  ws.on("close", () => connectedWebsockets.splice(connectedWebsockets.indexOf(ws), 1));
});

// Handles bundled stuff.
createBundlerRoute([`${__dirname}/client/infragram.js`, `${__dirname}/client/styles/style.scss`]);
