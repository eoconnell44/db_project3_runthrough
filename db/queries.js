var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')();
var connString = process.env.DATABASE_URL;
var db = pgp(connString);
var cors = require('cors');


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//////////// C.R.U.D Functionality////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

//////////////Create/////////////////
////////////////////////////////////
//////////////////////////////////
// db.task(t => {
//   var subject_id = parseInt(req.params.subject_id)
//   var topic_id = parseInt(req.params.topic_id)
//   var date_added = (req.params.date_added)
//   var q1 = t.one('SELECT * FROM subjects WHERE subject_id=$1',[subject_id])
//   var q2 = t.any('SELECT * FROM questions WHERE topic_id=$1 ORDER BY date_added DESC',[subject_id])
//   var q3 = t.any('SELECT * FROM answers WHERE topic_id=$1 ORDER BY date_added DESC',[subject_id])
//   var dbArray = [q1,q2,q3]
//   return t.batch([...dbArray]);
// })

//router.post('/questions',db.createQuestion);
createQuestion = (req,res,next) => {
  db.one("INSERT INTO questions(question, qtopic_id, question_sub)" +
"values(${question}, ${qtopic_id}, ${question_sub})", req.body)
// db.task(t => {
//   var q1 = t.none('INSERT INTO questions(question, qtopic_id)' + "values(${question}, ${qtopic_id})", req.body)
//   var q2 = t.none('INSERT INTO answers(aquestion_id,atopic_id)' + "values(${aquestion_id}, ${atopic_id})",req.body)
//   t.batch([q1,q2])
// })
.then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        message: 'Inserted one question'
      });
  })
  .catch(function (err) {
    return next(err);
  });
};

createAnswer = (req,res,next) => {
  db.none("INSERT INTO answers(answer, aquestion_id)" +
  "values(${answer}, ${aquestion_id}")
  .then(function (data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Inserted one answer'
    });
  })
  .catch(function(err){
    return next(err);
  });
}



// //////////Read////////////
/////////////////////////////
////////////////////////////

getALlQuestionsBySubject = (req,res,next) => {
  var question_sub = req.params.question_sub
  console.log('Whats this showing', req.params.question_sub);
  db.any('SELECT * FROM questions WHERE question_sub=$1',[question_sub])
  .then(data => {
    res.status(200)
    .json({
      status:'success',
      data: data
    });
  })
  .catch(function(err){
    return next(err);
  })

}

getAllQuestionsWithAnswers= (req,res,next) => {


  // var qtopic_id = parseInt(req.params.qtopic_id)
  db.any('DROP VIEW IF EXISTS compiled; CREATE VIEW compiled AS SELECT * FROM questions, answers WHERE (questions.qquestion_id = answers.aquestion_id); SELECT * FROM compiled')
  // 'SELECT * FROM questions; SELECT * FROM answers; JOIN answers ON questions.qquestion_id = answers.aquestion_id WHERE qtopic_id=$1'
  .then(data => {
    console.log('This is data ======>',data);
    res.status(200)
    .json({
      status: 'success',
      data: data
      // subject: data[0],
      // questions: data[1],
      // answers: data[2],
    });
  })
  .catch(function(err){
    return next(err);
  })
};
//router.get('/QA/:question_sub' ,db.getAllQuestionsWithAnswersBySubject);
getAllQuestionsWithAnswersBySubject= (req,res,next) => {
  var question_sub = req.params.question_sub
  // var subject_id= parseInt(req.params.subject_id)
  // var q1 = db.none('DROP VIEW IF EXISTS compiled; CREATE VIEW compiled AS SELECT * FROM questions, answers WHERE questions.qquestion_id = answers.aquestion_id')
  // var q2 = db.any('SELECT * FROM compiled WHERE qtopic_id=$1',[subject_id])
  // return t.batch([q2,q1]);

  // })
  db.any('SELECT * FROM questions JOIN answers ON questions.qquestion_id = answers.aquestion_id WHERE question_sub=$1',[question_sub])
  .then(data => {
    console.log('This is data ======>',data);

    res.status(200)
    .json({
      data: data
    });
  })
  .catch(function(err){
    return next(err);
  })
};

const findAnswers = (req, res, next) =>{
  return db.any('SELECT * FROM answers JOIN questions ON answers.aquestion_id = questions.qquestion_id WHERE aquestion_id=$1', [req.params.qquestion_id]).then((data) =>{
    res.json(data)
  }).catch((error) =>{
    console.log('answers error: ', error)
  })
}

getOneQuestionWithAnswersBySubject = (req,res,next) => {
  db.task(t => {
    // var subject_id = parseInt(req.params.subject_id)
    var subject_id = parseInt(req.params.subject_id)
    // var topic_id = parseInt(req.params.topic_id)
    // var date_added = (req.params.date_added)
    // var q1 = t.one('SELECT * FROM subjects WHERE subject_id=$1',[subject_id])
    var q2 = t.any('SELECT * FROM questions WHERE qquestion_id=$1',[subject_id])
    var q3 = t.any('SELECT * FROM answers WHERE aquestion_id=$1',[subject_id])
    return t.batch([q2,q3]);
  })
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      // subject: data[0],
      question: data[0],
      answer: data[1],
    });
  })
  .catch(function(err){
    return next(err);
  })
};

getAllDocumentation = (req,res,next) => {
  db.any('SELECT * FROM documentation')
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Success in querying all documentation'
    });
  })
  .catch(function(err){
    return next(err);
  });
};

getAllJavaScriptDocumentation = (req,res,next) => {
  db.any('SELECT * FROM documentation WHERE main_tag=1')
    .then(function(data){
      res.status(200)
      .json({
        status:'success',
        data: data,
        message: 'Success in querying all javascript documentation'
      });
    })
    .catch(function(err){
      return next(err);
    });
};

getAllNodeDocumentation = (req,res,next) => {
  db.any('SELECT * FROM documentation WHERE main_tag=4')
    .then(function(data){
      res.status(200)
      .json({
        status:'success',
        data: data,
        message: 'Success in querying all node documentation'
      });
    })
    .catch(function(err){
      return next(err);
    });
};

getAllExpressDocumentation = (req,res,next) => {
  db.any('SELECT * FROM documentation WHERE main_tag=2')
    .then(function(data){
      res.status(200)
      .json({
        status:'success',
        data: data,
        message: 'Success in querying all express documentation'
      });
    })
    .catch(function(err){
      return next(err);
    });
};

getAllReactDocumentation = (req,res,next) => {
  db.any('SELECT * FROM documentation WHERE main_tag=3')
    .then(function(data){
      res.status(200)
      .json({
        status:'success',
        data: data,
        message: 'Success in querying all react documentation'
      });
    })
    .catch(function(err){
      return next(err);
    });
};

getAllQuestions = (req,res,next) => {
  db.any('SELECT * FROM questions')
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Success in querying all questions'
    });
  })
  .catch(function(err){
    return next(err);
  });
};

getOneQuestion = (req,res,next) => {
  var qquestion_id = parseInt(req.params.qquestion_id);
  db.one('SELECT * FROM questions WHERE qquestion_id=$1', qquestion_id)
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'success in querying one question'
    });
  })
  .catch(function(err){
    return next(err);
  });
};

getAllAnswers = (req,res,next) => {
  db.any('SELECT * FROM answers')
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Success in querying all answers'
    });
  })
  .catch(function(err){
    return next(err);
  });
};

getOneAnswer = (req,res,next) => {
  var answer_id = parseInt(req.params.answer_id)
  db.one('SELECT * FROM answers WHERE answer_id=$1', answer_id)
  .then(function(data){
    res.status(200)
    .json({
      status: 'Success',
      data: data,
      message: 'Success in querying one answer'
    });
  })
  .catch(function(err){
    return next(err);
  });
};

/////////Update////////////
///////////////////////////
//////////////////////////
//////////////////////////
updateQuestion = (req,res,next) => {
  db.none('UPDATE questions SET question=$1, qtopic_id=$2',
  [req.body.question, req.body.qtopic_id])
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'updated question'
    });
  })
  .catch(function(err){
    return next(err);
  });
}

updateAnswer = (req,res,next) => {
  db.none('UPDATE answers SET answer=$1, aquestion_id=$2',
  [req.body.answer, req.body.aquestion_id])
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'updated answer'
    });
  })
  .catch(function(err){
    return next(err);
  });
}


/////////Delete////////////
///////////////////////////
//////////////////////////
//////////////////////////

deleteAnswer = (req,res,next) => {
  var answer_id = parseInt(req.params.answer_id);
  db.result('DELETE FROM answers WHERE answer_id=$1', answer_id)
}

deleteQuestion = (req,res,next) => {
  var qquestion_id = parseInt(req.params.qquestion_id);
  db.result('DELETE FROM questions WHERE qquestion_id=$1', qquestion_id)
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'why this no work'
    });
  })
  .catch(function(err){
    return next(err);
  });
}
//
// deleteQuestion = (req,res,next) => {
//   var qquestion_id = parseInt(req.params.qquestion_id);
//   db.result('DELETE FROM questions where qquestion_id=$1',[qquestion_id])
//   .then(function(data))
// }
//
//
// deleteDocumentation = (req,res,next) => {
//
// }




module.exports = {
  // deleteQuestion: deleteQuestion,
  getAllDocumentation: getAllDocumentation,
  getAllQuestions: getAllQuestions,
  getOneQuestion: getOneQuestion,
  getAllAnswers: getAllAnswers,
  getOneAnswer: getOneAnswer,
  deleteAnswer: deleteAnswer,
  findAnswers: findAnswers,
  createQuestion: createQuestion,
  createAnswer: createAnswer,
  updateQuestion: updateQuestion,
  updateAnswer: updateAnswer,
  getAllQuestionsWithAnswers: getAllQuestionsWithAnswers,
  getAllQuestionsBySubject: getALlQuestionsBySubject,
  getAllQuestionsWithAnswersBySubject: getAllQuestionsWithAnswersBySubject,
  getOneQuestionWithAnswersBySubject: getOneQuestionWithAnswersBySubject,
  getAllJavaScriptDocumentation: getAllJavaScriptDocumentation,
  getAllNodeDocumentation: getAllNodeDocumentation,
  getAllExpressDocumentation: getAllExpressDocumentation,
  getAllReactDocumentation: getAllReactDocumentation,
  getALlQuestionsBySubject: getALlQuestionsBySubject,
  deleteQuestion: deleteQuestion

};

