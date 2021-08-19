DROP DATABASE  IF EXISTS  qa;

CREATE DATABASE qa;

\c qa; (to use/change to)

CREATE INDEX product_id ON questions(product_id)