const { useState } = require("react")
const { useAuthContext } = require("./useAuthContext")
const config = require('../config/config')

export const useSignup = () => {
    const { dispatch } = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${config.SERVER_URI}/api/users/signup`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
        }
    }

    return [signup, error, isLoading];
}