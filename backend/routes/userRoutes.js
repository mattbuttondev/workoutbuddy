const express = require('express');
const { signupUser, loginUser, deleteAllUsers } = require('../controllers/userController');
const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.delete('/', deleteAllUsers)

module.exports = router;