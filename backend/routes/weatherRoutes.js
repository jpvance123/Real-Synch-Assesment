const express = require('express')
const router = express.Router()
const { getCurrentWeather } = require('../controllers/weatherController')
const { protect } = require('../middleware/authMiddleware')


router.get('/:id', protect, getCurrentWeather)


module.exports = router