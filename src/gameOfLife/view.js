import {CELL_SIZE, GAME_SIZE} from "./constants";

document.getElementById("size").value = GAME_SIZE
document.getElementById("size").min = 9;

export const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
document.getElementById("grid").appendChild(canvas);

const drawCell = (x, y, value) => {
  context.fillStyle = value;
  context.fillRect(x + CELL_SIZE * x, y + CELL_SIZE * y, CELL_SIZE, CELL_SIZE);
};

export const initView = (size) => {
  canvas.setAttribute("height", size * (CELL_SIZE + 1) - 1);
  canvas.setAttribute("width", size * (CELL_SIZE + 1) - 1);
};

export const drawGame = model => {
  model.state.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      drawCell(rowIndex, columnIndex, value);
    });
  });
};
