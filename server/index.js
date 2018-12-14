require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const { CONNECTION_STRING } = process.env;
const port = 4000;

const app = express();

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(port, () => console.log(`server is running at port ${port}`));
})
