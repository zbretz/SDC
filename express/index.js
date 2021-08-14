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
  db.query('SELECT * FROM questions WHERE product_id = $1 LIMIT 100',[product_id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
    // pool.end()
  })
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