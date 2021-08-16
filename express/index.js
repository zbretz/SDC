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
  // db.query('SELECT * FROM questions WHERE product_id = $1 LIMIT 100',[product_id])

  //  .then(result => res.send(result.rows[0]))
    // .catch(e => console.error(e.stack))
    // .then

    Promise.all([prom1])
    .then(result => res.send(result[0].rows[0]))
    .catch(e => console.error(e.stack))
})

// "results": [{
//   "question_id": 37,
//   "question_body": "Why is this product cheaper here than other sites?",
//   "question_date": "2018-10-18T00:00:00.000Z",
//   "asker_name": "williamsmith",
//   "question_helpfulness": 4,
//   "reported": false,
//   "answers": {
//     68: {
//       "id": 68,
//       "body": "We are selling it here without any markup from the middleman!",
//       "date": "2018-08-18T00:00:00.000Z",
//       "answerer_name": "Seller",
//       "helpfulness": 4,
//       "photos": []
//       // ...
//     }
//   }
// },

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