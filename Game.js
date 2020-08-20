import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Sketch from 'react-p5';
import Matter from 'matter-js';
// import Ground from './ground';


const {Engine, World, Bodies, Mouse, MouseConstraint, Constraint} = Matter;

const styles = {

};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.width = 1000;
    this.height = 600;
    this.world = null;
    this.engine = null;
  }

  render() {
    const {classes} = this.props;

    let y = 0;
    let direction = '^';

    return (
      <div >
        <Sketch
          setup={(p5, parentRef) => {
            p5.createCanvas(this.width, this.height).parent(parentRef);
            this.engine = Engine.create();
            this.world = this.engine.world;
            //this.ground = new Ground(466, this.height - 83, 650, 25);
            //this.ground2 = new Ground(810, this.height - 410, 250, 40);
          }}
          draw={p5 => {
            p5.background(0);
            p5.fill(255, y * 1.3, 0);
            p5.ellipse(p5.width / 2, y, 50);
            if (y > p5.height) direction = '';
            if (y < 0) {
              direction = '^';
            }
            if (direction === '^') y += 8;
            else y -= 4;
          }}
        />
        <iframe src="/index.html"/>
      </div>
    )
  }
}

export default withStyles(styles)(Game);
