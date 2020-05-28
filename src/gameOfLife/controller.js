import {canvas} from "./view";

export const controller = model => {

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
