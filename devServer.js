// Import all the needed requirements.
var Bundler = require('parcel-bundler');
var express = require('express');
var fs = require('fs');
var mime = require('mime-types');

// Defines the express app.
var app = express();

// Set the parcel options.
var options = {
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
      var files = {};
      var bundler = new Bundler(fp, options);
      bundler.on("buildError", err => console.error(err));
      bundler.on("bundled", bundle => {
        files = {};
        var pop = bundle.name.split('/').pop();
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
      });
      bundler.bundle();
    });
  }

  // Goes through each promise inner and run it one by one.
  function runPromise() {
    const i = promises.pop();
    if (!i) {
      console.log("Initial builds done!");
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

// Listens to all of the routes.
createBundlerRoute([`${__dirname}/client/infragram.js`, `${__dirname}/client/styles/style.styl`]);
app.get("/", (...args) => args[1].sendFile(`${__dirname}/index.html`));

// Listen on port 7770.
app.listen(7770);
console.log("Serving on port http://127.0.0.1:7770/.");
