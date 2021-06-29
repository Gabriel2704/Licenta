const express = require('express');
const router = express.Router();
const singleEvents = require('../controllers/single_events');

router.get('/', singleEvents.getEvents);
router.get('/:id', singleEvents.getEvent);
router.post('/addEvent', singleEvents.addEvent);
router.delete('/deleteEvent/:id', singleEvents.deleteEvent);
router.put('/updateEvent/:name', singleEvents.updateEvent);
router.put('/updateDescription/:name', singleEvents.updateDescription);

module.exports = router;