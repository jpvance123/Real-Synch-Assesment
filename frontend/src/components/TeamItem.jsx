import { useState } from 'react'
import { FaBasketballBall } from 'react-icons/fa'
import WeatherItem from './WeatherItem'

function TeamItem({ team }) {

  const [isWeather, setIsWeather] = useState(false)

  const onClick = () => {
    setIsWeather(current => !current)
  }

  return (
    <div className="goal">
      <div>
        <h4>{team.full_name}</h4>
        <p> {team.abbreviation} <FaBasketballBall /></p>
        <button className="btn content" id={team.id} onClick={onClick}>
          Weather in {team.city}
        </button>
        {isWeather ? (
          <div>
            <WeatherItem key={team.city} team={team} />
          </div>
        ) : (
          <div> No weather to display</div>
        )}

      </div>
    </div>
  )
}

export default TeamItem