-- to run this file

-- create table questions (
-- id int not null,
-- -- id int not null AUTOINCREMENT??
-- -- id serial,
-- product_id int not null,
-- body text,
-- date_written bigint,
-- asker_name text,
-- asker_email text,
-- reported int,
-- helpful int,
-- primary key(id));

-- copy questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
-- from '/users/zach/workspace/hackreactor/sdc/CSV/questions.csv'
-- delimiter ','
-- csv header;

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
primary key(id));

copy answers
from '/users/zach/workspace/hackreactor/sdc/CSV/answers.csv'
delimiter ','
csv header;



-- select * from questions where (asker_name='jbilas');
-- select * from answers where (answerer_name='marcanthony');