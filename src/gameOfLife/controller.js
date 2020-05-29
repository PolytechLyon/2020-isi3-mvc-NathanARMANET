import {canvas, drawGame, initView} from "./view";
import {GAME_SIZE} from "./constants";

export const controller = model => {

  document.getElementById('size').addEventListener("click", () => {
    let size = document.getElementById("size").valueAsNumber;
    initView(size);
    model.height = size;
    model.width = size;
    model.init();
    drawGame(model);
  })

  document.getElementById('start').addEventListener("click", () => {
    model.run();
  })

  document.getElementById('stop').addEventListener("click", () => {
    model.stop();
  })

  document.getElementById('reset').addEventListener("click", () => {
    model.reset();
  })

  canvas.addEventListener('click', (event) => {
    model.updateCell(event, canvas.offsetLeft, canvas.offsetTop)
  })
};
