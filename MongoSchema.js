// product - do i need to consider product model?

// aka two choices: collab with others on product model and make refernce to questions. or create reference to arent product in question model


product: {
  ...
  ...
  ...
  questions: [
    ObjectID('AAA')
  ]
}

 product_id: 5,
{
       _id: ObjectID('AAA')
       question_body: STRING,
       question_date: DATE,
       asker_name: STRING,
       question_helpfulness: INT,
       reported: BOOL,
       answers: {
         INT: {
           id: 68,
           body: STRING,
           date: DATE,
           answerer_name: STRING,
           helpfulness: INT,
           photos: [
             url: STRING
           ]
           // ...
         }
       }
     },

// more important that reads a requick than writes...also, answers will always be associated witha aquestion, so no need to look up question id
