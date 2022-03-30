const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sendEmail = require('./sendEmail');

const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
app.set('port', PORT);
app.use(cors());
app.use(bodyParser.json());

const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();


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

// login endpoint
app.post('/api/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const db = client.db();
    const results = await db.collection('users').find({Username:username,Password:password}).toArray();

    let id = '';
    let fn = '';
    let ln = '';
    let em = '';
    let ph = '';

    if (results.length == 0) {
      // no user, return 400 (or 404 not found) code
      let ret = {error: 'Unrecognized credentials'}
      res.status(400).json(ret);
      return;
    }

    id = results[0]._id.toString();
    fn = results[0].FirstName;
    ln = results[0].LastName;
    em = results[0].email;
    ph = results[0].phone;

    let ret = { id:id, firstName:fn, lastName:ln, error:''};
    res.status(200).json(ret);
  }
  catch(e) {
    let error = e.toString();
    res.status(400).json({error: error});
  }
});

// register endpoint
app.post('/api/register', async (req, res, next) => {
    const { firstName, lastName, username, phone, email, password } = req.body;

    const newUser = {FirstName: firstName, LastName: lastName, Username: username, Phone: phone, Email: email, Password: password, verified: false};
    let error = '';

    try
    {
        const db = client.db();
        // TODO: check that there is no user with the given username already in the db
        const result = db.collection('users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    let ret = { error: error };
    res.status(200).json(ret);
});

// send email verification endpoint
app.post('/api/emailverify', async (req, res, next) => {
  // have user re-enter email
  const {email} = req.body;

  const db = client.db();
  const foundUser = await db.collection('users').findOne({Email: email});   // finds user with given email
  const id = foundUser._id;   // gets id of user from database

  const from = "dailygrind4331@gmail.com";
  const to = email;
  const subject = "Daily Grind Verification";

  console.log(`email: ${email} id: ${id}, user: ${JSON.stringify(foundUser)}`);

  const output = `
  <p>This is to verify your email for DailyGrind!</p>
  <h3>Your verification link is below:</h3>
  <ul>
    <li><a href="https://cop4331-g30-large.herokuapp.com/api/verifyaccnt/${id}" target="_blank">Verify Account</a></li>
  </ul>
  `;

  sendEmail(to, from, subject, output);
  // res.redirect('/emailsent'); // this to redirect to another page
});

// update account to verified
app.get('/api/verifyaccnt/:id', async (req, res, next) =>{
  const db = client.db();
  const result = await db.collection('users').updateOne({_id: req.params.id}, {$set:{verified: true}});
  
  // change to be if the result is size 0? 
  // incase their user id doesnt exist or you sent the wrong one
  if (result.length != 0) {
    res.redirect('/verifysuccess'); // this to redirect to another page
  } 
  /*else {
    res.redirect('/verifyfail'); // this to redirect to another page
  }*/
});

// sending reset password link endpoint
app.post('/api/reset', async (req, res, next) => {
  // have user re-enter email
  const email = req.body;

  try {
    const foundUser = db.collection('users').findOne({Email: email});   // finds user with given email
    const id = foundUser._id;   // gets id of user from database

    const link = `https://cop4331-g30-large.herokuapp.com/reset/${id}/${JWTTOKEN}`

    const from = "dailygrind4331@gmail.com";
    const to = email;
    const subject = "Daily Grind Password Reset";

    const output = `
    <p>This is to reset your password for DailyGrind!</p>
    <h3>Your reset link is below:</h3>
    <ul>
      <li>Link: ${link} </li> 
    </ul>
    `; 

    sendEmail(to, from, subject, output);
    res.redirect('/verifycode'); // this to redirect to another page
  }

  catch (e) {
    error = e.toString();
  }
});

// reset password endpoint
app.put('/api/resetpassword/:id', (req, res, next) => {
  const newPassword = req.body;

  const db = client.db();
  const result = db.collection('users').updateOne({_id: req.params.id}, {$set:{Password: newPassword}});
});

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
