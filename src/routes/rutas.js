const express = require('express');
const userController = require('./controllers/userController');


const router = express.Router();

router.get('/users', userController.getusers);

module.exports = router;