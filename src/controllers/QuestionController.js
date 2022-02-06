const db = require("../db/config");

module.exports = {
  async index(req, res) {
    const database = await db();
    const roomId = req.params.room;
    const questionId = req.params.question;
    const action = req.params.action;
    const password = req.body.password;

    // console.log(roomId, questionId, action, password)

    const verifyRoom = await database.get(
      `select * from rooms where id = ${roomId}`
    );

    if (verifyRoom.pass == password) {
      if (action == "delete") {
        await database.run(`delete from questions where id = ${questionId}`);
        // console.log('delete')
      } else if (action == "check") {
        await database.run(
          `update questions set readed = 1 where id = ${questionId}`
        );
        // console.log('check')
      }
      res.redirect(`/room/${roomId}`);
    } else {
      res.render("passincorrect", { roomId: roomId });
    }
  },

  async create(req, res) {
    const database = await db();

    const question = req.body.question;
    const roomId = parseInt(req.params.room);

    await database.run(
      `INSERT INTO questions (question, readed, room) VALUES ("${question}", 0, ${roomId})`
    );

    await database.close();

    res.redirect(`/room/${roomId}`);
  },
};
