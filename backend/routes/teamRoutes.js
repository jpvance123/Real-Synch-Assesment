const express = require('express')
const router = express.Router()
const { getAllTeams, getOneTeam } = require('../controllers/teamController')
const { protect } = require('../middleware/authMiddleware')

router.get('/all', protect, getAllTeams)
router.get('/one/:id', protect, getOneTeam)


module.exports = router