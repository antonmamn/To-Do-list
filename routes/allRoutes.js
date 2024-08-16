const express = require('express');
const userRoutes = require('./users');
const toDoList = require('./toDoList');
const jwtAuth = require('../middlewares/JWTauth')

const router = express.Router();

router.use('/users', userRoutes);
router.use('/todolist',jwtAuth, toDoList);

module.exports = router;
