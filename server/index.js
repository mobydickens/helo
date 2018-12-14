require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const bcrypt = require('bcryptjs');
const { CONNECTION_STRING } = process.env;
const port = 4000;

const app = express();
app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(port, () => console.log(`server is running at port ${port}`));
})

app.post('/auth/signup', async (req, res) => {
  let { username, password } = req.body;
  const db = req.app.get('db');
  let person = await db.find_user([ username ]);
  console.log(person);
  if(person[0]) { 
    return res.status(200).send('Username already in use!')
  } else {
    console.log('in else')
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync( password, salt );
    let createUser = await db.create_user([ username, hash ]);
    req.session.user = { username: createUser[0].username, id: createUser[0].id }
    console.log('session', req.session.user);
    res.status(200).send(createUser);
  }
})

