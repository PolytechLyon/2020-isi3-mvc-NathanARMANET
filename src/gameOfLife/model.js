import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL,
  CELL_SIZE
} from "./constants";

export class Model {
  constructor(callback) {
    this.callback = callback;
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });

    this.updated();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {
        let change = false;
        let newState = Array.from(new Array(this.height), () =>
            Array.from(new Array(this.width), () => CELL_STATES.NONE)
        );

        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            const isAlive = this.isCellAlive(i, j);

            // TODO implement Game of life logic
            if ((!isAlive && nbAlive === 3) || (isAlive && (nbAlive === 2 || nbAlive === 3))) {
              newState[i][j] = CELL_STATES.ALIVE;
            } else if (!isAlive && this.state[i][j] === CELL_STATES.NONE) {
              newState[i][j] = CELL_STATES.NONE;
            } else {
              newState[i][j] = CELL_STATES.DEAD;
            }

            if (this.state[i][j] !== newState[i][j]) {
              change = true;
            }
          }
        }

        this.state = newState;
        this.updated();

        if (change) {
          this.run(currentTime);
        } else {
          this.stop();
        }
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    // TODO

    this.stop();
    this.init();
    this.updated();
  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.width &&
      x < this.height &&
      this.state[x][y] === CELL_STATES.ALIVE ? 1 : 0;
  }

  aliveNeighbours(x, y) {
    let number = 0;
    // TODO

    // On implémente la version torique :
    // le haut et le bas sont liés
    // la droite et l gauche sont liés
    for (let k = -1 ; k < 2 ; k++) {
      for (let l = -1 ; l < 2 ; l++) {
        if ((k !== 0 || l !== 0) && this.isCellAlive((x+k+this.height)%this.height, (y+l+this.width)%this.width)) {
          number++;
        }
      }
    }

    return number;
  }

  updated() {
    // TODO update the view
    this.callback(this);
  }

  updateCell(e, MinX, MinY) {
    var gridX = Math.floor((e.x - MinX) / (CELL_SIZE+1));
    var gridY = Math.floor((e.y - MinY) / (CELL_SIZE+1));
    console.log(gridX, gridY);

    var xy = this.state[gridX][gridY];
    if (xy === CELL_STATES.ALIVE) {
      this.state[gridX][gridY] = CELL_STATES.DEAD;
      console.log("CELL_STATES.DEAD");
    } else if (xy === CELL_STATES.DEAD) {
      this.state[gridX][gridY] = CELL_STATES.NONE;
      console.log("CELL_STATES.NONE");
    } else {
      this.state[gridX][gridY] = CELL_STATES.ALIVE;
      console.log("CELL_STATES.ALIVE");
    }

    this.updated()
  }
}
