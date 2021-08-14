const express = require('express');
const app = express();
const port = 2000;



app.get('/', (req, res) => {
  res.send('Hello World!')
})

//questions list
app.get('/api/qa/questions', (req, res) => {
  const product_id = req.query['product_id']
  res.send(product_id)
})

//answer list
app.get('/api/qa/questions/:question_id/answers', (req, res) => {
  const question_id = req.params['question_id']
  res.send(question_id)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})