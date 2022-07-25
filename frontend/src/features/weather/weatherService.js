import axios from 'axios'

const API_URL = '/api/v1/weather/'

// Get current weather for selected team
const getWeather = async (teamID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + `${teamID}`, config)

  return response.data
}

const weatherService = {
  getWeather,
}

export default weatherService