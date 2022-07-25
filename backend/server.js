const express = require('express')
const colors = require('colors')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const { errorHandler } = require('./middleware/errorMiddleware')
require('dotenv').config()

// Connect to DB
connectDB = require('./config/db')
connectDB()

// Init App
const PORT = process.env.PORT || 5005
const app = express()

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30                   // 30 NBA teams
})

app.use(limiter)
app.set('trust proxy', 1)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use('/api/v1/weather', require('./routes/weatherRoutes'))
app.use('/api/v1/teams', require('./routes/teamRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'))
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})