SELECT p.title, p.post, per.username, per.id FROM posts AS p
JOIN person AS per ON p.person_id = per.id 
WHERE per.id != $1;