
class SlingShot {
  constructor(x, y, body) {
    const options = {
      pointA: {
        x: x,
        y: y
      },
      bodyB: body,
      stiffness: 0.02,
      length: 40
    };
    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  }

  fly() {
    this.sling.bodyB = null;
  }

  show() {
    const posA = this.sling.pointA;
    if (this.sling.bodyB) {
      stroke(0);
      strokeWeight(4);
      const posB = this.sling.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
      line(posA.x+40, posA.y, posB.x, posB.y);

    }
    if(posA){
      image(slingShotImg, posA.x-30, posA.y-30, 103, 180);
    }
  }

  attach(body) {
    this.sling.bodyB = body;
  }
}
