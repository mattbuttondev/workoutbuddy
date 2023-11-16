import { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
const config = require('../config/config')

const Home = () => {
    const { user } = useAuthContext()
    const { workouts, dispatch } = useWorkoutContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${config.SERVER_URI}/api/workouts`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json()
            dispatch({ type: 'SET_WORKOUTS', payload: json })
        }
        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div>
                {workouts && workouts.map((workout) => {
                    return (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    )
                })}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;