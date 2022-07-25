const url = require('url')
const needle = require('needle')

// ENV Variables for accessing Weather API
const WEATHER_API_BASE_URL = process.env.WEATHER_API_BASE_URL
const WEATHER_API_KEY_NAME = process.env.WEATHER_API_KEY_NAME
const WEATHER_API_KEY_VALUE = process.env.WEATHER_API_KEY_VALUE

// @desc Get weather based on city
// @route GET /api/v1/weather
// @access Private
const getCurrentWeather = async (req, res) => {
  try {
    const params = new URLSearchParams({
      [WEATHER_API_KEY_NAME]: WEATHER_API_KEY_VALUE,
      q: req.params.id
    })

    const apiRes = await needle('get', `${WEATHER_API_BASE_URL}?${params}`)
    const data = apiRes.body

    // Logging requests for public api
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Request: ${WEATHER_API_BASE_URL}?${params}`)
    }

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getCurrentWeather,
}