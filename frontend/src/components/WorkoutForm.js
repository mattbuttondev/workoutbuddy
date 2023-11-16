import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
const config = require('../config/config')

const WorkoutForm = () => {
    const { user } = useAuthContext()
    const { dispatch } = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        const workout = { title, reps, load }

        const response = await fetch(`${config.SERVER_URI}/api/workouts`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setIsLoading(false)
        }

        if (response.ok) {
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
            setTitle('')
            setReps('')
            setLoad('')
            setError(null)
            setEmptyFields([])
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>Add Workout</h4>

            <label>Excercise:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <label>Load (in KG):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <button disabled={isLoading}>Add Workout</button>
            {error && <div className="error">{error}</div>}

        </form>
    );
}

export default WorkoutForm;