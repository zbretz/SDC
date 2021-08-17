
-- http://johnatten.com/2015/04/22/use-postgres-json-type-and-aggregate-functions-to-map-relational-data-to-json/


-- "results": [{
--   "question_id": 37,
--   "question_body": "Why is this product cheaper here than other sites?",
--   "question_date": "2018-10-18T00:00:00.000Z",
--   "asker_name": "williamsmith",
--   "question_helpfulness": 4,
--   "reported": false,
--   "answers": {
--     68: {
--       "id": 68,
--       "body": "We are selling it here without any markup from the middleman!",
--       "date": "2018-08-18T00:00:00.000Z",
--       "answerer_name": "Seller",
--       "helpfulness": 4,
--       "photos": []
--       // ...
--     }
--   }
-- },

select row_to_json (answers)
from (
select * from answers where question_id='216'
) as answers;

select json_agg(photos)
from (
select * from answers_photos where answer_id = '426'
) as photos;


select row_to_json (ans) as answers
from (
select ans.id,

(select json_agg(pho)
from (
select * from answers_photos where answer_id = '426'
) pho )as photos


from (
select * from answers_photos where answer_id = '426')
 as ans) ans;


select row_to_json(ans) as answers
from(
  select a.id,
    (select json_agg(pho)
    from (
      select * from answers_photos where answer_id = a.id
    )  pho
  ) as answers_photos
from answers as a) ans;


------
select row_to_json (answers)
from (
select * from answers where question_id='216'
) as answers;

select json_agg(photos)
from (
select * from answers_photos where answer_id = '426'
) as photos;



-----good shit:
select ans.id,

(select json_agg(pho)
from (
select * from answers_photos where answer_id = '423'
) pho )as photos


from (
select * from answers where id = '423')
 as ans;

 -----better shit?

select row_to_json(results)
from(

 select ans.id,

(select json_agg(pho)
from (
select * from answers_photos where answer_id = ans.id
) pho )as photos


from (
select * from answers where question_id = '216')
 as ans) results;

 ----even better-er?

select row_to_json(results)
from(

select ans.id, ans.body,

(select json_agg(pho)
from (
select * from answers_photos where answer_id = ans.id
) pho )as photos


from (
select * from answers where question_id = '216')
as ans) results;
     -------

-- returns:
--  {"id":425,"photos":null}
--  {"id":426,"photos":[{"id":121,"answer_id":426,"url":"https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"}]}
--  {"id":427,"photos":null}
--  {"id":428,"photos":null}


select json_agg(answers)
from(

 select ans.id,

(select json_agg(pho)
from (
select * from answers_photos where answer_id = ans.id
) pho )as photos


from (
select * from answers where question_id = '216')
 as ans) answers;

--------------------------
-- trying to get all answers aggregated
-- select q.id from questions where (product_id='5');

select row_to_json(questions)
from (
  select id, body from questions where product_id = '66'
) as questions;

-- above returns:
--  [{"id":214,"body":"Et qui sed recusandae aut veritatis et est qui quia."},    +
--   {"id":215,"body":"Minus neque et et aut natus id molestias qui assumenda."}, +
--   {"id":216,"body":"Culpa eveniet et cum praesentium aut."}]

--------------------------

select row_to_json(q)
from (
  select questions_id, body,

  (select json_agg(answers)
from(

 select ans.id,

(select json_agg(pho)
from (
select * from answers_photos where answer_id = ans.id
) pho )as photos


from (
select * from answers where question_id = '216')
 as ans) answers) as answers


  from (
    select * from questions where product_id = '66'
) as questions) q;