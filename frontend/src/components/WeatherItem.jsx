import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeather, reset } from '../features/weather/weatherSlice'
import Spinner from './Spinner'
import { FaTemperatureHigh } from 'react-icons/fa'
import { TiWeatherCloudy } from 'react-icons/ti'

function WeatherItem({ team }) {

  const dispatch = useDispatch()
  const { weather, isLoading, isError, message } = useSelector((state) => state.weather)
  const city = team.city

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getWeather(city))

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch, city])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='weather'>
      <h1><TiWeatherCloudy /> Current Weather <TiWeatherCloudy /> </h1>
      <h2> {weather.current.temp_f} <FaTemperatureHigh /></h2>
      <p>{weather.location.localtime}</p>
    </div>
  )
}

export default WeatherItem