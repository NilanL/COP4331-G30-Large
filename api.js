require('express');
require('mongodb');

const { ObjectId } = require('mongodb');
const sendEmail = require('./sendEmail');

const User = require("./models/user.js");

exports.setApp = function (app, mongoose) {
    // login endpoint
    app.post('/api/login', async (req, res, next) => {
        const { username, password } = req.body;

        /* OLD WAY
        const foundUser = await db.collection('users').findOne({ Username: username });
        */

        // NEW WAY
        const foundUser = await User.findOne({Username:username});

        if (foundUser.Verified != true){
            ret = { error: 'Email is not verified can not access login'};
                res.status(500).json(ret);
                return;
        }

        try {
            /* OLD WAY
            const db = client.db();
            const results = await db.collection('users').find({ Username: username, Password: password }).toArray();
            */

            // NEW WAY
            const results = await User.find({Username:username,Password:password});
            let id = '';
            let fn = '';
            let ln = '';
            let em = '';
            let ph = '';

            var ret;

            if (results.length == 0) {
                // no user, return 400 (or 404 not found) code
                ret = { error: 'Unrecognized credentials' }
                res.status(400).json(ret);
                return;
            }

            id = results[0]._id.toString();
            fn = results[0].FirstName;
            ln = results[0].LastName;
            em = results[0].email;
            ph = results[0].phone;

            try {
                const token = require("./createJWT.js");
                ret = token.createToken(id, fn, ln);
            }
            catch (e) {
                ret = { error: e.message };
            }

            //let ret = { id: id, firstName: fn, lastName: ln, error: '' };
            res.status(200).json(ret);
        }
        catch (e) {
            let error = e.toString();
            res.status(400).json({ error: error });
        }
    });

    // register endpoint
    app.post('/api/register', async (req, res, next) => {
        const { firstName, lastName, username, phone, email, password } = req.body;

        /* OLD WAY
        const newUser = { FirstName: firstName, LastName: lastName, Username: username, Phone: phone, Email: email, Password: password, verified: false };
        */

        // NEW WAY
        const newUser = new User({
            FirstName: firstName, LastName: lastName, Username: username, 
            Phone: phone, Email: email, Password: password, Verified: false,
            NewUser: true
        });

        let error = '';
        var ret;

        try {
            /* OLD WAY
            const db = client.db();
            const searchUsername = db.collection('users').findOne({Username: username});
            const searchEmail = db.collection('users').findOne({Email: email});
            */
            // NEW WAY
            const searchUsername = await User.findOne({Username:username});
            const searchEmail = await User.findOne({Email: email});

            // check if username already in use
            if (searchUsername)
            {
                ret = { error: 'Username already exists' }
                res.status(500).json(ret);
                return;
            }

            // check if email already in use
            else if (searchEmail)
            {
                ret = { error: "Account already registered with this email"}
                res.status(500).json(ret);
                return;
            }

            // else create new user
            else {
                //const result = db.collection('users').insertOne(newUser);
                newUser.save();
            }
        }
        catch (e) {
            error = e.toString();
        }

        ret = { error: error };
        res.status(200).json(ret);
    });

    // send email verification endpoint
    app.post('/api/emailverify', async (req, res, next) => {
        // have user re-enter email
        const { email } = req.body;

        /* OLD WAY
        const db = client.db();
        const foundUser = await db.collection('users').findOne({ Email: email });   // finds user with given email
        */

        // NEW WAY
        const foundUser = await User.findOne({Email: email});

        if (!foundUser) {
            // no user, return 400 (or 404 not found) code
            ret = { error: 'User not found' }
            res.status(400).json(ret);
            return;
        }
        const id = foundUser._id;   // gets id of user from database
        let ret = {Username: foundUser.username, Password: foundUser.password};

        const from = "dailygrind4331@gmail.com";
        const to = email;
        const subject = "Daily Grind Verification";

        console.log(`email: ${email} id: ${id}, user: ${JSON.stringify(foundUser)}`);

        //const link = `https://cop4331-g30-large.herokuapp.com/api/verifyaccount/${id}`;
        const link = `http://localhost:5000/api/verifyaccount/${id}`;

        const output = `
        <p>This is to verify your email for DailyGrind!</p>
        <h3>Your verification link is below:</h3>
        <ul>
        <li> Verification Link: ${link}</li>
        </ul>
        `;

        sendEmail(to, from, subject, output);
        res.status(200).json(ret);
    });

    // update account to verified
    app.get('/api/verifyaccount/:id', async (req, res, next) => {
        console.log("in verify account");
        const id = req.params.id;
        console.log(id);

        /* OLD WAY
        const db = client.db();
        const user = db.collection('users').findOne({_id: ObjectId(id.toString())});
        db.collection('users').updateOne({ _id: id}, { $set: { verified: true}});
        */
        
        // NEW WAY
        const user = await User.findById(id);
        user.Verified = true;
        user.save();

        console.log("set verified to true?");
        //const user = db.collection('users').find(id);
        console.log("finding user?");
        if (user)
        {
            console.log("First Name: ", user.FirstName);
            
            //console.log("set verified to true");
        }
    });

    // sending reset password link endpoint
    app.post('/api/forgotpass', async (req, res, next) => {
        let token = require('./createJWT.js');
        // have user re-enter email
        const { email } = req.body;
        var ret;

        try {
            /* OLD WAY
            const db = client.db();
            const foundUser = await db.collection('users').findOne({ Email: email });   // finds user with given email
            */

            // NEW WAY
            const foundUser = await User.findOne({Email: email});

            if (!foundUser) {
                // no user, return 400 (or 404 not found) code
                ret = { error: 'User not found' }
                res.status(400).json(ret);
                return;
            }
            // get id, first, and last name
            const id = foundUser._id;  
            const fn = foundUser.FirstName;
            const ln = foundUser.LastName;

            try {
                const token = require("./createJWT.js");
                ret = token.createToken(id, fn, ln);
            }
            catch (e) {
                ret = { error: e.message };
            }

            const link = `https://cop4331-g30-large.herokuapp.com/api/resetpass/${id}/${ret.accessToken}`;

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
        }
        catch (e) {
            error = e.toString();
            res.status(400).json({ error: error });
        }
    });

    // reset password endpoint
    app.put('/api/resetpass/:id', (req, res, next) => {
        const newPassword = req.body;
        const id = req.params.id;

        /* OLD WAY
        const db = client.db();
        const result = db.collection('users').updateOne({ _id: req.params.id }, { $set: { Password: newPassword } });
        */

        // NEW WAY
        const result = User.findById(id);
        result.Password = newPassword;
        result.save();
    });

    // TO-DO: 
    // customize account: add productivity and/or health to user, 
    // customize #2: add per productivty and health which activity
}
