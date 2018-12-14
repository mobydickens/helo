require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const { CONNECTION_STRING, SESSION_SECRET } = process.env;
const port = 4000;

const app = express();
app.use(bodyParser.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(port, () => console.log(`server is running at port ${port}`));
})

app.get('/api/posts/:id', async (req, res) => {
  let { id } = req.params;
  let { userposts, search } = req.query;
  const db = req.app.get('db');
  console.log('query params', userposts, search);
  if(userposts && search) {
    console.log('hit search string iffy');
    let posts = await db.get_specific_post([ `%${search}%` ]);
    res.status(200).send(posts);
  } else if (!userposts && search ) {
    let posts = await db.get_specific2([ id, search ]);
    console.log('sort by id hit', posts);
    res.status(200).send(posts);
  } else if (userposts) {
    console.log('hit all posts iffy');
    let all = await db.get_all_posts();
    res.status(200).send(all);
  }
  // } else if (!userposts && !search) {
  //   let posts = await db.get_post([ id ])
  //   res.status(200).send(posts);
  // } else {
  //   res.status(200).send(posts);
  // }
})

app.post('/auth/signup', async (req, res) => {
  let { username, password } = req.body;
  const db = req.app.get('db');
  let person = await db.find_user([ username ]);
  if(person[0]) { 
    return res.status(200).send({loggedIn: false, message: 'Username already in use!'})
  } else {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync( password, salt );
    let createUser = await db.create_user([ username, hash ]);
    req.session.user = { username: createUser[0].username, id: createUser[0].id };
    console.log('person', createUser)
    res.status(200).send({ loggedIn: true, username: createUser[0].username, id: createUser[0].id });
  }
})

app.post('/auth/login', async (req, res) => {
  let { username, password } = req.body;
  const db = req.app.get('db');
  let person = await db.find_user([ username ]);
  if(!person[0]) { 
    return res.status(200).send('No valid username found!')
  } else {
    let result = bcrypt.compareSync( password, person[0].hash_value );
    if(result) {
      req.session.user = { username: person[0].username, id: person[0].id };
      return res.status(200).send({ loggedIn: true, username: person[0].username, id: person[0].id });
    } else {
      return res.status(401).send({loggedIn: false, message: 'incorrect password'});
    }
  }
})

