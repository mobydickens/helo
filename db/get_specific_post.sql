SELECT p.title, p.post, per.username, per.id FROM posts AS p
INNER JOIN person AS per ON p.person_id = per.id 
WHERE p.title LIKE '%' + $1 + '%'