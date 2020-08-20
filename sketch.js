
const {Engine, World, Bodies, Mouse, MouseConstraint, Constraint} = Matter;

let ground;
let ground2;
const boxes = [];
let bird;
let world, engine;
let mConstraint;
let slingshot;

let dotImg;
let boxImg;
let bkgImg;

const faceRadius = 50;
let boxesLeft = 0;

const booksLevel1 = [];

function preload() {
  // dotImg = loadImage('images/dot.png');
  // Game environment
  bkgImg = loadImage('images/desk2.png');
  slingShotImg = loadImage('images/slingshot.png');

  // Face/memoji
  startImg = loadImage('images/start.png');
  flightImg = loadImage('images/inFlight.png');
  strikeImg = loadImage('images/strike.png');
  thumbsUpImg = loadImage('images/thumbsUp.png');
  thumbsDownImg = loadImage('images/thumbsDown.png');

  // Books
  boxImg = loadImage('images/equals.png');
  bookPythonImg = loadImage('images/books/bookPython.png');
  bookReactImg = loadImage('images/books/bookReact.png');
  bookJsImg = loadImage('images/books/bookJs.png');
  bookPhpImg = loadImage('images/books/bookPHP.png');
  bookScrumImg = loadImage('images/books/bookScrum.png');
  bookSqlImg = loadImage('images/books/bookSql.png');
  bookHtmlImg = loadImage('images/books/bookHtml.png');
  bookCssImg = loadImage('images/books/bookCss.png');
  bookGitImg = loadImage('images/books/bookGit.png');
  bookLinuxImg = loadImage('images/books/bookLinux.png');
  bookMuiImg = loadImage('images/books/bookMaterial.png');

  booksLevel1.push({ x: 550, y: 400, w: 80, h: 100, bookImg: bookCssImg });
  booksLevel1.push({ x: 630, y: 400, w: 80, h: 100, bookImg: bookReactImg });
  booksLevel1.push({ x: 710, y: 400, w: 80, h: 100, bookImg: bookLinuxImg });
  booksLevel1.push({ x: 605, y: 300, w: 80, h: 100, bookImg: bookSqlImg});
  booksLevel1.push({ x: 645, y: 300, w: 80, h: 100, bookImg: bookPhpImg });
  booksLevel1.push({ x: 625, y: 200, w: 80, h: 100, bookImg: bookPythonImg });
  booksLevel1.push({ x: 630, y: 100, w: 80, h: 100, bookImg: bookMuiImg });

  booksLevel1.push({ x: 730, y: 0, w: 80, h: 100, bookImg: bookJsImg });
  booksLevel1.push({ x: 810, y: 0, w: 80, h: 100, bookImg: bookHtmlImg });
  booksLevel1.push({ x: 890, y: 0, w: 80, h: 100, bookImg: bookGitImg });
}

function setup() {
  const canvas = createCanvas(1000, 600);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(466, height - 83, 650, 25);
  ground2 = new Ground(810, height - 410, 250, 40);
  // for (let i = 0; i < 8; i++) {
  //   boxes[i] = new Box(Math.floor(Math.random()*6)*84+350, Math.random()*450 - i*100, 84, 100, bookReactImg);
  // }
  for (let i = 0; i < booksLevel1.length; i++) {
    const book = booksLevel1[i];
    boxes[i] = new Box(book.x, book.y, book.w, book.h, book.bookImg);
  }
  bird = new Bird(150, 300, faceRadius);

  slingshot = new SlingShot(200, 359, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  };

  // A fix for HiDPI displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

  Matter.Events.on(engine, 'collisionStart', function (event) {
    //Circle Body
    if (bird.status == 'flight') {
      bird.status = 'strike';
      setTimeout(() => {
        if (boxes.length < boxesLeft) {
          bird.status = 'thumbsUp';
        } else {
          bird.status = 'thumbsDown';
        }
      }, 750);
    }
  });
  // Reload instructions
  text('word', 10, 90);
}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(150, 300, faceRadius);
    slingshot.attach(bird.body);
    boxesLeft = boxes.length;
  }
}

function mouseReleased(event) {
  const distance = bird.body.circleRadius;
  // Check that mouse is over the bird/face
  if (Math.abs(bird.body.position.x - event.clientX) < distance &&
    Math.abs(bird.body.position.y - event.clientY) < distance) {
    setTimeout(() => {
      slingshot.fly();
      bird.status = 'flight';
    }, 100);
  }
}

function draw() {
  background(bkgImg);
  Matter.Engine.update(engine);
  ground.show();
  ground2.show();
  for (var i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    if (box.body.position.y > height) {
      Matter.World.remove(world, box.body);
      boxes.splice(i, 1);
      // late fallen box, change status to thumbs up
      bird.status = 'thumbsUp';
      continue;
    } else {
      box.show();
    }
  }

  slingshot.show();
  bird.show();

  // Adding text
  textSize(24);
  textStyle(NORMAL);
  strokeWeight(1);
  textFont('Comic Sans MS');

  // Title
  text('"Hit the books" they say...', 360, 25);
  // Reload instructions
  textSize(20);
  text('Press Space Bar to reload', 300, 580);

}
