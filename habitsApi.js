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
        const foundEntry = await db.collection('sleep').findOne({User: username, Date: date});
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
        const foundEntry = await db.collection('recreation').findOne({User: username, Date: date});
        let ret;

        // if user already has an activity log for date entered, update log with new activity entered
        if (foundEntry){
            const id = foundEntry._id;
            if (activity === "Screen Time") {
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
            else if (activity === "Games") {
                let updatedHours = foundEntry.Games;
                updatedHours += hours;
                db.collection('recreation').updateOne({ _id: id }, { $set: { Games: updatedHours }});
                ret = {User: username, Date: date, Games: updatedHours}
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
            if (activity === "Screen Time") {
                const recreationLog = {User: username, Date: date, ScreenTime: hours, Television: 0, Games: 0, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: 0};
                ret = {User: username, Date: date, ScreenTime: hours}
            }
            else if (activity === "Television") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: hours, Games: 0, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: 0};
                ret = {User: username, Date: date, Television: hours}
            }
            else if (activity === "Games") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: hours, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: 0};
                ret = {User: username, Date: date, Games: hours}
            }
            else if (activity === "Sport") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: 0, Sport: hours, Art: 0, Chores: 0, Work: 0, Other: 0};
                ret = {User: username, Date: date, Sport: hours}
            }
            else if (activity === "Art") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: 0, Sport: 0, Art: hours, Chores: 0, Work: 0, Other: 0};
                ret = {User: username, Date: date, Art: hours}
            }
            else if (activity === "Chores") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: 0, Sport: 0, Art: 0, Chores: hours, Work: 0, Other: 0};
                ret = {User: username, Date: date, Chores: hours}
            }
            else if (activity === "Work") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: 0, Sport: 0, Art: 0, Chores: 0, Work: hours, Other: 0};
                ret = {User: username, Date: date, Work: hours}
            }
            else if (activity === "Other") {
                const recreationLog = {User: username, Date: date, ScreenTime: 0, Television: 0, Games: 0, Sport: 0, Art: 0, Chores: 0, Work: 0, Other: hours};
                ret = {User: username, Date: date, Other: hours}
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
        let ret = {User: username, Date: date, Time: time, Exercise: exercise};
        
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
        let ret = {User: username, Date: date, Time: time, Meal: meal};
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
        let ret = {User: username, Day: day, Time: time, Medication: medication, Dosage: dosage};
        res.status(200).json(ret);
    });
    
    // TO:DO app.get() for all habits in order for summary purposes
}