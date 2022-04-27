require('express');
require('mongodb');

const { ObjectId } = require('mongodb');
const sendEmail = require('./sendEmail');
const hash = require('object-hash');

exports.setApp = function (app, client) {
    // login endpoint
    app.post('/api/login', async (req, res, next) => {
        const { username, password } = req.body;
        const hashedPass = hash.MD5(password);
        let error = '';

        try {

            const db = client.db();
            const foundUser = await db.collection('users').findOne({ Username: username, Password: hashedPass });
            // console.log(foundUser.FirstName);

            let id = '';
            let fn = '';
            let ln = '';
            let em = '';
            let ph = '';

            var ret;

            if (!foundUser) {
                // no user, return 400 (or 404 not found) code
                ret = { error: 'Unrecognized credentials' };
                res.status(400).json(ret);
                return;
            }

            else if (foundUser.Verified != true) {
                ret = { error: 'Email is not verified can not access login' };
                res.status(500).json(ret);
                return;
            }

            else if (foundUser.Customized != true) {
                // redirect to customize page
                error = 'User has not customized their account';
            }

            id = foundUser._id.toString();
            fn = foundUser.FirstName;
            ln = foundUser.LastName;
            em = foundUser.Email;
            ph = foundUser.Phone;

            ret = { Id: id, Username: username, FirstName: fn, LastName: ln, Email: em, PhoneNumber: ph, error: error };
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
        const hashedPass = hash.MD5(password)

        const newUser = { FirstName: firstName, LastName: lastName, Username: username, Phone: phone, Email: email, Password: hashedPass, Verified: false, Customized: false };
        let error = '';
        var ret;

        try {
            const db = client.db();
            const searchUsername = await db.collection('users').findOne({ Username: username });
            const searchEmail = await db.collection('users').findOne({ Email: email });

            // check if username already in use
            if (searchUsername) {
                ret = { error: 'Username already exists' };
                res.status(500).json(ret);
                return;
            }

            // check if email already in use
            else if (searchEmail) {
                ret = { error: "Account already registered with this email" };
                res.status(500).json(ret);
                return;
            }

            // else create new user
            else {
                db.collection('users').insertOne(newUser);
            }
        }
        catch (e) {
            error = e.toString();
        }

        ret = {FirstName: firstName, LastName: lastName, Username: username, Phone: phone, Email: email, Password: hashedPass, error: error};
        res.status(200).json(ret);
    });

    // send email verification endpoint
    app.post('/api/emailverify', async (req, res, next) => {
        // have user re-enter email
        const { email } = req.body;
        let ret;

        const db = client.db();
        const foundUser = await db.collection('users').findOne({ Email: email });   // finds user with given email
        if (!foundUser) {
            // no user, return 400 (or 404 not found) code
            ret = { error: 'User not found' };
            res.status(400).json(ret);
            return;
        }

        ret = { Username: foundUser.username, Password: foundUser.password };

        const from = "dailygrind4331@gmail.com";
        const to = email;
        const subject = "Daily Grind Verification";

        console.log(`id ${foundUser._id}`);

        //const link = `https://cop4331-g30-large.herokuapp.com/api/verifyaccount/${id}`;
        //const link = `http://localhost:5000/EmailVerification

        // change link to page to then link next api endpoint on that page instead
        const link = `http://localhost:5000/EmailVerification/?id=${foundUser._id}`;

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
    app.post('/api/verifyaccount', async (req, res, next) => {
        var ret;
        const db = client.db();
        const userId = req.body.id;
        const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
        console.log(userId);
        db.collection('users').updateOne({ _id: ObjectId(userId) }, { $set: { Verified: true } });

        if (!user) {
            ret = { error: 'User not found' };
            res.status(400).json(ret);
            return;
        }
        console.log("First Name: ", user.FirstName);

        ret = { _id: userId };
        res.status(200).json(ret);
    });

    // sending reset password link endpoint
    app.post('/api/forgotpass', async (req, res, next) => {
        // have user re-enter email
        const { email } = req.body;
        var ret;

        try {
            const db = client.db();
            const foundUser = await db.collection('users').findOne({ Email: email });   // finds user with given email

            if (!foundUser) {
                // no user, return 400 (or 404 not found) code
                ret = { error: 'User not found' };
                res.status(400).json(ret);
                return;
            }
            // get id, first, and last name
            const id = foundUser._id;
            const fn = foundUser.FirstName;
            const ln = foundUser.LastName;

            //const link = `https://cop4331-g30-large.herokuapp.com/ResetPassword/?id=${id}`;
            const link = `http://localhost:5000/ResetPassword/?id=${id}`;
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
            ret = {FirstName: fn, LastName: ln}
            res.status(200).json(ret);
        }
        catch (e) {
            error = e.toString();
            res.status(400).json({ error: error });
        }
    });

    // reset password endpoint
    app.post('/api/resetpass', async (req, res, next) => {
        var ret;
        const userId = req.body.id;
        const newPassword = req.body.password;
        const hashedPass = hash.MD5(newPassword);
        // console.log(userId);
        // console.log(newPassword);

        const db = client.db();
        const foundUser = await db.collection('users').findOne({ _id: ObjectId(userId) });
        //console.log(foundUser.FirstName);

        if (!foundUser) {
            ret = { error: 'User not found' };
            res.status(400).json(ret);
            return;
        }
        if (foundUser.Password == hashedPass) {
            ret = { error: 'Already used this password' };
            res.status(500).json(ret);
            return;
        }
        ret = { _id: userId };

        db.collection('users').updateOne({ _id: ObjectId(userId) }, { $set: { Password: hashedPass } });

        res.status(200).json(ret);
    });

    // customization initialization
    app.post('/api/initialize/:username', async (req, res, next) => {
        const username = req.params.username;
        const initialization = {User: username, Exercise: false, Meal: false, Medication: false, Recreation: false, Sleep: false, Water: false};
        const db = client.db();
        db.collection('habits').insertOne(initialization);
        let ret = {User: username};
        res.status(200).json(ret);
    });

    // customization endpoint
    app.post('/api/customize/:username', async (req, res, next) => {
        const username = req.params.username;

        const { exercise, meal, medication, recreation, sleep, water } = req.body;

        const db = client.db();
        const foundUser = await db.collection('habits').findOne({ User: username });

        if (foundUser) {
            db.collection('habits').updateOne({ User: username }, { $set: { Exercise: exercise, Meal: meal, Medication: medication, Recreation: recreation, Sleep: sleep, Water: water } });
            let ret = { User: username };
            res.status(200).json(ret);
        }

        else {
            const userHabits = { User: username, Exercise: exercise, Meal: meal, Medication: medication, Recreation: recreation, Sleep: sleep, Water: water };

            let ret = { User: username };

            const db = client.db();
            db.collection('habits').insertOne(userHabits);
            db.collection('users').updateOne({ Username: username }, { $set: { Customized: true } });
            res.status(200).json(ret);
        }
    });

    // retrieve customization info
    app.get('/api/getCustomization/:username',  async (req, res, next) => {
        const username = req.params.username;
        const db = client.db();
        const foundUser = await db.collection('habits').findOne({User: username});

        if (!foundUser)
        {
            res.status(400).send("Not found - user needs to customize");
        }
        else {
            res.status(200).send(foundUser);
        }
    }); 

    /*// update customization endpoint
    app.post('/api/updatecustomization/:username', async (req, res, next) => {
        const username = req.params.username;
        const { exercise, meal, medication, recreation, sleep, water } = req.body;

        const userHabits = {User: username, Exercise: exercise, Meal: meal, Medication: medication, Recreation: recreation, Sleep: sleep, Water: water};

        let ret = { User: username };

        const db = client.db();
        db.collection('habits').insertOne(userHabits);
        res.status(200).json(ret);
    });
    */
    // TO-DO:
    // hash passwords in db?
}
