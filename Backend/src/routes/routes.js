const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { register, login } = require('../controller/authController');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controller/eventController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.use(authMiddleware);
router.get('/events', getEvents);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

module.exports = router;
