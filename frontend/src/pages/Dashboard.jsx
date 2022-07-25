import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTeams, reset } from '../features/teams/teamSlice'
import Spinner from '../components/Spinner'
import TeamItem from '../components/TeamItem'
import { GiBasketballJersey, GiBasketballBasket } from 'react-icons/gi'
import { TbConfetti } from 'react-icons/tb'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { teams, isLoading, isError, message } = useSelector((state) => state.teams)

  const [isShown, setIsShown] = useState(false)


  const handleClick = (e) => {
    setIsShown(current => !current)
  };


  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getAllTeams())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1> <TbConfetti /> Welcome {user && user.name} <TbConfetti /> </h1>
        <p> <GiBasketballBasket /> NBA Team Dashboard <GiBasketballJersey /></p>
      </section>


      <button className='btn content' onClick={handleClick}>NBA Teams</button>
      {isShown && (
        <section className='content'>
          {teams.data.length > 0 ? (
            <div className='goals'>
              {teams.data.map((team) => (
                <TeamItem key={team.id} team={team} />
              ))}
            </div>
          ) : (
            <h3> No basketball teams found...</h3>
          )}
        </section>
      )}
    </>
  )
}

export default Dashboard