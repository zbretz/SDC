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
 select ans.id,

(select json_agg(pho)
from (
select * from answers_photos where answer_id = ans.id
) pho )as photos


from (
select * from answers where question_id = '216')
 as ans;

 ----even better-er?

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
     -------

select row_to_json(art) as artists
from(
  select a.id, a.name,
  (select json_agg(alb)
  from (
    select * from albums where artist_id = a.id
  ) alb
) as albums
from artists as a) art;


-- http://johnatten.com/2015/04/22/use-postgres-json-type-and-aggregate-functions-to-map-relational-data-to-json/