INSERT INTO person ( username, hash_value ) 
VALUES ($1, $2);
SELECT * FROM person;