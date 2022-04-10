require('express');
require('mongodb');

const { ObjectId } = require('mongodb');

exports.setApp = function (app, client2) {
    // framework for habits *in production*
    app.post('/api/water/:username', async (req, res, next) => {
        const username = req.params.username;
        const ounces = req.body.ounces;
        const date = req.body.date;

        const db = client2.db();
        const foundUser = await db.collection('water').findOne({ Username: username });
        
        if(!foundUser){
            res.status(400).json(ret);
        }

        if (foundUser.Date == date){
            db.collection('water').updateOne({ User: username }, { $set: { Ounces: ounces }});
        } else {
            const waterLog = {User: username, Date: date, Ounces: ounces};
            db.collection('water').insertOne(waterLog);
        }
    
        res.status(200).json(ret);
    });

    app.post(`/api/sleep/:username`, async (req, res, next) => {
        const username = req.params.username;

        const date = req.body.date;
        const startTimeHour = req.body.startHour;
        const startTimeMinutes = req.body.startMin;
        const startMeridiam = req.body.startMeridiam;
        const endTimeHour = req.body.endHour;
        const endTimeMinutes = req.body.endMin;
        const endMeridiam = req.body.endMeridiam;
        
        if (startMeridiam === "pm")
        {
            startTimeHour += 12;
        }
        if (endMeridiam === "pm")
        {
            endTimeHour += 12;
        }

        startTimeMinutes = startTimeMinutes / 60;
        endTimeMinutes = endTimeMinutes / 60;
        let startTime = startTimeHour + startTimeMinutes;
        let endTime = endTimeHour + endTimeMinutes;

        let hoursSlept = endTime - startTime;
        
        const sleepLog = {User: username, Date: date, Hours: hoursSlept}

        const db = client2.db();
        db.collection('sleep').insertOne(sleepLog);
    });

    app.post('/api/recreation/:username', async (req, res, next) => {
        const username = req.params.username;
        const hours = req.body;

        const db = client2.db();
        // const foundUser = await db.collection('users').findOne({ Username: username });

        db.collection('recreation').updateOne({ Username: username }, { $set: { Hours: hours } });
        res.status(200).json(ret);
    });

    app.post('/api/exercise/:username', async (req, res, next) => {
        const username = req.params.username;
        const hours = req.body;

        const db = client2.db();
        // const foundUser = await db.collection('users').findOne({ Username: username });

        db.collection('recreation').updateOne({ Username: username }, { $set: { Hours: hours } });
        res.status(200).json(ret);
    });

    app.post('/api/meal/:username', async (req, res, next) => {
        const username = req.params.username;
        const hours = req.body;

        const db = client.db();
        // const foundUser = await db.collection('users').findOne({ Username: username });

        db.collection('recreation').updateOne({ Username: username }, { $set: { Hours: hours } });
        res.status(200).json(ret);
    });
    
    app.post('/api/medication/:username', async (req, res, next) => {
        const username = req.params.username;
        const hours = req.body;

        const db = client.db();
        // const foundUser = await db.collection('users').findOne({ Username: username });

        db.collection('recreation').updateOne({ Username: username }, { $set: { Hours: hours } });
        res.status(200).json(ret);
    });
    
    // TO:DO app.get() for all habits in order for summary purposes
}