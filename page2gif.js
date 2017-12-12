var page = require("webpage").create();

// Page dimensions
var url = "http://localhost:8888/", // URL of your page
    duration = 2000,
    numFrames = 50,
    currentFrame = 0;

page.open(url,function(status) {

  // Update page dimensions
  var wh = page.evaluate(function(){ return [width,height]; });
  page.clipRect = { top: 0, left: 0, width: wh[0], height: wh[1] };
  page.viewportSize = { width: wh[0], height: wh[1] };

  // Start animation
  page.evaluate(function(){ ready(); });

  // Get the first frame right away
  getFrame();

  function getFrame() {
    page.render("/dev/stdout", { format: "png" });

    if (currentFrame > numFrames) {
      return phantom.exit();
    }

    // Get a new frame every ___ milliseconds
    setTimeout(getFrame,duration/numFrames);

  }

});