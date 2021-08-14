const express = require('express');
const app = express();
const port = 2000;
const db = require('./db')




app.get('/', (req, res) => {
  res.send('Hello World!')
})

//questions list
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

//answer list
app.get('/api/qa/questions/:question_id/answers', (req, res) => {
  const question_id = req.params['question_id']

  const product_id = req.query['product_id']
  db.query('SELECT * FROM answers LIMIT 1', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
    // pool.end()
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})