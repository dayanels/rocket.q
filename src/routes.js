const express = require("express");
const res = require("express/lib/response");
const routes = express.Router();
const questionController = require("./controllers/QuestionController");
const roomController = require("./controllers/RoomController");

routes.get("/", (request, response) => {
  response.render("index", { page: "enter-room" });
});

routes.get("/room/:room", roomController.open);

routes.post("/enter-room", roomController.enter)


routes.get("/create-pass", (request, response) => {
  response.render("index", { page: "create-pass" });
});

routes.post("/create-room", roomController.create);


routes.post("/question/create/:room", questionController.create)
routes.post("/question/:room/:question/:action", questionController.index);




module.exports = routes;