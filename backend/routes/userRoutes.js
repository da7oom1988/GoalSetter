const express = require('express')
const router = express.Router()

const {
    registerUser,
    loginUser,
    getMe
} = require('../controllers/userController')

const {protact} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protact, getMe)


module.exports = router
