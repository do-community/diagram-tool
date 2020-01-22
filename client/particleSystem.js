class Particle {

  constructor() {
    console.log('constructor');
    this.progress = 0;
    this.waiting_for_response = false;
    this.loc = [0,0];
  }
  kill() {
    return this.height * this.width;
  }
};

class Node {
  constructor(loc, behavior, connections) {
    this.progress = 0;
    this.waiting_for_response = false;
    this.loc = [0,0];
  }
  get handoff() {
    return this.calcArea();
  }
};

const particleSystem = {
  canvas: document.getElementById("ParticleCanvas"),
  context: document.getElementById("ParticleCanvas").getContext(),
  nodes: [],
  render: function() {
    this.owners.map((o) => {
      o.particles.map((p) => {
        if(!p.waiting_for_response){
          if(p.progress >= 1) {
            p.waiting_for_response = true;
            o.handoff(p);
          } else {
            p.progress += 0.05;
            p.location
          }
        }

      });
    });
  },
  add: function(to_key) {
    
  }
};

window.particleRender = window.setInterval(particleSystem.render, 50);

export default particleSystem;