require('express');
require('mongodb');

const { ObjectId } = require('mongodb');

exports.setApp = function (app, client2) {
    
    /***** WATER *****/
    // insert water data
    app.post('/api/water/:username', async (req, res, next) => {
        const username = req.params.username;
        const ounces = req.body.ounces;
        const date = req.body.date;

        const db = client2.db();
        const foundEntry = await db.collection('water').findOne({ User: username, Date: date});
        let ret;
        
        // if user already has water log for date entered, add ounces entered to existing log
        if (foundEntry){
            const id = foundEntry._id;
            let totalOunces = foundEntry.Ounces + ounces;
            db.collection('water').updateOne({ _id: id}, { $set: { Ounces: totalOunces }});
            ret = {User: username, Date: date, OuncesEntered: ounces, TotalOunces: totalOunces}
        } else {
            const waterLog = {User: username, Date: date, Ounces: ounces};
            db.collection('water').insertOne(waterLog);
            ret = {User: username, Date: date, TotalOunces: ounces}
        }
    
        res.status(200).json(ret);
    });

    // retrieve water data
    app.post('/api/getWater/:username', async (req, res, next) => {
        const date = req.body.date;
        const username = req.params.username;
        
        const db = client2.db();
        const foundEntry = await db.collection('water').findOne({User: username, Date: date});

        if (foundEntry){
            res.status(200).send(foundEntry);
        }else {
            res.status(400).send("Entry for given user and date not found");
        }
    });

    // delete water data
    app.delete('/api/deleteWater/:username', async (req, res, next) => {
        const date = req.body.date;
        const username = req.params.username;
        
        const db = client2.db();
        const foundEntry = await db.collection('water').findOne({Date: date, User: username});

        if (foundEntry){
            let ret = {User: foundEntry.User, Date: foundEntry.Date, Ounces: foundEntry.Ounces};
            db.collection('water').deleteOne({User: username, Date: date});
            res.status(200).json(ret);
        }else {
            let ret = {error : 'Entry for given user and date not found'};
            res.status(400).json(ret);
        }
    });


    /***** SLEEP *****/
    // insert sleep data
    app.post(`/api/sleep/:username`, async (req, res, next) => {
        const username = req.params.username;

        const date = req.body.date;
        let startHour = req.body.startHour;
        let startMin = req.body.startMin;
        const startMeridiam = req.body.startMeridiam;
        let endHour = req.body.endHour;
        let endMin = req.body.endMin;
        const endMeridiam = req.body.endMeridiam;

        const db = client2.db();
        const foundEntry = await db.collection('sleep').findOne({User: username, Date: date});
        if (foundEntry)
        {
            let ret = {error: 'Sleep hours already recorded for this user and date'};
            res.status(550).json(ret);
            return;
        }

        let startTime;
        let endTime;
        let hoursSlept;
        let roundedHours;

        // if user sleeps from pm time to am time (<12 hrs)
        if (startMeridiam === "pm" && endMeridiam === "am") {
            startMin = startMin / 60;
            endMin = endMin / 60;
            startTime = startHour + startMin;
            endTime = endHour + endMin;
            hoursSlept = (12 - startTime) + endTime;
            roundedHours = hoursSlept.toFixed(2);
        }

        // if user sleeps from am time to am time (<12 hrs)
        else if (startMeridiam === "am" && endMeridiam === "am") {
            if (startHour == 12) {
                startHour -= 12;
            }
            startMin = startMin / 60;
            endMin = endMin / 60;
            startTime = startHour + startMin;
            endTime = endHour + endMin;
            hoursSlept = endTime - startTime;
            roundedHours = hoursSlept.toFixed(2);
        }

        // if user sleeps from am time to pm time (<12 hrs)
        else if (startMeridiam === "am" && endMeridiam === "pm") {
            if (endHour != 12) {
                endHour += 12;
            }
            startMin = startMin / 60;
            endMin = endMin / 60;
            startTime = startHour + startMin;
            endTime = endHour + endMin;
            hoursSlept = endTime - startTime;
            roundedHours = hoursSlept.toFixed(2);
        }

        // if user sleeps from pm time to pm time (<12 hrs)
        else {
            if (startHour == 12) {
                startHour -= 12
            }
            startMin = startMin / 60;
            endMin = endMin / 60;
            startTime = startHour + startMin;
            endTime = endHour + endMin;
            hoursSlept = endTime - startTime;
            roundedHours = hoursSlept.toFixed(2);
        }

        const sleepLog = {User: username, Date: date, Hours: roundedHours}
        let ret = {User: username, Date: date, Hours: roundedHours}

        db.collection('sleep').insertOne(sleepLog);
        res.status(200).json(ret);
    });

    // retrieve sleep data
    app.post('/api/getSleep/:username', async (req, res, next) => {
        const date = req.body.date;
        const username = req.params.username;

        const db = client2.db();
        const foundEntry = await db.collection('sleep').findOne({Date: date, User: username});

        if (foundEntry){
            res.status(200).send(foundEntry);
        }else {
            res.status(400).send("Entry for given user and date not found");
        }
    });

    // delete sleep data
    app.delete('/api/deleteSleep/:username', async (req, res, next) => {
        const date = req.body.date;
        const username = req.params.username;
        
        const db = client2.db();
        const foundEntry = await db.collection('sleep').findOne({Date: date, User: username});

        if (foundEntry){
            let ret = {User: foundEntry.User, Date: foundEntry.Date, Hours: foundEntry.Hours};
            db.collection('sleep').deleteOne({User: username, Date: date});
            res.status(200).json(ret);
        }else {
            let ret = {error : 'Entry for given user and date not found'};
            res.status(400).json(ret);
        }
    });


    /***** RECREATION *****/
    // insert recreation data
    app.post('/api/recreation/:username', async (req, res, next) => {
        const username = req.params.username;
        const date = req.body.date;
        const activity = req.body.activity;    // dropdown on front end: screen time, tv, games, sport, art, chores, work, other
        const hours = req.body.hours;

        const db = client2.db();
        const foundEntry = await db.collection('recreation').findOne({User: username, Date: date});
        let ret;

        // if user already has an activity log for date entered, update log with new activity entered
        if (foundEntry){
            const id = foundEntry._id;
            if (activity === "ScreenTime") {
                let updatedHours = foundEntry.ScreenTime;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { ScreenTime: updatedHours }});
                ret = {User: username, Date: date, ScreenTime: updatedHours}
            }
            else if (activity === "Television") {
                let updatedHours = foundEntry.Television;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Television: updatedHours }});
                ret = {User: username, Date: date, Television: updatedHours}
            }
            else if (activity === "Gaming") {
                let updatedHours = foundEntry.Gaming;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Gaming: updatedHours }});
                ret = {User: username, Date: date, Gaming: updatedHours}
            }
            else if (activity === "Sport") {
                let updatedHours = foundEntry.Sport;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Sport: updatedHours }});
                ret = {User: username, Date: date, Sport: updatedHours}
            }
            else if (activity === "Art") {
                let updatedHours = foundEntry.Art;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Art: updatedHours }});
                ret = {User: username, Date: date, Art: updatedHours}
            }
            else if (activity === "Chores") {
                let updatedHours = foundEntry.Chores;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Chores: updatedHours }});
                ret = {User: username, Date: date, Chores: updatedHours}
            }
            else if (activity === "Work") {
                let updatedHours = foundEntry.Work;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Work: updatedHours }});
                ret = {User: username, Date: date, Work: updatedHours}
            }
            else if (activity === "Other") {
                let updatedHours = foundEntry.Other;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Other: updatedHours }});
                ret = {User: username, Date: date, Other: updatedHours}
            }  
        } 
        
        // if user does not have an acitivity log for the date entered, create new activity log
        else {
            let recreationLog;
            if (activity === "ScreenTime") {
                recreationLog = {User: username, Date: date, ScreenTime: hours, Television: 0, Gaming: 0, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: 0};
                ret = {User: username, Date: date, ScreenTime: hours}
            }
            else if (activity === "Television") {
                recreationLog = {User: username, Date: date, ScreenTime: 0, Television: hours, Gaming: 0, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: 0};
                ret = {User: username, Date: date, Television: hours}
            }
            else if (activity === "Gaming") {
                recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Gaming: hours, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: 0};
                ret = {User: username, Date: date, Gaming: hours}
            }
            else if (activity === "Sport") {
                recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Gaming: 0, Sport: hours, Art: 0, Chores: 0, Work: 0, Other: 0};
                ret = {User: username, Date: date, Sport: hours}
            }
            else if (activity === "Art") {
                recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Gaming: 0, Sport: 0, Art: hours, Chores: 0, Work: 0, Other: 0};
                ret = {User: username, Date: date, Art: hours}
            }
            else if (activity === "Chores") {
                recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Gaming: 0, Sport: 0, Art: 0, Chores: hours, Work: 0, Other: 0};
                ret = {User: username, Date: date, Chores: hours}
            }
            else if (activity === "Work") {
                recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Gaming: 0, Sport: 0, Art: 0, Chores: 0, Work: hours, Other: 0};
                ret = {User: username, Date: date, Work: hours}
            }
            else if (activity === "Other") {
                recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Gaming: 0, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: hours};
                ret = {User: username, Date: date, Other: hours}
            }
            db.collection('recreation').insertOne(recreationLog);
        }
        res.status(200).json(ret);
    });

    // retrieve recreation data
    app.post('/api/getRecreation/:username', async (req, res, next) => {
        const date = req.body.date;
        const username = req.params.username;

        const db = client2.db();
        const foundEntry = await db.collection('recreation').findOne({Date: date, User: username});

        if (!foundEntry)
        {
            res.status(400).send("Entry for given user and date not found");
        }
        else {
            res.status(200).send(foundEntry);
        }
    });

    // delete recreation data
    app.delete('/api/deleteRecreation/:username', async (req, res, next) => {
        const date = req.body.date;
        const username = req.params.username;
        
        const db = client2.db();
        const foundEntry = await db.collection('recreation').findOne({Date: date, User: username});

        if (foundEntry){
            let ret = {User: foundEntry.User, Date: foundEntry.Date};
            db.collection('recreation').deleteOne({User: username, Date: date});
            res.status(200).json(ret);
        }else {
            let ret = {error : 'Entry for given user and date not found'};
            res.status(400).json(ret);
        }
    });


    /***** EXERCISE *****/
    // insert exercise data
    app.post('/api/exercise/:username', async (req, res, next) => {
        const username = req.params.username;
        const date = req.body.date;
        const exercise = req.body.exercise;

        const db = client2.db();
        
        const exerciseLog = {User: username, Date: date, Exercise: exercise};
        db.collection('exercise').insertOne(exerciseLog);
        let ret = {User: username, Date: date, Exercise: exercise};
        
        res.status(200).json(ret);
    });

    // retrieve exercise data
    app.post('/api/getExercise/:username', async (req, res, next) => {
        const date = req.body.date;
        const username = req.params.username;

        const db = client2.db();
        const foundEntries = await db.collection('exercise').find({Date: date, User: username}).toArray();

        let ret;
        if (foundEntries.length == 0)
        {
            res.status(400).send("Entries for given user and date not found");
        }
        else {
            res.status(200).send(foundEntries);
        }
    });

    // delete exercise data
    app.delete('/api/deleteExercise/:username', async (req, res, next) => {
        const date = req.body.date;
        const username = req.params.username;
        
        const db = client2.db();
        const foundEntries = await db.collection('exercise').find({Date: date, User: username}).toArray();

        if (foundEntries.length != 0){
            let ret = {User: foundEntries[0].User, Date: foundEntries[0].Date};
            db.collection('exercise').deleteMany({User: username, Date: date});
            res.status(200).json(ret);
        }else {
            let ret = {error : 'Entry for given user and date not found'};
            res.status(400).json(ret);
        }
    });
}