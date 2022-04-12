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
        const foundEntry = await db.collection('water').findOne({ User: username }, {Date: date});
        
        if (foundEntry){
            const id = foundEntry._id;
            db.collection('water').updateOne({ _id: id}, { $set: { Ounces: ounces }});
        } else {
            const waterLog = {User: username, Date: date, Ounces: ounces};
            db.collection('water').insertOne(waterLog);
        }
    
        res.status(200).json(ret);
    });

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
        const foundEntry = await db.collection('sleep').findOne({User: username}, {Date: date});
        if (foundEntry)
        {
            let ret = {error: "Sleep hours already recorded for this user and date"};
            res.status(550).json(ret);
            return;
        }
        
        if (startMeridiam === "pm")
        {
            startHour += 12;
        }
        if (endMeridiam === "pm")
        {
            endHour += 12;
        }

        startMin = startMin / 60;
        endMin = endMin / 60;
        let startTime = startHour + startMin;
        let endTime = endHour + endMin;

        let hoursSlept = 24 + (endTime - startTime);
        
        const sleepLog = {User: username, Date: date, Hours: hoursSlept}
        let ret = {User: username, Date: date, Hours: hoursSlept}

        db.collection('sleep').insertOne(sleepLog);
        res.status(200).json(ret);
    });

    app.post('/api/recreation/:username', async (req, res, next) => {
        const username = req.params.username;
        const hours = req.body.hours;
        const date = req.body.date;
        const activity = req.body.activity;    // dropdown on front end: screen time, tv, games, sport, art, chores, work, other

        const db = client2.db();
        const foundEntry = await db.collection('recreation').findOne({User: username}, {Date: date});

        if (foundEntry){
            const id = foundEntry._id;
            if (activity === "Screen Time") {
                let updatedHours = foundEntry.ScreenTime;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { ScreenTime: updatedHours }});
            }
            else if (activity === "Television") {
                let updatedHours = foundEntry.Television;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Television: updatedHours }});
            }
            else if (activity === "Games") {
                let updatedHours = foundEntry.Games;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Games: updatedHours }});
            }
            else if (activity === "Sport") {
                let updatedHours = foundEntry.Sport;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Sport: updatedHours }});
            }
            else if (activity === "Art") {
                let updatedHours = foundEntry.Art;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Art: updatedHours }});
            }
            else if (activity === "Chores") {
                let updatedHours = foundEntry.Chores;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Chores: updatedHours }});
            }
            else if (activity === "Work") {
                let updatedHours = foundEntry.Work;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Work: updatedHours }});
            }
            else if (activity === "Other") {
                let updatedHours = foundEntry.Other;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Other: updatedHours }});
            }  
        } 
        
        else {
            if (activity === "Screen Time") {
                const recreationLog = {User: username, Date: date, ScreenTime: hours, Television: 0, Games: 0, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: 0};
            }
            else if (activity === "Television") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: hours, Games: 0, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: 0};
            }
            else if (activity === "Games") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: hours, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: 0};
            }
            else if (activity === "Sport") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: 0, Sport: hours, Art: 0, Chores: 0, Work: 0, Other: 0};
            }
            else if (activity === "Art") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: 0, Sport: 0, Art: hours, Chores: 0, Work: 0, Other: 0};
            }
            else if (activity === "Chores") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: 0, Sport: 0, Art: 0, Chores: hours, Work: 0, Other: 0};
            }
            else if (activity === "Work") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: 0, Sport: 0, Art: 0, Chores: 0, Work: hours, Other: 0};
            }
            else if (activity === "Other") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: 0, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: hours};
            }
            db.collection('recreation').insertOne(recreationLog);
        }

        res.status(200).json(ret);
    });

    app.post('/api/exercise/:username', async (req, res, next) => {
        const username = req.params.username;
        const time = req.body.time;
        const date = req.body.date;
        const exercise = req.body.exercise;

        const db = client2.db();
        
        const exerciseLog = {User: username, Date: date, Time: time, Exercise: exercise};
        db.collection('exercise').insertOne(exerciseLog);
        
        res.status(200).json(ret);
    });

    app.post('/api/meal/:username', async (req, res, next) => {
        const username = req.params.username;
        const time = req.body.time;
        const date = req.body.date;
        const meal = req.body.meal;

        const db = client2.db();

        const mealLog = {User: username, Date: date, Time: time, Meal: meal};
        db.collection('meal').insertOne(mealLog);
        
        res.status(200).json(ret);
    });
    
    // TODO: ask front end what they want to do with this; delete med
    app.post('/api/medication/:username', async (req, res, next) => {
        const username = req.params.username;
        const time = req.body.time;
        const day = req.body.day;
        const medication = req.body.medication;
        const dosage = req.body.dosage;

        const db = client2.db();

        const medicationLog = {User: username, Day: day, Time: time, Medication: medication, Dosage: dosage};
        db.collection('medication').insertOne(medicationLog);
        res.status(200).json(ret);
    });
    
    // TO:DO app.get() for all habits in order for summary purposes
}