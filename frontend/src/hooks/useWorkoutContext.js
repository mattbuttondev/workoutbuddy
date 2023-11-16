import { useContext } from "react"
import { WorkoutContext } from "../context/workoutContext"

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        console.log("useWorkoutContext must be used within a WorkoutContextProvider")
    }

    return context;
}