const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// const sendEmail = require('./sendEmail');

const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
app.set('port', PORT);
app.use(cors());
app.use(bodyParser.json());

const url = process.env.MONGODB_URI;
const url2 = process.env.MONGODB_HEALTHDB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
// const client2 = new MONGO_CLIENT_EVENTS(url2);
client.connect();
// client2.connect();

let api = require('./api.js');
// let api2 = require('./habitsApi.js');
const { MONGO_CLIENT_EVENTS } = require('mongodb');
api.setApp( app, client);
// api2.setApp(app, client2);

///////////////////////////////////////////////////
// For Heroku deployment
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('/*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

//app.listen(5000); // start Node + Express server on port 5000
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});