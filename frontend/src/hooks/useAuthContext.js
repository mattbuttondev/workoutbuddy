import { useContext } from "react"
import { AuthContext } from "../context/authContext"

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        console.log("useAuthContext must be used within a AuthContextProvider")
    }

    return context;
}