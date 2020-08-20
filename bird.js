
class Bird {
  constructor(x, y, r) {
    const options = {
      restitution: 0.5
    };
    this.body = Matter.Bodies.circle(x, y, r, options);
    Matter.Body.setMass(this.body, this.body.mass * 1);
    Matter.World.add(world, this.body);
    this.r = r;
    this.status = 'start';
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    let img = startImg;
    switch(this.status) {
      case 'flight':
        img = flightImg;
        break;
      case 'strike':
        img = strikeImg;
        break;
      case 'thumbsUp':
        img = thumbsUpImg;
        break;
      case 'thumbsDown':
        img = thumbsDownImg;
        break;
      default:
        img = startImg;
    }
    image(img, 0, 0, this.r * 2, this.r * 2);
    pop();
  }
}
