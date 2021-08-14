-- to run this file:
-- psql -U postgres postgres  -f schema.sql

DROP DATABASE  IF EXISTS  qa;

CREATE DATABASE qa;

\c qa;

create table questions (
id int not null,
-- id int not null AUTOINCREMENT??
-- id serial,
product_id int not null,
body text,
date_written bigint,
asker_name text,
asker_email text,
reported int,
helpful int,
primary key(id)
);

copy questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
from '/users/zach/workspace/hackreactor/sdc/CSV/questions.csv'
delimiter ','
csv header;

create table answers (
id serial,
-- id int not null AUTOINCREMENT??
-- id serial,
question_id int not null,
body text,
date_written bigint,
answerer_name text,
answerer_email text,
reported int,
helpful int,
primary key(id)
);

copy answers
from '/users/zach/workspace/hackreactor/sdc/CSV/answers.csv'
delimiter ','
csv header;

create table answers_photos (
id serial,
answer_id int,
url text,
primary key(id)
);

copy answers_photos
from '/users/zach/workspace/hackreactor/sdc/CSV/answers_photos.csv'
delimiter ','
csv header;

-- select * from questions where (asker_name='jbilas');
-- select * from answers where (answerer_name='marcanthony');
-- select * from answers_photos where (answer_id='5');


--Building Query: GET /qa/questions
-- select * from questions where (product_id='5');
-- select * from answers where (question_id='34');

-- select a.id, a.question_id from answers a inner join questions q on a.question_id = q.id limit 10;

-- select q.id, a.question_id from answers a inner join questions q on a.question_id = q.id where product_id='66';


-- select count(id) from answers;



-- select id from questions  where product_id='66';
-- --result: 214, 214, 216

-- select id from answers where (question_id='214')
-- -- result: 421, 422
-- select id from answers where (question_id='215')
-- -- 423, 424
-- select id from answers where (question_id='216')
-- -- 425, 426, 427, 428

---------these two queries return all questions and their answers for a given product_id:
-- select q.id, q.body, a.question_id, a.body  from answers a inner join questions q on a.question_id = q.id where product_id='66';

-- select id from answers where question_id in (select id from questions where product_id='66');
---------

-- trying now to inner join on photos as well
-- select q.id, q.body, a.question_id, a.body, ap.url
-- from answers a
-- inner join questions q
-- on a.question_id = q.id
-- left join answers_photos ap
-- on a.id = ap.answer_id
-- where product_id='66'
-- ;

-- ---------
-- select q.id, a.question_id, ap.url
-- from answers a
-- inner join questions q
-- on a.question_id = q.id
-- inner join answers_photos ap
-- where product_id='66'
-- ;

-- ---------
-- select answers.id, answers_photos.url
-- from answers
-- inner join answers_photos
-- on answers.id = answers_photos.answer_id
-- where answers.id = '426';
