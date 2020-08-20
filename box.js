
class Box {
  constructor(x, y, w, h, img) {
    const options = {
      restitution: 0.5,
      //inverseMass: 1,
      //mass: -0.5
      stiffness: 1,
    };
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    this.img = img;

    Matter.World.add(world, this.body);
    this.w = w;
    this.h = h;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255);
    rectMode(CENTER);
    // strokeWeight(2);
    // stroke(51);
    // rect(0, 0, 84, 100);
    imageMode(CENTER);
    // textAlign(CENTER, CENTER);
    // text('React', 0, 0);
    image(this.img, 0, 0, this.w, this.h);
    pop();
  }
}
