import { useAuthContext } from "../hooks/useAuthContext"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const config = require('../config/config')

const WorkoutDetails = ({ workout }) => {
    const { user } = useAuthContext()
    const { dispatch } = useWorkoutContext()

    const handleClick = async () => {
        const response = await fetch(`${config.SERVER_URI}/api/workouts/` + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            alert(json.error)
        }

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Reps: {workout.reps}</strong></p>
            <p><strong>Load (in KG): {workout.load}</strong></p>
            <p>Added {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}

export default WorkoutDetails;