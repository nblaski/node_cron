const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
const everyMin = require('../public/js/cronFunctions.js')
const sendEmail = require('../public/js/sendEmail.js')
const Stage = require('../models/Stage');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/timer', (req, res) => {
  res.render('timer');
});

router.get('/:id', async (req, res) => {
    const stage = await Stage.findById(req.params.id);
    try {
        res.render('show', { stage: stage });
    } catch(err) {
        console.log(err)
    }
});

router.get('/update/:id', async (req, res) => {
    const stage = await Stage.findById(req.params.id);
    try {
        res.render('showID', { stage: stage });

    } catch(err) {
        console.log(err)
    }
});

router.post('/timer/start', (req, res) => {
    const start = {startTime: new Date()};
    everyMin.start();
    console.log("startTime " + start.startTime);
    res.redirect('/timer');
});

router.post('/timer/stop', (req, res) => {
    const stop = {startTime: new Date()};
    everyMin.stop();
    console.log("startTime STOPPED " + stop.startTime);
    res.redirect('/timer');
});

router.post('/stageForm', async ( req, res ) => {
    try {       
        const stage = new Stage ({
            stageName: req.body.stageName,
            dateChanged: Date.now()
        })
        await stage.save()
        console.log('new Stage Saved');
        res.redirect(`/${stage.id}`);
    } catch(err) {
        console.log("ERROR: " + err);
    }
    
});

router.post('/stageForm', async ( req, res ) => {
    try {      
        const stage = new Stage ({
            stageName: req.body.stageName,
            dateChanged: Date.now()
        });
        await stage.save();
        console.log('new Stage Saved');
        res.redirect(`/${stage.id}`);
    } catch(err) {
        console.log("ERROR: " + err);
    }
    
});

router.put('/update/:id', async (req, res) => {
    let stage = await Stage.findById(req.params.id);
    const user = 'Nicole Laski' //req.user with sign-in
    const newStage = req.body.stageUpdate;
    try {
        stage.stageName = newStage;
        stage.dateChanged = Date.now()
        await stage.save();
        console.log('Stage Updated. New Stage: ' + stage.stageName);
        sendEmail(stage, user);
    } catch(err) {
        console.log('Error: stage not updated.' + err);
    }
    res.redirect(`/${stage.id}`);
});

module.exports = router;