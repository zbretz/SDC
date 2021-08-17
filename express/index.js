const express = require('express');
const app = express();
const port = 2000;
const db = require('./db')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Questions list
app.get('/api/qa/questions', (req, res) => {
  const product_id = req.query['product_id']
  const prom1 = db.query('SELECT * FROM questions WHERE product_id = $1 LIMIT 100',[product_id])

  const prom2 = db.query('select row_to_json(q) from ( select questions.id, questions.body, (select json_agg(answers) from( select ans.id, (select json_agg(pho) from (select * from answers_photos where answer_id = ans.id) pho )as photos from ( select * from answers where question_id = questions.id) as ans) answers) as answers from (select * from questions where product_id = $1) as questions) q;',[product_id])

  // db.query('SELECT * FROM questions WHERE product_id = $1 LIMIT 100',[product_id])
  //  .then(result => res.send(result.rows[0]))
    // .catch(e => console.error(e.stack))
    // .then

    Promise.all([prom2])
    .then(result => res.send(result[0].rows))
    .catch(e => console.error(e.stack))
})

// Answer list
app.get('/api/qa/questions/:question_id/answers', (req, res) => {
  const question_id = req.params['question_id']
  db.query('SELECT * FROM answers WHERE (question_id=$1)',[question_id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
    // pool.end()
  })

})


// Add a Question
app.post('/api/qa/questions', (req, res) => {
  // const {body, name, email, product_id} = req.query
  const values = ['body', 'name', 'email', 'product_id'].map(k => req.query[k]);
  const text = 'INSERT INTO questions (body, name, email, product_id) VALUES($1, $2) RETURNING *'
   res.send(values)
})

// Add an Answer
app.post('/api/qa/questions/:question_id/answers', (req, res) => {

})

// Mark Question as Helpful
app.post('/api/qa/questions/:question_id/helpful', (req, res) => {

})

// Report Question
app.post('/api/qa/questions/:question_id/report', (req, res) => {

})

// Mark Answer as Helpful
app.post('/api/qa/answers/:answer_id/helpful', (req, res) => {

})

// Report Answer
app.post('/api/qa/answers/:answer_id/report', (req, res) => {

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})