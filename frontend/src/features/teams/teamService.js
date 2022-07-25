import axios from 'axios'

const API_URL = '/api/v1/teams/all'

// Get All goals
// Register User
const getAllTeams = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const teamService = {
  getAllTeams,
}

export default teamService