import "./style.css";
import { initView, drawGame } from "./gameOfLife/view";
import { Model } from "./gameOfLife/model";
import { controller } from "./gameOfLife/controller.js";
import {GAME_SIZE} from "./gameOfLife/constants";

initView(GAME_SIZE, GAME_SIZE);

const model = new Model(drawGame);
model.init();

drawGame(model);
controller(model);
