const db = require("../Models");
const Quiz = db.quizzes;


exports.submitOne = async (r, s) => {

  //Submit 1 Data
  const jobsheet = {
    quizID: r.body.quizID,
    answer: r.body.answer,
  };
  
  try {
    var quiz = await Quiz.findOne({
      where: {
        id: r.body.quizID,
      }
    });

    if (r.body.answer == quiz.key) {
      s.status(200).json({
        "message": "Correct"
      })
    }else {
      s.status(200).json({
        "message": "The Correct Answer Is " + quiz.key
      })
    }
  } catch (e) {
    s.status(500).json({message : e.message});
  }
};


//Submit Semua Data
exports.submitMany = async (r, s) => {
  const jobsheet = {
    quizID: r.body.quizID,
    answer: r.body.answer,
  };

  try {
    let correct = 0;
    let quizTotal = jobsheet.quizID.length;
    for (let i = 0; i < quizTotal; i++) {
      const quiz = await Quiz.findOne({
        limit: 1,
        where: {
          id: jobsheet.quizID[i],
        },
        order: [["ID", "DESC"]],
      });
      if (quiz.key == jobsheet.answer[i]) {
        correct = correct + 1;
      }
    }
    s.status(200).json({
      message: "Correct " + correct + " out of " + quizTotal + " quiz.",
    });
  } catch (e) {
    s.status(500).json({ message: e.message });
  }
};