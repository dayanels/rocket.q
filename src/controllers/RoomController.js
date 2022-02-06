const db = require("../db/config");

module.exports = {
  async create(req, res) {
    const database = await db();

    const pass = req.body.password;

    let roomId = Math.floor(Math.random() * 10).toString();
    let isRoom = true;

    while (isRoom) {
      for (let i = 0; i < 5; i++) {
        roomId += Math.floor(Math.random() * 10).toString();
      }

      roomId = Number(roomId);

      const roomsExistIds = await database.all(`SELECT id FROM rooms`);

      isRoom = roomsExistIds.some((roomExistId) => roomExistId === roomId);

      if (!isRoom) {
        await database.run(
          `INSERT INTO rooms (id, pass) VALUES (${roomId}, ${pass})`
        );
      }
    }

    await database.close();

    res.redirect(`/room/${roomId}`);
  },

  async open(req, res) {
    const database = await db();
    const roomId = req.params.room;
    let existNoQuestions = false;

    

    const questions = await database.all(
      `select * from questions where room = ${roomId} and readed = 0`
    );
    const questionsReaded = await database.all(
      `select * from questions where room = ${roomId} and readed = 1`
    );

    if(questions.length == 0){
      if(questionsReaded.length == 0){
        existNoQuestions = true;
      }
    }

    res.render("room", {
      roomId: roomId,
      questions: questions,
      questionsReaded: questionsReaded,
      existNoQuestions: existNoQuestions
    });
  },

  enter(req, res) {
    const roomId = req.body.roomId;

    res.redirect(`/room/${roomId}`)
  },
};
