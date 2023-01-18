import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import {getGoals, rest} from '../features/goals/goalSlice'

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, isSuccess, message} 
  = useSelector((state) => state.goals)

  useEffect(()=>{

    if(isError){
      toast.error(message)
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(rest())
    }

  }, [ dispatch, isError,  message, user,navigate])


  if(isLoading){
    return <Spinner />
   }


  return (
    <>
    <section className="heading">
      <h1>Welcom {user && user.name}</h1>
      <p>Goals Dashboard</p>
    </section>
    <GoalForm />
    <section className="content">
      {goals.length > 0 ? (
        <div className='goals'>
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ) )}
        </div>
      ) : (<h3>You have no goals</h3>)}
    </section>
    </>
  )
}

export default Dashboard