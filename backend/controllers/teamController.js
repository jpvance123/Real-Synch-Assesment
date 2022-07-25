const needle = require('needle')
const url = require('url')
// ENV Variables for accessing Basketball API
const BASKETBALL_API_BASE_URL = process.env.BASKETBALL_API_BASE_URL

// @desc Get All Teams
// @route GET /api/v1/teams/all
// @access Private
const getAllTeams = async (req, res) => {
  try {

    const apiRes = await needle('get', `${BASKETBALL_API_BASE_URL}`)
    const data = apiRes.body

    // Logging requests for public api
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Request: ${BASKETBALL_API_BASE_URL}`)
    }

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error })
  }
}

// @desc Get One Team
// @route GET /api/v1/teams/one
// @access Private
const getOneTeam = async (req, res) => {
  try {
    const params = req.params.id

    const apiRes = await needle('get', `${BASKETBALL_API_BASE_URL}/${params}`)
    const data = apiRes.body

    // Logging request for public api
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${BASKETBALL_API_BASE_URL}/${params}`)
    }

    res.status(200).json(data)

  } catch (error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllTeams,
  getOneTeam
}